import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useItems, useCreateItem } from './useItems';
import { db } from '../db/database';
import React, { ReactNode } from 'react';

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe('useItems hooks', () => {
    beforeEach(async () => {
        await db.items.clear();
        queryClient.clear();
    });

    it('should fetch items', async () => {
        await db.items.add({ name: 'Item 1', basePrice: 10, createdAt: new Date(), updatedAt: new Date() });

        const { result } = renderHook(() => useItems(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toHaveLength(1);
        expect(result.current.data?.[0].name).toBe('Item 1');
    });

    it('should create an item', async () => {
        const { result } = renderHook(() => useCreateItem(), { wrapper });

        result.current.mutate({ name: 'New Item', basePrice: 20, createdAt: new Date(), updatedAt: new Date() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        const items = await db.items.toArray();
        expect(items).toHaveLength(1);
        expect(items[0].name).toBe('New Item');
    });
});
