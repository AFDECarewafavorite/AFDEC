'use server';
/**
 * @fileOverview Genkit Flow to scan poultry market prices and update products.
 * Scans simulated hatchery data from Afrimash and Poultry Plaza.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const MarketScanOutputSchema = z.object({
  updates: z.array(z.object({
    productId: z.string(),
    newName: z.string(),
    newBasePrice: z.number().describe('The updated hatchery base price per chick (raw cost).'),
    source: z.string().describe('Where the price was found (e.g. Afrimash, Poultry Plaza).'),
    note: z.string().describe('Short market commentary.'),
  })),
  timestamp: z.string(),
});

export type MarketScanOutput = z.infer<typeof MarketScanOutputSchema>;

const prompt = ai.definePrompt({
  name: 'marketScannerPrompt',
  input: {
    schema: z.object({
      currentProducts: z.array(z.any()),
      marketDay: z.string().describe('Either Monday or Thursday'),
    }),
  },
  output: { schema: MarketScanOutputSchema },
  prompt: `You are an expert Nigerian poultry market analyst for AFDEC Gombe. 
  It is {{marketDay}} at 11:30 AM (Peak market update time).
  
  Current Products in AFDEC Database:
  {{#each currentProducts}}
  - ID: {{id}}, Name: {{name}}, Current Base Price: ₦{{pricePerUnit}}
  {{/each}}

  Your task is to scan simulated market data from Afrimash and Poultry Plaza for today. 
  Rules for price updates:
  1. Prices fluctuate based on hatchery availability (AMO, Agrited).
  2. If it is Monday/Thursday 11:30 AM, provide updated market base prices.
  3. Raw hatchery prices usually range between ₦240 and ₦1100 per chick.
  4. Provide a small note on the market trend (e.g., "Amo supply high", "Fuel costs affecting waybill").

  Return the updated base prices (raw cost) for these products. Do not add AFDEC profit or delivery yet; return only the hatchery base price per chick.`,
});

export async function scanAndUpdateMarketPrices(): Promise<MarketScanOutput> {
  const { firestore } = initializeFirebase();
  
  // 1. Fetch current active products
  const productsCol = collection(firestore, 'products');
  const snapshot = await getDocs(productsCol);
  const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

  if (products.length === 0) {
    throw new Error('No products found to update.');
  }

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

  // 2. Call AI to get new market prices
  const { output } = await prompt({
    currentProducts: products,
    marketDay: dayName,
  });

  if (!output || !output.updates) throw new Error('Failed to scan market prices.');

  // 3. Update Firestore with new base prices
  for (const update of output.updates) {
    const productRef = doc(firestore, 'products', update.productId);
    await updateDoc(productRef, {
      pricePerUnit: update.newBasePrice,
      lastUpdated: new Date().toISOString(),
      priceSource: update.source,
      marketNote: update.note,
    });
  }

  return output;
}
