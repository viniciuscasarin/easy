
import { TransactionForm } from "../components/transactions/TransactionForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { toast } from "sonner"; // If we add sonner

export default function TransactionsPage() {
    const handleSuccess = () => {
        toast.success("Lançamento salvo com sucesso!");
    };

    const handleCancel = () => {
        // Here we could clear form or similar, but the form resets itself on success.
        // We'll just maybe show a message or do nothing.
    };

    return (
        <div className="p-4 lg:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Lançamento de Demanda</h1>
                <p className="text-muted-foreground">
                    Faça lançamentos de pedidos, pagamentos ou sinais dos revendedores.
                </p>
            </div>

            <Card className="max-w-3xl">
                <CardHeader>
                    <CardTitle>Nova Movimentação</CardTitle>
                    <CardDescription>
                        Preencha os dados abaixo para registrar a movimentação.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TransactionForm
                        onSubmitSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
