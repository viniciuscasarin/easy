import 'fake-indexeddb/auto';
import { describe, it, expect, beforeEach } from 'vitest';
import { db } from './database';

describe('AppDatabase', () => {
    beforeEach(async () => {
        await db.items.clear();
        await db.resellers.clear();
        await db.transactions.clear();
    });

    it('should create and retrieve an item', async () => {
        const id = await db.items.add({
            name: 'Test Item',
            basePrice: 100,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const item = await db.items.get(id);
        expect(item).toBeDefined();
        expect(item?.name).toBe('Test Item');
    });

    it('should create and retrieve a reseller', async () => {
        const id = await db.resellers.add({
            name: 'Test Reseller',
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const reseller = await db.resellers.get(id);
        expect(reseller).toBeDefined();
        expect(reseller?.name).toBe('Test Reseller');
    });

    it('should create and retrieve a transaction', async () => {
        const id = await db.transactions.add({
            resellerId: 1,
            type: 'order',
            totalPrice: 200,
            createdAt: new Date()
        });

        const transaction = await db.transactions.get(id);
        expect(transaction).toBeDefined();
        expect(transaction?.type).toBe('order');
        expect(transaction?.totalPrice).toBe(200);
    });
});
