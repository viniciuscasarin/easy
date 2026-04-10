import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ParetoChartProps {
    data: {
        resellerName: string;
        revenue: number;
        cumulativePercentage: number;
    }[];
}

const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function ParetoChart({ data }: ParetoChartProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Análise de Pareto (80/20)</CardTitle>
                <CardDescription>
                    Faturamento por revendedor e percentual acumulado do total no período selecionado.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis
                                dataKey="resellerName"
                                tick={{ fontSize: 10 }}
                                interval={data.length > 15 ? 1 : 0}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                            />
                            <YAxis
                                yAxisId="left"
                                tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                domain={[0, 100]}
                                tickFormatter={(value) => `${value}%`}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip
                                formatter={(value: any, name: string) => {
                                    if (name === 'Faturamento') return [formatBRL(value), name];
                                    return [`${value.toFixed(1)}%`, name];
                                }}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid hsl(var(--border))',
                                    backgroundColor: 'hsl(var(--card))',
                                    color: 'hsl(var(--card-foreground))'
                                }}
                            />
                            <Legend verticalAlign="top" height={36} />
                            <ReferenceLine yAxisId="right" y={80} label={{ position: 'right', value: '80%', fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                            <Bar
                                yAxisId="left"
                                dataKey="revenue"
                                name="Faturamento"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                                barSize={30}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="cumulativePercentage"
                                name="% Acumulado"
                                stroke="hsl(var(--destructive))"
                                strokeWidth={3}
                                dot={{ r: 4, fill: 'hsl(var(--destructive))' }}
                                activeDot={{ r: 6 }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
