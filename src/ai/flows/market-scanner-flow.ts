'use server';
/**
 * @fileOverview Genkit Flow to scan poultry market prices and update products.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

const MarketScanOutputSchema = z.object({
  updates: z.array(z.object({
    productId: z.string(),
    newName: z.string(),
    newBasePrice: z.number().describe('The updated market base price per chick.'),
    source: z.string().describe('Where the price was found (e.g. Afrimash, Poultry Plaza).'),
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
  prompt: `You are an expert Nigerian poultry market analyst. It is {{marketDay}} at 11:30 AM.
  
  Current Products in AFDEC Database:
  {{#each currentProducts}}
  - ID: {{id}}, Name: {{name}}, Current Base Price: ₦{{pricePerUnit}}
  {{/each}}

  Scan simulated market data from Afrimash and Poultry Plaza for today. 
  Rules for price updates:
  1. Prices fluctuate based on hatchery availability (AMO, Agrited).
  2. If it is Monday/Thursday 11:30 AM, provide updated market base prices.
  3. Prices usually range between ₦240 and ₦1200 depending on the bird type.

  Return the updated base prices for these products. Do not add AFDEC profit yet; just return the raw hatchery base price per chick.`,
});

export async function scanAndUpdateMarketPrices(): Promise<MarketScanOutput> {
  const { firestore } = initializeFirebase();
  
  // 1. Fetch current products
  const productsCol = collection(firestore, 'products');
  const snapshot = await getDocs(productsCol);
  const products = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));

  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

  // 2. Call AI to get new prices
  const { output } = await prompt({
    currentProducts: products,
    marketDay: dayName,
  });

  if (!output) throw new Error('Failed to scan market prices.');

  // 3. Update Firestore
  for (const update of output.updates) {
    const productRef = doc(firestore, 'products', update.productId);
    await updateDoc(productRef, {
      pricePerUnit: update.newBasePrice,
      lastUpdated: new Date().toISOString(),
      priceSource: update.source,
    });
  }

  return output;
}
