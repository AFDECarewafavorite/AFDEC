'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Product } from '@/lib/types';
import { useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { ReactNode } from 'react';

const productSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description is required'),
  category: z.enum(['chick', 'grower', 'mature']),
  pricePerUnit: z.coerce.number().min(0, 'Price must be a positive number'),
  bookingFeePerUnit: z.coerce.number().min(0, 'Booking fee must be a positive number'),
  maturity: z.string().optional(),
  imageUrl: z.string().url('Must be a valid URL'),
  imageHint: z.string().optional(),
  imageWidth: z.coerce.number().min(1),
  imageHeight: z.coerce.number().min(1),
  isActive: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
  product?: Product;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function ProductDialog({
  product,
  children,
  open,
  onOpenChange,
}: ProductDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? { ...product, maturity: product.maturity || '' }
      : {
          name: '',
          description: '',
          category: 'chick',
          pricePerUnit: 0,
          bookingFeePerUnit: 0,
          maturity: '',
          imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
          imageHint: 'chicken',
          imageWidth: 600,
          imageHeight: 400,
          isActive: true,
        },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (!firestore) return;
    const id = product?.id || doc(collection(firestore, 'products')).id;
    const productRef = doc(firestore, 'products', id);
    const payload = { ...data, id };

    setDocumentNonBlocking(productRef, payload, { merge: true });
    toast({
      title: product ? 'Product Updated' : 'Product Added',
      description: `${data.name} has been saved.`,
    });
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit' : 'Add'} Product</DialogTitle>
          <DialogDescription>
            {product ? 'Edit the details of' : 'Add a new product to'} your catalog.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Agrited Day-old Chicks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the product..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="chick">Day-old Chick</SelectItem>
                        <SelectItem value="grower">Grower</SelectItem>
                        <SelectItem value="mature">Mature</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <div className="grid grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="pricePerUnit"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Total Price (NGN)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="bookingFeePerUnit"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Booking Fee (NGN)</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
             <FormField
              control={form.control}
              name="maturity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maturity</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 5-6 weeks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
                <FormField
                control={form.control}
                name="imageHint"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image Hint</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g. chicken" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="imageWidth"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image Width</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="imageHeight"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image Height</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Active</FormLabel>
                    <DialogDescription>
                      Inactive products won't be visible to customers.
                    </DialogDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="ghost">Cancel</Button>
                </DialogClose>
              <Button type="submit">Save Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

