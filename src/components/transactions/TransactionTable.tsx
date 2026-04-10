import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Card, CardContent } from '../ui/card';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Calendar, Tag, Layers, CircleDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Transaction } from '@/db/database';

interface TransactionTableProps {
    transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    if (!isDesktop) {
        return (
            <div className="space-y-4">
                {transactions.length === 0 ? (
                    <div className="text-center py-10 bg-card rounded-lg border border-dashed text-muted-foreground">
                        Nenhuma movimentação encontrada.
                    </div>
                ) : (
                    transactions.map((t) => (
                        <Card key={t.id} className="overflow-hidden">
                            <CardContent className="p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <Calendar size={14} className="text-muted-foreground" />
                                        {t.createdAt.toLocaleDateString()}
                                    </div>
                                    <div className={cn(
                                        "px-2 py-0.5 rounded-full text-xs font-semibold",
                                        t.type === 'order' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    )}>
                                        {t.type === 'order' ? 'Pedido' : t.type === 'payment' ? 'Pagamento' : 'Sinal'}
                                    </div>
                                </div>

                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        {t.itemName && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Tag size={14} className="text-muted-foreground" />
                                                <span>{t.itemName}</span>
                                            </div>
                                        )}
                                        {t.quantity && (
                                            <div className="flex items-center gap-2 text-sm">
                                                <Layers size={14} className="text-muted-foreground" />
                                                <span>Qtd: {t.quantity}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className={cn(
                                        "text-lg font-bold flex items-center gap-1",
                                        t.type === 'order' ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                                    )}>
                                        <CircleDollarSign size={18} />
                                        {formatCurrency(t.totalPrice)}
                                    </div>
                                </div>

                                {t.observation && (
                                    <div className="mt-2 text-sm text-muted-foreground bg-muted/50 p-2 rounded italic">
                                        "{t.observation}"
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        );
    }

    return (
        <div className="rounded-md border bg-card overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Qtd</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Observação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transactions.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                                Nenhuma movimentação encontrada.
                            </TableCell>
                        </TableRow>
                    ) : (
                        transactions.map((t) => (
                            <TableRow key={t.id}>
                                <TableCell>{t.createdAt.toLocaleDateString()}</TableCell>
                                <TableCell>
                                    {t.type === 'order' ? 'Pedido' : t.type === 'payment' ? 'Pagamento' : 'Sinal'}
                                </TableCell>
                                <TableCell>{t.itemName || '-'}</TableCell>
                                <TableCell>{t.quantity ? t.quantity : '-'}</TableCell>
                                <TableCell className={cn(
                                    "font-medium",
                                    t.type === 'order' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                                )}>
                                    {formatCurrency(t.totalPrice)}
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">{t.observation || '-'}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

