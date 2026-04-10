// src/components/backup/ConfirmImportDialog.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmImportDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
}

export default function ConfirmImportDialog({ open, onOpenChange, onConfirm }: ConfirmImportDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Import</DialogTitle>
                    <DialogDescription>
                        Importing a backup will replace all current data. Are you sure you want to continue?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>
                        Cancel
                    </DialogClose>
                    <Button onClick={onConfirm}>Import</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
