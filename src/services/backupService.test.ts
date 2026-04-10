import 'fake-indexeddb/auto';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportData, importData } from './backupService';
import { db } from '../db/database';

// Mock Dexie
vi.mock('../db/database', () => ({
    db: {
        items: { toArray: vi.fn(), clear: vi.fn(), bulkAdd: vi.fn() },
        resellers: { toArray: vi.fn(), clear: vi.fn(), bulkAdd: vi.fn() },
        transactions: { toArray: vi.fn(), clear: vi.fn(), bulkAdd: vi.fn() },
        transaction: vi.fn((_type, _tables, cb) => cb()),
    },
}));

// Mock DOM/Browser APIs
const mockClick = vi.fn();
const mockCreateObjectURL = vi.fn().mockReturnValue('blob:url');
const mockRevokeObjectURL = vi.fn();

vi.stubGlobal('URL', {
    createObjectURL: mockCreateObjectURL,
    revokeObjectURL: mockRevokeObjectURL,
});

vi.stubGlobal('document', {
    createElement: vi.fn().mockReturnValue({
        click: mockClick,
        setAttribute: vi.fn(),
        href: '',
        download: '',
    }),
});

describe('backupService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('exportData', () => {
        it('should fetch data from all tables and trigger download', async () => {
            const mockItems = [{ id: 1, name: 'Item 1' }];
            const mockResellers = [{ id: 1, name: 'Reseller 1' }];
            const mockTransactions = [{ id: 1, total: 100 }];

            (db.items.toArray as any).mockResolvedValue(mockItems);
            (db.resellers.toArray as any).mockResolvedValue(mockResellers);
            (db.transactions.toArray as any).mockResolvedValue(mockTransactions);

            await exportData();

            expect(db.items.toArray).toHaveBeenCalled();
            expect(db.resellers.toArray).toHaveBeenCalled();
            expect(db.transactions.toArray).toHaveBeenCalled();

            expect(mockCreateObjectURL).toHaveBeenCalled();
            expect(mockClick).toHaveBeenCalled();
            expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:url');
        });
    });

    describe('importData', () => {
        it('should throw error for invalid JSON', async () => {
            const file = new File(['invalid'], 'backup.json', { type: 'application/json' });
            await expect(importData(file)).rejects.toThrow('Invalid JSON file');
        });

        it('should throw error for missing data arrays', async () => {
            const data = JSON.stringify({ version: 1, data: { items: [] } });
            const file = new File([data], 'backup.json', { type: 'application/json' });
            await expect(importData(file)).rejects.toThrow('Backup file missing required data arrays');
        });

        it('should clear database and add new data on valid import', async () => {
            const mockData = {
                version: 1,
                data: {
                    items: [{ id: 1, name: 'New Item', createdAt: '2024-01-01', updatedAt: '2024-01-01' }],
                    resellers: [{ id: 1, name: 'New Reseller', createdAt: '2024-01-01', updatedAt: '2024-01-01' }],
                    transactions: [{ id: 1, resellerId: 1, totalPrice: 100, createdAt: '2024-01-01' }],
                },
            };
            const file = new File([JSON.stringify(mockData)], 'backup.json', { type: 'application/json' });

            await importData(file);

            expect(db.items.clear).toHaveBeenCalled();
            expect(db.resellers.clear).toHaveBeenCalled();
            expect(db.transactions.clear).toHaveBeenCalled();

            expect(db.items.bulkAdd).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ name: 'New Item', createdAt: expect.any(Date) })
            ]));
            expect(db.resellers.bulkAdd).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ name: 'New Reseller', createdAt: expect.any(Date) })
            ]));
            expect(db.transactions.bulkAdd).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ totalPrice: 100, createdAt: expect.any(Date) })
            ]));
        });
    });
});
