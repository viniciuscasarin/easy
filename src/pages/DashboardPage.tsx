import { DashboardCards } from '../components/dashboard/DashboardCards';
import { DebtHealthAgingCard } from '../components/dashboard/DebtHealthAgingCard';
import { PerformanceAnalysisSection } from '../components/dashboard/PerformanceAnalysisSection';
import { useTotalDebt, useTodayOrders } from '../hooks/useDashboard';

export default function DashboardPage() {
    const { data: totalDebt = 0, isLoading: isDebtLoading } = useTotalDebt();
    const { data: todayOrders, isLoading: isOrdersLoading } = useTodayOrders();

    const isLoading = isDebtLoading || isOrdersLoading;

    return (
        <div className="p-4 lg:p-6 space-y-8">
            <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Visão geral do negócio atualizada em tempo real.</p>
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

            <div className="w-full">
                <PerformanceAnalysisSection />
            </div>
        </div>
    );
}
