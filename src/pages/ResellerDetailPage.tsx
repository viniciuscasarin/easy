import { useParams, useNavigate } from 'react-router-dom';
import { useReseller } from '../hooks/useResellers';
import { useTransactions } from '../hooks/useTransactions';
import { Button } from '../components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { generateResellerExtract } from '../services/pdfService';
import { useMemo } from 'react';

export default function ResellerDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const resellerId = id ? parseInt(id, 10) : undefined;

    const { data: reseller, isLoading: isLoadingReseller } = useReseller(resellerId);
    const { data: transactionsData, isLoading: isLoadingTransactions } = useTransactions(resellerId);

    const transactions = useMemo(() => {
        if (!transactionsData) return [];
        return [...transactionsData].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }, [transactionsData]);

    const balance = useMemo(() => {
        if (!transactions) return 0;
        const totalOrders = transactions
            .filter(t => t.type === 'order')
            .reduce((sum, t) => sum + t.totalPrice, 0);

        const totalPayments = transactions
            .filter(t => t.type !== 'order')
            .reduce((sum, t) => sum + t.totalPrice, 0);

        return totalOrders - totalPayments;
    }, [transactions]);

    const isLoading = isLoadingReseller || isLoadingTransactions;

    if (isLoading) {
        return (
            <div className="p-6 flex justify-center text-muted-foreground">
                Carregando ficha do revendedor...
            </div>
        );
    }

    if (!reseller) {
        return (
            <div className="p-6 flex flex-col items-center space-y-4">
                <p className="text-muted-foreground">Revendedor não encontrado.</p>
                <Button onClick={() => navigate('/resellers')}>Voltar para Revendedores</Button>
            </div>
        );
    }

    const handleGeneratePDF = () => {
        if (transactions) {
            generateResellerExtract(reseller, transactions, balance);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/resellers')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold tracking-tight">Ficha do Revendedor</h1>
                    <p className="text-muted-foreground">
                        Detalhes e histórico de transações.
                    </p>
                </div>
                <Button onClick={handleGeneratePDF} variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Gerar PDF
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Informações Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div>
                            <span className="font-medium">Nome:</span> {reseller.name}
                        </div>
                        <div>
                            <span className="font-medium">Telefone:</span> {reseller.phone || '-'}
                        </div>
                        <div>
                            <span className="font-medium">Email:</span> {reseller.email || '-'}
                        </div>
                        {reseller.notes && (
                            <div>
                                <span className="font-medium">Observações:</span> {reseller.notes}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className={balance > 0 ? "border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-900" : "border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900"}>
                    <CardHeader>
                        <CardTitle>Saldo Devedor Atual</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className={`text-4xl font-bold ${balance > 0 ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"}`}>
                            R$ {balance.toFixed(2)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            {balance > 0 ? "Restante a pagar" : balance < 0 ? "Crédito a favor" : "Tudo quitado"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Histórico de Movimentações</CardTitle>
                </CardHeader>
                <CardContent>
                    {transactions && transactions.length > 0 ? (
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
                                {transactions.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell>{t.createdAt.toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {t.type === 'order' ? 'Pedido' : t.type === 'payment' ? 'Pagamento' : 'Sinal'}
                                        </TableCell>
                                        <TableCell>{t.itemName || '-'}</TableCell>
                                        <TableCell>{t.quantity ? t.quantity : '-'}</TableCell>
                                        <TableCell className={`font-medium ${t.type === 'order' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                                            R$ {t.totalPrice.toFixed(2)}
                                        </TableCell>
                                        <TableCell>{t.observation || '-'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center p-4 text-muted-foreground">
                            Nenhuma movimentação encontrada.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
