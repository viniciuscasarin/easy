import Dexie, { type EntityTable } from 'dexie';

export interface Item {
    id?: number;
    name: string;
    basePrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Reseller {
    id?: number;
    name: string;
    phone?: string;
    email?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export type TransactionType = 'order' | 'payment' | 'signal';

export interface Transaction {
    id?: number;
    resellerId: number;
    type: TransactionType;
    // Campos para pedido
    itemId?: number;
    itemName?: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice: number;
    observation?: string;
    // Comum
    createdAt: Date;
}

class AppDatabase extends Dexie {
    items!: EntityTable<Item, 'id'>;
    resellers!: EntityTable<Reseller, 'id'>;
    transactions!: EntityTable<Transaction, 'id'>;

    constructor() {
        super('ResellerManagerDB');
        this.version(1).stores({
            items: '++id, name',
            resellers: '++id, name',
            transactions: '++id, resellerId, type, createdAt'
        });
    }
}

export const db = new AppDatabase();
