import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { DashboardCards } from './DashboardCards';

describe('DashboardCards component', () => {
    it('renders loading state', () => {
        render(<DashboardCards totalDebt={0} todayOrdersCount={0} todayOrdersVolume={0} isLoading={true} />);

        expect(screen.getAllByText('Carregando...')).toHaveLength(2);
    });

    it('renders empty states correctly', () => {
        render(<DashboardCards totalDebt={0} todayOrdersCount={0} todayOrdersVolume={0} isLoading={false} />);

        expect(screen.getByText('Nenhuma dívida pendente.')).toBeInTheDocument();
        expect(screen.getByText('Nenhum pedido realizado hoje.')).toBeInTheDocument();

        expect(screen.getByText(/0,00/)).toBeInTheDocument();
    });

    it('renders single order text', () => {
        render(<DashboardCards totalDebt={50} todayOrdersCount={1} todayOrdersVolume={50} isLoading={false} />);

        expect(screen.getByText('1 pedido')).toBeInTheDocument();
        expect(screen.getByText(/50,00/)).toBeInTheDocument();
    });

    it('renders data correctly', () => {
        render(<DashboardCards totalDebt={150.5} todayOrdersCount={3} todayOrdersVolume={500} isLoading={false} />);

        expect(screen.getByText(/150,50/)).toBeInTheDocument();
        expect(screen.getByText('3 pedidos')).toBeInTheDocument();
        expect(screen.getByText(/500,00/)).toBeInTheDocument();

        const debtDiv = screen.getByText(/150,50/);
        expect(debtDiv.className).toContain('text-red-600');
    });
});
