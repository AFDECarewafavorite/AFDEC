'use client';

import { useCollection, useFirestore, useMemoFirebase, useUser, useDoc, setDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle, ShieldAlert, MoreHorizontal, Bird, Loader } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-provider';

const demoProducts: Omit<Product, 'id'>[] = [
    {
        name: 'Agrited Broiler (Day-old)',
        description: 'High-quality day-old broiler chicks from Agrited hatcheries. Known for fast growth.',
        category: 'chick',
        pricePerUnit: 1850,
        bookingFeePerUnit: 50,
        maturity: '5-6 weeks',
        imageUrl: 'https://picsum.photos/seed/agrited/600/400',
        imageHint: 'day-old chick',
        imageWidth: 600,
        imageHeight: 400,
        isActive: true,
    },
    {
        name: 'Zartech Broiler (Day-old)',
        description: 'Hardy and reliable day-old broiler chicks from Zartech farms.',
        category: 'chick',
        pricePerUnit: 1800,
        bookingFeePerUnit: 50,
        maturity: '6-7 weeks',
        imageUrl: 'https://picsum.photos/seed/zartech/600/400',
        imageHint: 'yellow chick',
        imageWidth: 600,
        imageHeight: 400,
        isActive: true,
    },
    {
        name: 'Point of Lay (Grower)',
        description: 'Young hens approaching the age of laying eggs. Great for starting your own egg production.',
        category: 'grower',
        pricePerUnit: 4500,
        bookingFeePerUnit: 500,
        maturity: '16-18 weeks',
        imageUrl: 'https://picsum.photos/seed/pol/600/400',
        imageHint: 'young chicken',
        imageWidth: 600,
        imageHeight: 400,
        isActive: true,
    },
    {
        name: 'Mature Broiler (Live)',
        description: 'Fully grown broiler, ready for market. Average weight of 2.5kg.',
        category: 'mature',
        pricePerUnit: 8000,
        bookingFeePerUnit: 1000,
        maturity: 'Ready',
        imageUrl: 'https://picsum.photos/seed/broiler/600/400',
        imageHint: 'white chicken',
        imageWidth: 600,
        imageHeight: 400,
        isActive: true,
    },
];

export default function AdminProductsPage() {
    const firestore = useFirestore();
    const { user, isUserLoading: isAuthLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const { t } = useLanguage();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
    const [isSeeding, setIsSeeding] = useState(false);

    const managerRoleRef = useMemoFirebase(
        () => (firestore && user ? doc(firestore, 'roles_manager', user.uid) : null),
        [firestore, user]
      );
    const { data: managerRole, isLoading: isManagerRoleLoading } = useDoc(managerRoleRef);
    
    const ceoRoleRef = useMemoFirebase(
        () => (firestore && user ? doc(firestore, 'roles_ceo', user.uid) : null),
        [firestore, user]
    );
    const { data: ceoRole, isLoading: isCeoRoleLoading } = useDoc(ceoRoleRef);
    
    const isUserPrivileged = !!managerRole || !!ceoRole;
    const isAuthorizing = isAuthLoading || (user && (isManagerRoleLoading || isCeoRoleLoading));

    useEffect(() => {
        if (!isAuthLoading && !user) {
          router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    const productsQuery = useMemoFirebase(
        () => (firestore && isUserPrivileged ? query(collection(firestore, 'products'), orderBy('name')) : null),
        [firestore, isUserPrivileged]
    );

    const { data: products, isLoading: areProductsLoading } = useCollection<Product>(productsQuery);

    const handleAddProduct = () => {
        setSelectedProduct(undefined);
        setDialogOpen(true);
    }
    
    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setDialogOpen(true);
    }

    const handleSeedProducts = () => {
        if (!firestore) return;
        setIsSeeding(true);

        try {
            demoProducts.forEach(productData => {
                const productRef = doc(collection(firestore, 'products'));
                const newProduct = { ...productData, id: productRef.id };
                setDocumentNonBlocking(productRef, newProduct, { merge: false });
            });
            toast({
                title: t('seedingProducts'),
                description: t('seedingProductsDesc'),
            });
        } catch (error) {
            console.error("Error seeding products:", error);
            toast({
                variant: 'destructive',
                title: t('seedingFailed'),
                description: t('seedingFailedDesc'),
            });
        } finally {
            setTimeout(() => {
                setIsSeeding(false);
            }, 2500); 
        }
    };

    if (!isAuthorizing && user && !isUserPrivileged) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <ShieldAlert className="h-16 w-16 text-destructive" />
                <h1 className="mt-6 text-3xl font-bold font-headline">{t('accessDenied')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {t('accessDeniedAdmin')}
                </p>
                <Button asChild variant="outline" className="mt-8">
                    <Link href="/admin">{t('backToDashboard')}</Link>
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
                    {t('productCatalog')}
                    </h1>
                    <p className="text-muted-foreground">
                    {t('productCatalogSubtitle')}
                    </p>
                </div>
                <ProductDialog open={dialogOpen} onOpenChange={setDialogOpen} product={selectedProduct}>
                    <Button onClick={handleAddProduct}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {t('addProduct')}
                    </Button>
                </ProductDialog>
            </header>
            
            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('tableColProduct')}</TableHead>
                            <TableHead>{t('tableColCategory')}</TableHead>
                            <TableHead>{t('tableColPrice')}</TableHead>
                            <TableHead>{t('bookingFee')}</TableHead>
                            <TableHead>{t('status')}</TableHead>
                            <TableHead className="text-right">{t('tableColActions')}</TableHead>
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
                                <TableCell colSpan={6} className="h-48 text-center">
                                    <Bird className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-semibold">{t('noProductsFound')}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">{t('noProductsFoundDesc')}</p>
                                    <div className="mt-6">
                                        <Button onClick={handleSeedProducts} disabled={isSeeding}>
                                            {isSeeding ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                                            {isSeeding ? t('seeding') : t('seedDemoProducts')}
                                        </Button>
                                    </div>
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
                                        {product.isActive ? t('active') : t('inactive')}
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
                                                {t('edit')}
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>{t('delete')}</DropdownMenuItem>
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
