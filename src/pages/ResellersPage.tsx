import { useState, useMemo } from "react";
import { useResellers } from "../hooks/useResellers";
import { ResellerTable } from "../components/resellers/ResellerTable";
import { ResellerForm } from "../components/resellers/ResellerForm";
import type { Reseller } from "../db/database";
import { Button } from "../components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { ResponsiveDialog } from "../components/ui/ResponsiveDialog";

export default function ResellersPage() {
    const { data: resellers = [], isLoading } = useResellers();
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingReseller, setEditingReseller] = useState<Reseller | undefined>();

    const handleCreateNew = () => {
        setEditingReseller(undefined);
        setIsDialogOpen(true);
    };

    const handleEdit = (reseller: Reseller) => {
        setEditingReseller(reseller);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setEditingReseller(undefined);
    };

    const filteredResellers = useMemo(() => {
        if (!searchQuery.trim()) return resellers;
        const queryTerm = searchQuery.toLowerCase();
        return resellers.filter(reseller =>
            reseller.name.toLowerCase().includes(queryTerm)
        );
    }, [resellers, searchQuery]);

    return (
        <div className="p-4 lg:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Revendedores</h1>
                    <p className="text-muted-foreground">
                        Gerencie sua rede de revendedores e acompanhe seus dados.
                    </p>
                </div>
                <Button onClick={handleCreateNew} className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Revendedor
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Buscar por nome..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-8 text-muted-foreground">
                    Carregando revendedores...
                </div>
            ) : (
                <ResellerTable resellers={filteredResellers} onEdit={handleEdit} />
            )}

            <ResponsiveDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                title={editingReseller ? "Editar Revendedor" : "Novo Revendedor"}
            >
                <ResellerForm
                    initialData={editingReseller}
                    onSubmitSuccess={handleCloseDialog}
                    onCancel={handleCloseDialog}
                />
            </ResponsiveDialog>
        </div>
    );
}
