import { useState } from "react";
import type { Item } from "../../db/database";
import { useDeleteItem } from "../../hooks/useItems";
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
import { Tag, CircleDollarSign } from "lucide-react";

interface ItemTableProps {
    items: Item[];
    onEdit: (item: Item) => void;
}

export function ItemTable({ items, onEdit }: ItemTableProps) {
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const deleteMutation = useDeleteItem();
    const [itemToDelete, setItemToDelete] = useState<Item | null>(null);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const handleDelete = async () => {
        if (itemToDelete?.id) {
            await deleteMutation.mutateAsync(itemToDelete.id);
            setItemToDelete(null);
        }
    };

    if (!isDesktop) {
        return (
            <div className="space-y-4">
                {items.length === 0 ? (
                    <div className="text-center py-10 bg-card rounded-lg border border-dashed text-muted-foreground">
                        Nenhum item cadastrado.
                    </div>
                ) : (
                    items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                            <CardContent className="p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="font-bold text-lg text-primary flex items-center gap-2">
                                        <Tag size={18} />
                                        {item.name}
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setItemToDelete(item)}
                                        >
                                            Excluir
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
                                    <CircleDollarSign size={20} className="text-payment" />
                                    <span>{formatCurrency(item.basePrice)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}

                <ResponsiveDialog
                    open={!!itemToDelete}
                    onOpenChange={(open) => !open && setItemToDelete(null)}
                    title="Excluir Item"
                    description={`Tem certeza que deseja excluir o item "${itemToDelete?.name}"? Esta ação não pode ser desfeita.`}
                    footer={
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setItemToDelete(null)}
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
                        A exclusão removerá o item do catálogo permanentemente.
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
                            <TableHead>Preço Base</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                                    Nenhum item cadastrado.
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{formatCurrency(item.basePrice)}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => onEdit(item)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setItemToDelete(item)}
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
                open={!!itemToDelete}
                onOpenChange={(open) => !open && setItemToDelete(null)}
                title="Excluir Item"
                description={`Tem certeza que deseja excluir o item "${itemToDelete?.name}"? Esta ação não pode ser desfeita.`}
                footer={
                    <>
                        <Button
                            variant="outline"
                            onClick={() => setItemToDelete(null)}
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
                <div className="text-sm text-muted-foreground">
                    Esta ação não pode ser desfeita.
                </div>
            </ResponsiveDialog>
        </div>
    );
}
