import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DefaultRankingChartProps {
    data: {
        resellerName: string;
        balance: number;
    }[];
}

const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function DefaultRankingChart({ data }: DefaultRankingChartProps) {
    // Limit to top 10 if not already limited
    const top10 = data.slice(0, 10);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Ranking de Inadimplência</CardTitle>
                <CardDescription>
                    Top 10 revendedores com maior saldo devedor acumulado.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={top10}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis
                                type="number"
                                tickFormatter={(value) => `R$${(value / 1000).toFixed(0)}k`}
                                tick={{ fontSize: 12 }}
                            />
                            <YAxis
                                dataKey="resellerName"
                                type="category"
                                tick={{ fontSize: 11 }}
                                width={120}
                            />
                            <Tooltip
                                formatter={(value: number) => formatBRL(value)}
                                labelStyle={{ fontWeight: 'bold' }}
                                contentStyle={{
                                    borderRadius: '8px',
                                    border: '1px solid hsl(var(--border))',
                                    backgroundColor: 'hsl(var(--card))',
                                    color: 'hsl(var(--card-foreground))'
                                }}
                            />
                            <Bar
                                dataKey="balance"
                                name="Saldo Devedor"
                                fill="hsl(var(--destructive))"
                                radius={[0, 4, 4, 0]}
                                barSize={24}
                            >
                                {top10.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={`hsl(var(--destructive) / ${Math.max(0.4, 1 - index * 0.06)})`}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
