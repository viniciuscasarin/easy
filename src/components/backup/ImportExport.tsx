// src/components/backup/ImportExport.tsx
import React, { useRef, type ChangeEvent } from 'react';
import { exportData, importData } from '@/services/backupService';
import { toast } from 'sonner';
import ConfirmImportDialog from './ConfirmImportDialog';

export default function ImportExport() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

    const handleExport = async () => {
        try {
            await exportData();
            toast.success('Backup exported successfully');
        } catch (e) {
            toast.error('Failed to export backup');
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        if (file) {
            setSelectedFile(file);
            setDialogOpen(true);
        }
    };

    const handleImportConfirm = async () => {
        if (!selectedFile) return;
        try {
            await importData(selectedFile);
            toast.success('Backup imported successfully');
        } catch (err: any) {
            toast.error(err.message ?? 'Failed to import backup');
        } finally {
            setDialogOpen(false);
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                onClick={handleExport}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
                Exportar Backup
            </button>
            <input
                type="file"
                accept=".json"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                id="backup-import"
            />
            <label
                htmlFor="backup-import"
                className="cursor-pointer inline-block px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            >
                Importar Backup
            </label>

            <ConfirmImportDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                onConfirm={handleImportConfirm}
            />
        </div>
    );
}
