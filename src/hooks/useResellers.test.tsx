import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useResellers, useCreateReseller } from './useResellers';
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

describe('useResellers hooks', () => {
    beforeEach(async () => {
        await db.resellers.clear();
        queryClient.clear();
    });

    it('should fetch resellers', async () => {
        await db.resellers.add({ name: 'Reseller 1', createdAt: new Date(), updatedAt: new Date() });

        const { result } = renderHook(() => useResellers(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toHaveLength(1);
        expect(result.current.data?.[0].name).toBe('Reseller 1');
    });

    it('should create a reseller', async () => {
        const { result } = renderHook(() => useCreateReseller(), { wrapper });

        result.current.mutate({ name: 'New Reseller', createdAt: new Date(), updatedAt: new Date() });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        const resellers = await db.resellers.toArray();
        expect(resellers).toHaveLength(1);
        expect(resellers[0].name).toBe('New Reseller');
    });
});
