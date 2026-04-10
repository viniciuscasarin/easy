import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSearch, addToRecentResellers } from './useSearch';
import { db } from '../db/database';

describe('useSearch hook - Recent Logic', () => {
    beforeEach(async () => {
        await db.items.clear();
        await db.resellers.clear();
        await db.transactions.clear();
        localStorage.clear();
        vi.clearAllMocks();
    });

    it('should add reseller to recent in localStorage', () => {
        addToRecentResellers(1);
        expect(localStorage.getItem('recent_resellers')).toBe('[1]');

        addToRecentResellers(2);
        expect(localStorage.getItem('recent_resellers')).toBe('[2,1]');

        addToRecentResellers(1);
        expect(localStorage.getItem('recent_resellers')).toBe('[1,2]'); // Move to top
    });

    it('should limit recent resellers to 3', () => {
        addToRecentResellers(1);
        addToRecentResellers(2);
        addToRecentResellers(3);
        addToRecentResellers(4);
        expect(JSON.parse(localStorage.getItem('recent_resellers')!)).toHaveLength(3);
        expect(JSON.parse(localStorage.getItem('recent_resellers')!)).toEqual([4, 3, 2]);
    });

    it('should return recent items and resellers from localStorage when query is empty', async () => {
        const now = new Date();
        const r1 = await db.resellers.add({ name: 'Reseller 1', createdAt: now, updatedAt: now }) as number;
        const r2 = await db.resellers.add({ name: 'Reseller 2', createdAt: now, updatedAt: now }) as number;

        await db.items.add({ name: 'Item 1', basePrice: 10, createdAt: now, updatedAt: now });
        await db.items.add({ name: 'Item 2', basePrice: 20, createdAt: now, updatedAt: now });
        await db.items.add({ name: 'Item 3', basePrice: 30, createdAt: now, updatedAt: now });

        addToRecentResellers(r1);
        addToRecentResellers(r2);

        const { result } = renderHook(() => useSearch(''));

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        // Should return 2 resellers (from localStorage) and 2 items (most recent desc)
        expect(result.current.recent).toHaveLength(4);

        // Order: Reseller 2, Reseller 1 (by localStorage order)
        expect(result.current.recent[0].title).toBe('Reseller 2');
        expect(result.current.recent[1].title).toBe('Reseller 1');

        // Order: Item 3, Item 2 (by id desc)
        expect(result.current.recent[2].title).toBe('Item 3');
        expect(result.current.recent[3].title).toBe('Item 2');
    });
});
