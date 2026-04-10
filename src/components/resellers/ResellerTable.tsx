import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Reseller } from "../../db/database";
import { useDeleteReseller } from "../../hooks/useResellers";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

interface ResellerTableProps {
    resellers: Reseller[];
    onEdit: (reseller: Reseller) => void;
}

export function ResellerTable({ resellers, onEdit }: ResellerTableProps) {
    const navigate = useNavigate();
    const deleteMutation = useDeleteReseller();
    const [resellerToDelete, setResellerToDelete] = useState<Reseller | null>(null);

    const handleDelete = async () => {
        if (resellerToDelete?.id) {
            await deleteMutation.mutateAsync(resellerToDelete.id);
            setResellerToDelete(null);
        }
    };

    return (
        <div>
            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {resellers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                                    Nenhum revendedor encontrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            resellers.map((reseller) => (
                                <TableRow key={reseller.id}>
                                    <TableCell
                                        className="font-medium cursor-pointer text-primary hover:underline"
                                        onClick={() => navigate(`/resellers/${reseller.id}`)}
                                    >
                                        {reseller.name}
                                    </TableCell>
                                    <TableCell>{reseller.phone || "-"}</TableCell>
                                    <TableCell>{reseller.email || "-"}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(reseller)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setResellerToDelete(reseller)}
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={!!resellerToDelete} onOpenChange={(open) => !open && setResellerToDelete(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Excluir Revendedor</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir "{resellerToDelete?.name}"? Esta ação não pode ser desfeita e pode afetar o histórico de transações.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setResellerToDelete(null)}
                            disabled={deleteMutation.isPending}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteMutation.isPending}
                        >
                            {deleteMutation.isPending ? "Excluindo..." : "Confirmar Exclusão"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
