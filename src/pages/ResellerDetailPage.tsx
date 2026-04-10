import { useParams, useNavigate } from 'react-router-dom';
import { useReseller } from '../hooks/useResellers';
import { useTransactions } from '../hooks/useTransactions';
import { Button } from '../components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TransactionTable } from '../components/transactions/TransactionTable';
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
            <div className="p-4 lg:p-6 flex justify-center text-muted-foreground">
                Carregando ficha do revendedor...
            </div>
        );
    }

    if (!reseller) {
        return (
            <div className="p-4 lg:p-6 flex flex-col items-center space-y-4">
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
        <div className="p-4 lg:p-6 space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/resellers')} className="shrink-0">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight truncate">Ficha do Revendedor</h1>
                    <p className="text-muted-foreground text-sm truncate">
                        Visualizando dados de {reseller.name}
                    </p>
                </div>
                <Button onClick={handleGeneratePDF} variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Gerar PDF
                </Button>
            </div>

            <div className="flex sm:hidden">
                <Button onClick={handleGeneratePDF} variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Gerar PDF (Extrato)
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Informações Pessoais</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Nome:</span>
                            <span>{reseller.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Telefone:</span>
                            <span>{reseller.phone || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground">Email:</span>
                            <span>{reseller.email || '-'}</span>
                        </div>
                        {reseller.notes && (
                            <div className="pt-2 border-t mt-2">
                                <span className="font-medium text-muted-foreground block mb-1">Observações:</span>
                                <p className="text-xs italic">{reseller.notes}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className={balance > 0 ? "border-debt/20 bg-debt/5" : "border-payment/20 bg-payment/5"}>
                    <CardHeader>
                        <CardTitle className="text-lg text-center md:text-left">Saldo Devedor Atual</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center md:items-start">
                        <div className={`text-4xl font-extrabold ${balance > 0 ? "text-debt" : "text-payment"}`}>
                            R$ {balance.toFixed(2)}
                        </div>
                        <p className="text-sm font-medium mt-2 text-muted-foreground">
                            {balance > 0 ? "⚠️ Débito pendente" : balance < 0 ? "✅ Crédito acumulado" : "✨ Saldo quitado"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-bold px-1">Histórico de Movimentações</h2>
                <TransactionTable transactions={transactions} />
            </div>
        </div>
    );
}
