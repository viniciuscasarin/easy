import { useQuery } from '@tanstack/react-query';
import { db } from '../db/database';
import { differenceInDays } from 'date-fns';

export interface AgingData {
    category: 'recent' | 'attention' | 'critical';
    label: string;
    value: number;
    percentage: number;
    color: string;
}

export interface CriticalReseller {
    id: number;
    name: string;
    balance: number;
    lastMovement: Date;
}

export interface DebtAgingResult {
    buckets: AgingData[];
    criticalResellers: CriticalReseller[];
    totalDebt: number;
}

export function useTotalDebt() {
    return useQuery({
        queryKey: ['dashboard', 'total-debt'],
        queryFn: async () => {
            const transactions = await db.transactions.toArray();
            let totalDebt = 0;

            for (const t of transactions) {
                if (t.type === 'order') {
                    totalDebt += t.totalPrice;
                } else if (t.type === 'payment' || t.type === 'signal') {
                    totalDebt -= t.totalPrice;
                }
            }

            return totalDebt;
        },
    });
}

export function useTodayOrders() {
    return useQuery({
        queryKey: ['dashboard', 'today-orders'],
        queryFn: async () => {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);

            const transactions = await db.transactions
                .where('createdAt')
                .aboveOrEqual(startOfDay)
                .toArray();

            const todayOrders = transactions.filter(t => t.type === 'order');

            const totalVolume = todayOrders.reduce((sum, current) => sum + current.totalPrice, 0);

            return {
                count: todayOrders.length,
                volume: totalVolume
            };
        },
    });
}

export function useDebtAging() {
    return useQuery({
        queryKey: ['dashboard', 'debt-aging'],
        queryFn: async (): Promise<DebtAgingResult> => {
            const resellers = await db.resellers.toArray();
            const transactions = await db.transactions.toArray();

            const resellerMap = new Map<number, { name: string; balance: number; lastDate: Date | null }>();

            // Initialize map with all resellers
            resellers.forEach(r => {
                if (r.id) {
                    resellerMap.set(r.id, { name: r.name, balance: 0, lastDate: null });
                }
            });

            // Process transactions in a single pass
            transactions.forEach(t => {
                const data = resellerMap.get(t.resellerId);
                if (data) {
                    if (t.type === 'order') {
                        data.balance += t.totalPrice;
                    } else {
                        data.balance -= t.totalPrice;
                    }

                    // Update last movement date
                    if (!data.lastDate || t.createdAt > data.lastDate) {
                        data.lastDate = t.createdAt;
                    }
                }
            });

            const now = new Date();
            let totalDebt = 0;
            const buckets: Record<string, number> = {
                recent: 0,
                attention: 0,
                critical: 0
            };

            const criticalResellersList: CriticalReseller[] = [];

            resellerMap.forEach((data, id) => {
                if (data.balance > 0.01) { // Deal with floating point precision
                    totalDebt += data.balance;

                    let category: 'recent' | 'attention' | 'critical';

                    if (!data.lastDate) {
                        category = 'critical';
                    } else {
                        const days = differenceInDays(now, data.lastDate);
                        if (days < 7) {
                            category = 'recent';
                        } else if (days <= 30) {
                            category = 'attention';
                        } else {
                            category = 'critical';
                        }
                    }

                    buckets[category] += data.balance;

                    if (category === 'critical') {
                        criticalResellersList.push({
                            id,
                            name: data.name,
                            balance: data.balance,
                            lastMovement: data.lastDate || new Date(0)
                        });
                    }
                }
            });

            const resultBuckets: AgingData[] = [
                {
                    category: 'recent',
                    label: 'Recente (< 7d)',
                    value: buckets.recent,
                    percentage: totalDebt > 0 ? (buckets.recent / totalDebt) * 100 : 0,
                    color: 'hsl(var(--success, 142 76% 36%))'
                },
                {
                    category: 'attention',
                    label: 'Em Atenção (8-30d)',
                    value: buckets.attention,
                    percentage: totalDebt > 0 ? (buckets.attention / totalDebt) * 100 : 0,
                    color: 'hsl(var(--warning, 48 96% 53%))'
                },
                {
                    category: 'critical',
                    label: 'Crítico (> 30d)',
                    value: buckets.critical,
                    percentage: totalDebt > 0 ? (buckets.critical / totalDebt) * 100 : 0,
                    color: 'hsl(var(--destructive, 0 84% 60%))'
                }
            ];

            return {
                buckets: resultBuckets,
                criticalResellers: criticalResellersList
                    .sort((a, b) => b.balance - a.balance)
                    .slice(0, 3),
                totalDebt
            };
        }
    });
}
