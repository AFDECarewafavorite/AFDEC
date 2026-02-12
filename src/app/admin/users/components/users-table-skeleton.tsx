'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export function UsersTableSkeleton() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-center">Suspended</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-4 w-[150px]" />
                            </div>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-[200px]" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-9 w-[120px]" />
                        </TableCell>
                        <TableCell className="text-center">
                            <Skeleton className="h-6 w-11 mx-auto" />
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
