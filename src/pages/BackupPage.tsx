// src/pages/BackupPage.tsx
import ImportExport from '@/components/backup/ImportExport';

export default function BackupPage() {
    return (
        <div className="p-4 lg:p-6 space-y-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Backup &amp; Restore</h1>
                    <p className="text-muted-foreground">
                        Use os botões abaixo para exportar os dados atuais para um arquivo JSON ou importar um backup anterior.
                    </p>
                </div>
                <div className="bg-card rounded-xl border p-4 sm:p-6">
                    <ImportExport />
                </div>
            </div>
        </div>
    );
}

