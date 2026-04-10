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
import { ResponsiveDialog } from "../ui/ResponsiveDialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Card, CardContent } from "../ui/card";
import { Phone, Mail, ChevronRight } from "lucide-react";

interface ResellerTableProps {
    resellers: Reseller[];
    onEdit: (reseller: Reseller) => void;
}

export function ResellerTable({ resellers, onEdit }: ResellerTableProps) {
    const navigate = useNavigate();
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const deleteMutation = useDeleteReseller();
    const [resellerToDelete, setResellerToDelete] = useState<Reseller | null>(null);

    const handleDelete = async () => {
        if (resellerToDelete?.id) {
            await deleteMutation.mutateAsync(resellerToDelete.id);
            setResellerToDelete(null);
        }
    };

    if (!isDesktop) {
        return (
            <div className="space-y-4">
                {resellers.length === 0 ? (
                    <div className="text-center py-10 bg-card rounded-lg border border-dashed text-muted-foreground">
                        Nenhum revendedor encontrado.
                    </div>
                ) : (
                    resellers.map((reseller) => (
                        <Card key={reseller.id} className="overflow-hidden hover:border-primary/50 transition-colors">
                            <CardContent className="p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div
                                        className="font-bold text-lg text-primary cursor-pointer hover:underline flex items-center gap-1"
                                        onClick={() => navigate(`/resellers/${reseller.id}`)}
                                    >
                                        {reseller.name}
                                        <ChevronRight size={16} />
                                    </div>
                                    <div className="flex gap-2">
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
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} />
                                        <span>{reseller.phone || "Sem telefone"}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} />
                                        <span>{reseller.email || "Sem email"}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}

                <ResponsiveDialog
                    open={!!resellerToDelete}
                    onOpenChange={(open) => !open && setResellerToDelete(null)}
                    title="Excluir Revendedor"
                    description={`Tem certeza que deseja excluir "${resellerToDelete?.name}"? Esta ação não pode ser desfeita e pode afetar o histórico de transações.`}
                    footer={
                        <>
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
                        </>
                    }
                >
                    <div className="py-2 text-sm text-muted-foreground">
                        A exclusão é permanente.
                    </div>
                </ResponsiveDialog>
            </div>
        );
    }

    return (
        <div>
            <div className="rounded-md border bg-card overflow-hidden">
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

            <ResponsiveDialog
                open={!!resellerToDelete}
                onOpenChange={(open) => !open && setResellerToDelete(null)}
                title="Excluir Revendedor"
                description={`Tem certeza que deseja excluir "${resellerToDelete?.name}"? Esta ação não pode ser desfeita.`}
                footer={
                    <>
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
                    </>
                }
            >
                <div>
                    Esta ação não pode ser desfeita.
                </div>
            </ResponsiveDialog>
        </div>
    );
}
