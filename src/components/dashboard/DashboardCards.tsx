import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ShoppingCart } from 'lucide-react';

interface DashboardCardsProps {
    totalDebt: number;
    todayOrdersCount: number;
    todayOrdersVolume: number;
    isLoading: boolean;
}

export function DashboardCards({
    totalDebt,
    todayOrdersCount,
    todayOrdersVolume,
    isLoading
}: DashboardCardsProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Dívida Total</CardTitle>
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Carregando...</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pedidos de Hoje</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Carregando...</div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Dívida Total</CardTitle>
                    <AlertCircle className="h-4 w-4 text-debt" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-debt">
                        {formatCurrency(totalDebt)}
                    </div>
                    {totalDebt === 0 && (
                        <p className="text-xs text-muted-foreground mt-1">Nenhuma dívida pendente.</p>
                    )}
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pedidos de Hoje</CardTitle>
                    <ShoppingCart className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        {todayOrdersCount} {todayOrdersCount === 1 ? 'pedido' : 'pedidos'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        Volume total: {formatCurrency(todayOrdersVolume)}
                    </p>
                    {todayOrdersCount === 0 && (
                        <p className="text-xs text-muted-foreground mt-1">Nenhum pedido realizado hoje.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
