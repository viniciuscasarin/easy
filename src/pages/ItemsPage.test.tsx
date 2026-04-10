import 'fake-indexeddb/auto';
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ItemsPage from './ItemsPage';
import { db } from '../db/database';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
);

describe('ItemsPage Integration', () => {
    beforeEach(async () => {
        await db.items.clear();
        queryClient.clear();
    });

    // Handle ResizeObserver not defined in jsdom
    beforeAll(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    it('creates, lists, edits and deletes an item', async () => {
        render(<ItemsPage />, { wrapper });

        // Ensure table is empty
        expect(await screen.findByText(/Nenhum item cadastrado/i)).toBeInTheDocument();

        // 1. Create string
        fireEvent.click(screen.getByRole('button', { name: /Novo Item/i }));
        expect(await screen.findByText('Novo Item', { selector: 'h2' })).toBeInTheDocument();

        const nameInput = screen.getByLabelText(/Nome do Item/i);
        const priceInput = screen.getByLabelText(/Preço Base/i);

        fireEvent.change(nameInput, { target: { value: 'Perfume Teste' } });
        fireEvent.change(priceInput, { target: { value: '150.50' } });
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

        // Wait for modal to close and table to refresh
        await waitFor(() => {
            expect(screen.queryByText('Salvar')).not.toBeInTheDocument();
        });

        // 2. List
        expect(await screen.findByText('Perfume Teste')).toBeInTheDocument();
        expect(screen.getByText(/150,50/)).toBeInTheDocument();

        // 3. Edit
        fireEvent.click(screen.getByRole('button', { name: /Editar/i }));
        expect(await screen.findByText('Editar Item', { selector: 'h2' })).toBeInTheDocument();

        const priceInputEdit = screen.getByLabelText(/Preço Base/i);
        fireEvent.change(priceInputEdit, { target: { value: '160.00' } });
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

        await waitFor(() => {
            expect(screen.queryByText('Editar Item', { selector: 'h2' })).not.toBeInTheDocument();
        });

        expect(await screen.findByText(/160,00/)).toBeInTheDocument();

        // 4. Delete
        fireEvent.click(screen.getByRole('button', { name: /Excluir/i }));

        expect(await screen.findByText(/excluir o item/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /Confirmar Exclusão/i }));

        await waitFor(() => {
            expect(screen.queryByText(/Confirmar Exclusão/i)).not.toBeInTheDocument();
        });

        // Table empty
        expect(await screen.findByText(/Nenhum item cadastrado/i)).toBeInTheDocument();
    });
});
