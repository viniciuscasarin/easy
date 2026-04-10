import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db, type Item } from '../db/database';

export function useItems() {
    return useQuery({
        queryKey: ['items'],
        queryFn: () => db.items.toArray(),
    });
}

export function useItem(id?: number) {
    return useQuery({
        queryKey: ['items', id],
        queryFn: async () => {
            if (!id) return null;
            const item = await db.items.get(id);
            return item ?? null;
        },
        enabled: !!id,
    });
}

export function useCreateItem() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (item: Omit<Item, 'id'>) => db.items.add(item),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
        },
    });
}

export function useUpdateItem() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...changes }: Partial<Item> & { id: number }) =>
            db.items.update(id, changes),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            queryClient.invalidateQueries({ queryKey: ['items', variables.id] });
        },
    });
}

export function useDeleteItem() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => db.items.delete(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['items'] });
            queryClient.invalidateQueries({ queryKey: ['items', id] });
        },
    });
}
