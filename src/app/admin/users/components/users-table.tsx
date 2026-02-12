'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User, UserRole } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
  
interface UsersTableProps {
    users: User[];
    currentUserId: string;
    onRoleChange: (userId: string, newRole: UserRole) => void;
    onSuspendToggle: (userId: string, currentStatus: boolean) => void;
}

const roleColors: Record<UserRole, string> = {
    Customer: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    Agent: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    Manager: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    CEO: 'bg-primary/20 text-primary border-primary/30',
};

export function UsersTable({ users, onRoleChange, onSuspendToggle, currentUserId }: UsersTableProps) {
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
                {users.map(user => {
                     const userInitials = user.fullName.split(' ').map(s => s[0]).join('');
                     const isCurrentUser = user.id === currentUserId;

                     return (
                        <TableRow key={user.id}>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <Avatar>
                                    {/* Placeholder for user avatar image if available */}
                                    <AvatarFallback>{userInitials}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{user.fullName}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                            <TableCell>
                                <Select 
                                    defaultValue={user.role} 
                                    onValueChange={(value) => onRoleChange(user.id, value as UserRole)}
                                    disabled={isCurrentUser}
                                >
                                    <SelectTrigger className={`w-[120px] ${roleColors[user.role]}`}>
                                        <SelectValue placeholder="Set role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Customer">Customer</SelectItem>
                                        <SelectItem value="Agent">Agent</SelectItem>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                        <SelectItem value="CEO">CEO</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            <TableCell className="text-center">
                                <div className="flex justify-center items-center">
                                    <Switch
                                        checked={!!user.isSuspended}
                                        onCheckedChange={() => onSuspendToggle(user.id, !!user.isSuspended)}
                                        aria-label="Suspend user"
                                        disabled={isCurrentUser}
                                    />
                                    {user.isSuspended && <Badge variant="destructive" className="ml-4">Yes</Badge>}
                                </div>
                            </TableCell>
                        </TableRow>
                     )
                })}
            </TableBody>
        </Table>
    );
}
