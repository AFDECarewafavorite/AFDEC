'use client';

import { useCollection, useFirestore, useMemoFirebase, useUser, useDoc, setDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc } from 'firebase/firestore';
import type { User as UserType, UserRole } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldAlert, Users } from 'lucide-react';
import { UsersTable } from './components/users-table';
import { UsersTableSkeleton } from './components/users-table-skeleton';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/language-provider';

export default function AdminUsersPage() {
    const firestore = useFirestore();
    const { user, isUserLoading: isAuthLoading } = useUser();
    const router = useRouter();
    const { toast } = useToast();
    const { t } = useLanguage();

    const ceoRoleRef = useMemoFirebase(
        () => (firestore && user ? doc(firestore, 'roles_ceo', user.uid) : null),
        [firestore, user]
    );
    const { data: ceoRole, isLoading: isCeoRoleLoading } = useDoc(ceoRoleRef);
    
    const isUserCEO = !!ceoRole;
    const isAuthorizing = isAuthLoading || (user && isCeoRoleLoading);

    useEffect(() => {
        if (!isAuthLoading && !user) {
          router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    const usersQuery = useMemoFirebase(
        () => (firestore && isUserCEO ? query(collection(firestore, 'users'), orderBy('fullName')) : null),
        [firestore, isUserCEO]
    );

    const { data: users, isLoading: areUsersLoading } = useCollection<UserType>(usersQuery);

    const handleRoleChange = (userId: string, currentRole: UserRole, newRole: UserRole) => {
        if (!firestore) return;
    
        const targetUser = users?.find(u => u.id === userId);
        if (!targetUser) return;
        
        // 1. Update the role in the user's primary document
        const userRef = doc(firestore, 'users', userId);
        updateDocumentNonBlocking(userRef, { role: newRole });
    
        // 2. Manage role collections
        const managerRoleRef = doc(firestore, 'roles_manager', userId);
        const ceoRoleRef = doc(firestore, 'roles_ceo', userId);
        const agentRef = doc(firestore, 'agents', userId);
    
        // Clean up all potential old roles
        deleteDocumentNonBlocking(managerRoleRef);
        deleteDocumentNonBlocking(ceoRoleRef);
        if (currentRole === 'Agent') {
            deleteDocumentNonBlocking(agentRef);
        }
    
        // Assign new role-specific documents
        if (newRole === 'Manager') {
            setDocumentNonBlocking(managerRoleRef, { userId }, { merge: true });
        } else if (newRole === 'CEO') {
            setDocumentNonBlocking(ceoRoleRef, { userId }, { merge: true });
        } else if (newRole === 'Agent') {
            const agentProfile = {
                id: userId,
                userId: userId,
                name: targetUser.fullName,
                referralCode: `${targetUser.fullName.split(' ')[0].toUpperCase()}${userId.slice(0, 4)}`,
                totalCommission: 0,
                availableBalance: 0,
                totalBookings: 0,
            };
            setDocumentNonBlocking(agentRef, agentProfile, { merge: true });
        }

        toast({
            title: t('roleUpdated'),
            description: t('roleUpdatedDesc').replace('{fullName}', targetUser.fullName).replace('{newRole}', newRole),
        });
    };

    const handleSuspendToggle = (userId: string, currentStatus: boolean) => {
        if (!firestore) return;
        const userRef = doc(firestore, 'users', userId);
        updateDocumentNonBlocking(userRef, { isSuspended: !currentStatus });
        toast({
            title: !currentStatus ? t('userSuspended') : t('userUnsuspended'),
            description: t('userStatusUpdated'),
        })
    }

    if (!isAuthorizing && user && !isUserCEO) {
        return (
            <div className="container mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <ShieldAlert className="h-16 w-16 text-destructive" />
                <h1 className="mt-6 text-3xl font-bold font-headline">{t('accessDenied')}</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    {t('accessDeniedCEO')}
                </p>
                <Button asChild variant="outline" className="mt-8">
                    <Link href="/admin">{t('backToDashboard')}</Link>
                </Button>
            </div>
        )
    }

    const isLoading = isAuthorizing || areUsersLoading;

    return (
        <div className="container mx-auto py-8 px-4">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-headline text-primary">
                    {t('userManagement')}
                    </h1>
                    <p className="text-muted-foreground">
                    {t('userManagementSubtitle')}
                    </p>
                </div>
            </header>
            
            <div className="rounded-lg border">
                {isLoading && <UsersTableSkeleton />}
                {!isLoading && users && (
                    <UsersTable 
                        users={users} 
                        onRoleChange={handleRoleChange} 
                        onSuspendToggle={handleSuspendToggle}
                        currentUserId={user?.uid || ''}
                    />
                )}
                {!isLoading && !users?.length && (
                    <div className="h-48 text-center flex flex-col justify-center items-center">
                        <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-semibold">{t('noOtherUsersFound')}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{t('noOtherUsersFoundDesc')}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
