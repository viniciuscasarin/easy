import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useDebtAging } from "@/hooks/useDashboard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";

// Formatter for BRL
const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function DebtHealthAgingCard() {
    const { data, isLoading } = useDebtAging();
    const navigate = useNavigate();

    if (isLoading || !data) {
        return (
            <Card className="w-full animate-pulse">
                <CardHeader>
                    <div className="h-6 w-1/3 bg-muted rounded"></div>
                    <div className="h-4 w-1/2 bg-muted rounded"></div>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-muted"></div>
                </CardContent>
            </Card>
        );
    }

    const { buckets, totalDebt, criticalResellers } = data;
    const now = new Date();

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Radar de Recebimentos</CardTitle>
                <CardDescription>
                    Distribuição do saldo devedor total por tempo desde a última movimentação.
                    Total: <span className="font-semibold text-foreground">{formatBRL(totalDebt)}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={buckets}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    nameKey="label"
                                >
                                    {buckets.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number) => formatBRL(value)}
                                    contentStyle={{
                                        borderRadius: '8px',
                                        border: '1px solid hsl(var(--border))',
                                        backgroundColor: 'hsl(var(--card))',
                                        color: 'hsl(var(--card-foreground))'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        {buckets.map((bucket) => (
                            <div key={bucket.category} className="flex items-center justify-between p-3 rounded-lg border bg-card shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: bucket.color }}
                                    />
                                    <span className="font-medium text-sm">{bucket.label}</span>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-sm">{formatBRL(bucket.value)}</div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{bucket.percentage.toFixed(1)}% do total</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                    <h3 className="font-semibold mb-4 text-sm flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                        Principais Alertas de Cobrança (Crítico)
                    </h3>
                    {criticalResellers.length > 0 ? (
                        <div className="rounded-md border overflow-hidden">
                            <Table>
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="text-xs h-9">Revendedor</TableHead>
                                        <TableHead className="text-xs h-9">Saldo Devedor</TableHead>
                                        <TableHead className="text-xs h-9 text-right">Inatividade</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {criticalResellers.map((reseller) => {
                                        const daysInactive = reseller.lastMovement.getTime() === 0
                                            ? 'Nunca'
                                            : `${differenceInDays(now, reseller.lastMovement)} dias`;

                                        return (
                                            <TableRow
                                                key={reseller.id}
                                                className="cursor-pointer hover:bg-muted/50 transition-colors"
                                                onClick={() => navigate(`/resellers/${reseller.id}`)}
                                            >
                                                <TableCell className="font-medium py-3 text-sm">{reseller.name}</TableCell>
                                                <TableCell className="py-3 text-sm text-destructive font-semibold">
                                                    {formatBRL(reseller.balance)}
                                                </TableCell>
                                                <TableCell className="py-3 text-sm text-right text-muted-foreground">
                                                    {daysInactive}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-muted-foreground bg-muted/20 rounded-lg border-2 border-dashed">
                            Nenhum revendedor em estado crítico encontrado.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
