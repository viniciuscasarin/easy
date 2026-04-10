import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db, type Transaction } from '../db/database';

export function useTransactions(resellerId?: number) {
    return useQuery({
        queryKey: ['transactions', resellerId],
        queryFn: () => {
            if (resellerId) {
                return db.transactions.where('resellerId').equals(resellerId).toArray();
            }
            return db.transactions.toArray();
        },
    });
}

export function useCreateTransaction() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transaction: Omit<Transaction, 'id'>) => db.transactions.add(transaction),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transactions', variables.resellerId] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
}

export function useDeleteTransaction() {
    const queryClient = useQueryClient();
    // Using an object to receive both ID and resellerId to invalidate properly 
    return useMutation({
        mutationFn: ({ id, resellerId }: { id: number; resellerId: number }) => db.transactions.delete(id),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['transactions', variables.resellerId] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
        },
    });
}
