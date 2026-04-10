import { ResponsiveDialog } from '@/components/ui/ResponsiveDialog';
import { Button } from '@/components/ui/button';

interface ConfirmImportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export default function ConfirmImportDialog({ open, onOpenChange, onConfirm }: ConfirmImportDialogProps) {
    return (
        <ResponsiveDialog
            open={open}
            onOpenChange={onOpenChange}
            title="Confirmar Importação"
            description="A importação de um backup substituirá todos os dados atuais. Tem certeza que deseja continuar?"
            footer={
                <>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={onConfirm} variant="destructive">Importar</Button>
                </>
            }
        >
            <div className="py-2 text-sm text-muted-foreground italic">
                Atenção: Esta ação é irreversível e todos os dados atuais serão perdidos.
            </div>
        </ResponsiveDialog>
    );
}
