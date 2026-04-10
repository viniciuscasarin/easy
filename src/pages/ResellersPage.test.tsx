import 'fake-indexeddb/auto';
import React from 'react';
import { describe, it, expect, beforeEach, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ResellersPage from './ResellersPage';
import ResellerDetailPage from './ResellerDetailPage';
import { db } from '../db/database';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/resellers']}>
            <Routes>
                <Route path="/resellers" element={children} />
                <Route path="/resellers/:id" element={<ResellerDetailPage />} />
            </Routes>
        </MemoryRouter>
    </QueryClientProvider>
);

describe('ResellersPage Tests', () => {
    beforeEach(async () => {
        await db.resellers.clear();
        queryClient.clear();
    });

    beforeAll(() => {
        global.ResizeObserver = class ResizeObserver {
            observe() { }
            unobserve() { }
            disconnect() { }
        };
    });

    it('renders ResellerForm and ResellerTable components correctly', async () => {
        render(<ResellersPage />, { wrapper });

        // Verifica renderização da tabela
        expect(await screen.findByText(/Nenhum revendedor encontrado/i)).toBeInTheDocument();

        // Verifica abertura e renderização do form
        fireEvent.click(screen.getByRole('button', { name: /Novo Revendedor/i }));
        expect(await screen.findByText('Novo Revendedor', { selector: 'h2' })).toBeInTheDocument();
        expect(screen.getByLabelText(/Nome do Revendedor/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Telefone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('creates, lists, searches, edits and deletes a reseller (Integration)', async () => {
        render(<ResellersPage />, { wrapper });

        // 1. Create
        fireEvent.click(screen.getByRole('button', { name: /Novo Revendedor/i }));
        expect(await screen.findByText('Novo Revendedor', { selector: 'h2' })).toBeInTheDocument();

        const nameInput = screen.getByLabelText(/Nome do Revendedor/i);
        const phoneInput = screen.getByLabelText(/Telefone/i);

        fireEvent.change(nameInput, { target: { value: 'João da Silva' } });
        fireEvent.change(phoneInput, { target: { value: '11999999999' } });
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

        await waitFor(() => {
            expect(screen.queryByText('Salvar')).not.toBeInTheDocument();
        });

        // 2. List
        expect(await screen.findByText('João da Silva')).toBeInTheDocument();
        expect(screen.getByText('11999999999')).toBeInTheDocument();

        // 3. Create another one for search test
        fireEvent.click(screen.getByRole('button', { name: /Novo Revendedor/i }));
        const nameInput2 = await screen.findByLabelText(/Nome do Revendedor/i);
        fireEvent.change(nameInput2, { target: { value: 'Maria Souza' } });
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));
        expect(await screen.findByText('Maria Souza')).toBeInTheDocument();

        // 4. Search Filter
        const searchInput = screen.getByPlaceholderText(/Buscar por nome.../i);
        fireEvent.change(searchInput, { target: { value: 'Maria' } });

        await waitFor(() => {
            expect(screen.getByText('Maria Souza')).toBeInTheDocument();
            expect(screen.queryByText('João da Silva')).not.toBeInTheDocument();
        });

        // Clear search
        fireEvent.change(searchInput, { target: { value: '' } });
        expect(await screen.findByText('João da Silva')).toBeInTheDocument();

        // 5. Edit
        // Pega os botões da linha do João
        const editButtons = screen.getAllByRole('button', { name: /Editar/i });
        fireEvent.click(editButtons[0]); // João

        expect(await screen.findByText('Editar Revendedor', { selector: 'h2' })).toBeInTheDocument();
        const editNameInput = screen.getByLabelText(/Nome do Revendedor/i);
        fireEvent.change(editNameInput, { target: { value: 'João da Silva Santos' } });
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

        await waitFor(() => {
            expect(screen.queryByText('Editar Revendedor', { selector: 'h2' })).not.toBeInTheDocument();
        });

        expect(await screen.findByText('João da Silva Santos')).toBeInTheDocument();

        // 6. Delete
        const deleteButtons = screen.getAllByRole('button', { name: /Excluir/i });
        fireEvent.click(deleteButtons[0]);

        expect(await screen.findByText(/Tem certeza que deseja excluir "João da Silva Santos"/i)).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: /Confirmar Exclusão/i }));

        await waitFor(() => {
            expect(screen.queryByText(/Confirmar Exclusão/i)).not.toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.queryByText('João da Silva Santos')).not.toBeInTheDocument();
        });
        expect(screen.getByText('Maria Souza')).toBeInTheDocument();
    });

    it('navigates to reseller details page when clicking on the reseller name', async () => {
        // Render com a rota base já em /resellers e ResellersPage como element
        render(<ResellersPage />, { wrapper });

        // Cria revendedor
        fireEvent.click(screen.getByRole('button', { name: /Novo Revendedor/i }));
        const nameInput = await screen.findByLabelText(/Nome do Revendedor/i);
        fireEvent.change(nameInput, { target: { value: 'José Pereira' } });
        fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

        // Encontra nome e clica
        const resellerName = await screen.findByText('José Pereira');
        fireEvent.click(resellerName);

        // Verifica renderização da página de detalhes (route match)
        expect(await screen.findByText('Ficha do Revendedor')).toBeInTheDocument();
        expect(screen.getByText('José Pereira', { exact: false })).toBeInTheDocument();
    });
});
