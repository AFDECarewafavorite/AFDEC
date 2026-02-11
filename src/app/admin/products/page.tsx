'use client';

import { useCollection, useFirestore, useMemoFirebase, useUser, useDoc } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, ShieldAlert, MoreHorizontal, Bird } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductDialog } from './components/product-dialog';

export default function AdminProductsPage() {
    const firestore = useFirestore();
    const { user, isUserLoading: isAuthLoading } = useUser();
    const router = useRouter();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

    const adminRoleRef = useMemoFirebase(
        () => (firestore && user ? doc(firestore, 'roles_admin', user.uid) : null),
        [firestore, user]
    );
    const { data: adminRole, isLoading: isAdminRoleLoading } = useDoc(adminRoleRef);
    
    const isUserAdmin = !!adminRole;
    const isAuthorizing = isAuthLoading || (user && isAdminRoleLoading);

    useEffect(() => {
        if (!isAuthLoading && !user) {
          router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    const productsQuery = useMemoFirebase(
        () => (firestore && isUserAdmin ? query(collection(firestore, 'products'), orderBy('name')) : null),
        [firestore, isUserAdmin]
    );

    const { data: products, isLoading: areProductsLoading, error: productsError } = useCollection<Product>(productsQuery);

    const handleAddProduct = () => {
        setSelectedProduct(undefined);
        setDialogOpen(true);
    }
    
    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    }

    if (!isAuthorizing && user && !isUserAdmin) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <ShieldAlert className="h-16 w-16 text-destructive" />
                <h1 className="mt-6 text-3xl font-bold font-headline">Access Denied</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    You do not have the necessary permissions to view this page.
                </p>
                <Button asChild variant="outline" className="mt-8">
                    <Link href="/admin">Back to Dashboard</Link>
                </Button>
            </div>
        )
    }

    const isLoading = isAuthorizing || areProductsLoading;

    return (
        <div className="container mx-auto py-8 px-4">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                    Product Management
                    </h1>
                    <p className="text-muted-foreground">
                    Add, edit, and manage available bird products.
                    </p>
                </div>
                <ProductDialog open={dialogOpen} onOpenChange={setDialogOpen} product={selectedProduct}>
                    <Button onClick={handleAddProduct}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </ProductDialog>
            </header>
            
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Booking Fee</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading && Array.from({ length: 3 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                            </TableRow>
                        ))}
                        {!isLoading && products?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    No products found. Add one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                        {!isLoading && products?.map(product => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Image src={product.imageUrl} alt={product.name} width={40} height={40} className="rounded-md object-cover" />
                                        {product.name}
                                    </div>
                                </TableCell>
                                <TableCell className="capitalize">{product.category}</TableCell>
                                <TableCell>{product.pricePerUnit}</TableCell>
                                <TableCell>{product.bookingFeePerUnit}</TableCell>
                                <TableCell>
                                    <Badge variant={product.isActive ? 'default' : 'secondary'} className={product.isActive ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                                        {product.isActive ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Delete (not implemented)</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

