import { useQuery } from '@tanstack/react-query';
import { db } from '../db/database';

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
