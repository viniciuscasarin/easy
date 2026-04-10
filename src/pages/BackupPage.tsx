// src/pages/BackupPage.tsx
import React from 'react';
import ImportExport from '@/components/backup/ImportExport';

export default function BackupPage() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Backup &amp; Restore</h1>
            <p className="mb-4 text-muted-foreground">
                Use the buttons below to export the current application data to a JSON file or import a previously exported backup. Importing will replace all existing data.
            </p>
            <ImportExport />
        </div>
    );
}

