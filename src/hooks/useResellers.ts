import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db, type Reseller } from '../db/database';

export function useResellers() {
    return useQuery({
        queryKey: ['resellers'],
        queryFn: () => db.resellers.toArray(),
    });
}

export function useReseller(id?: number) {
    return useQuery({
        queryKey: ['resellers', id],
        queryFn: async () => {
            if (!id) return null;
            const reseller = await db.resellers.get(id);
            return reseller ?? null;
        },
        enabled: !!id,
    });
}

export function useCreateReseller() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (reseller: Omit<Reseller, 'id'>) => db.resellers.add(reseller),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resellers'] });
        },
    });
}

export function useUpdateReseller() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...changes }: Partial<Reseller> & { id: number }) =>
            db.resellers.update(id, changes),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['resellers'] });
            queryClient.invalidateQueries({ queryKey: ['resellers', variables.id] });
        },
    });
}

export function useDeleteReseller() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => db.resellers.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['resellers'] });
            queryClient.invalidateQueries({ queryKey: ['resellers', id] });
        },
    });
}
