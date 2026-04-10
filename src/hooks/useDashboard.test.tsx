import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTotalDebt, useTodayOrders } from './useDashboard';
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

describe('useDashboard hooks', () => {
    beforeEach(async () => {
        await db.transactions.clear();
        queryClient.clear();
    });

    it('should calculate total debt', async () => {
        await db.transactions.add({ resellerId: 1, type: 'order', totalPrice: 100, createdAt: new Date() });
        await db.transactions.add({ resellerId: 1, type: 'payment', totalPrice: 30, createdAt: new Date() });

        const { result } = renderHook(() => useTotalDebt(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toBe(70);
    });

    it('should calculate today orders', async () => {
        // Yesterday
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        await db.transactions.add({ resellerId: 1, type: 'order', totalPrice: 100, createdAt: yesterday });
        await db.transactions.add({ resellerId: 1, type: 'order', totalPrice: 50, createdAt: new Date() });

        const { result } = renderHook(() => useTodayOrders(), { wrapper });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data?.count).toBe(1);
        expect(result.current.data?.volume).toBe(50);
    });
});
