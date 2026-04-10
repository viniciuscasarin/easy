import { DashboardCards } from '../components/dashboard/DashboardCards';
import { useTotalDebt, useTodayOrders } from '../hooks/useDashboard';

export default function DashboardPage() {
    const { data: totalDebt = 0, isLoading: isDebtLoading } = useTotalDebt();
    const { data: todayOrders, isLoading: isOrdersLoading } = useTodayOrders();

    const isLoading = isDebtLoading || isOrdersLoading;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="mb-6 text-muted-foreground">Visão geral do negócio atualizada em tempo real.</p>

            <DashboardCards
                totalDebt={totalDebt}
                todayOrdersCount={todayOrders?.count || 0}
                todayOrdersVolume={todayOrders?.volume || 0}
                isLoading={isLoading}
            />
        </div>
    );
}
