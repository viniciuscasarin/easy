import { DashboardCards } from '../components/dashboard/DashboardCards';
import { DebtHealthAgingCard } from '../components/dashboard/DebtHealthAgingCard';
import { useTotalDebt, useTodayOrders } from '../hooks/useDashboard';

export default function DashboardPage() {
    const { data: totalDebt = 0, isLoading: isDebtLoading } = useTotalDebt();
    const { data: todayOrders, isLoading: isOrdersLoading } = useTodayOrders();

    const isLoading = isDebtLoading || isOrdersLoading;

    return (
        <div className="p-4 lg:p-6 space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
                <p className="text-muted-foreground">Visão geral do negócio atualizada em tempo real.</p>
            </div>

            <DashboardCards
                totalDebt={totalDebt}
                todayOrdersCount={todayOrders?.count || 0}
                todayOrdersVolume={todayOrders?.volume || 0}
                isLoading={isLoading}
            />

            <div className="w-full">
                <DebtHealthAgingCard />
            </div>
        </div>
    );
}
