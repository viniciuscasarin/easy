import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { ItemTable } from "../components/items/ItemTable";
import { ItemForm } from "../components/items/ItemForm";
import type { Item } from "../db/database";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";

export default function ItemsPage() {
    const { data: items = [], isLoading } = useItems();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Item | undefined>();

    const handleCreateNew = () => {
        setEditingItem(undefined);
        setIsDialogOpen(true);
    };

    const handleEdit = (item: Item) => {
        setEditingItem(item);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingItem(undefined);
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Catálogo de Itens</h1>
                    <p className="text-muted-foreground">
                        Gerencie os itens disponíveis para lançamento nos pedidos.
                    </p>
                </div>
                <Button onClick={handleCreateNew}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Item
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8 text-muted-foreground">
                    Carregando itens...
                </div>
            ) : (
                <ItemTable items={items} onEdit={handleEdit} />
            )}

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? "Editar Item" : "Novo Item"}
                        </DialogTitle>
                    </DialogHeader>
                    <ItemForm
                        initialData={editingItem}
                        onSubmitSuccess={handleCloseDialog}
                        onCancel={handleCloseDialog}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
