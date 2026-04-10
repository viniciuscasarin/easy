import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ResellerDetailPage from './ResellerDetailPage';
import { MemoryRouter } from 'react-router-dom';
import { useReseller } from '../hooks/useResellers';
import { useTransactions } from '../hooks/useTransactions';
import { generateResellerExtract } from '../services/pdfService';

vi.mock('../hooks/useResellers', () => ({
    useReseller: vi.fn(),
}));

vi.mock('../hooks/useTransactions', () => ({
    useTransactions: vi.fn(),
}));

vi.mock('../services/pdfService', () => ({
    generateResellerExtract: vi.fn(),
}));

describe('ResellerDetailPage Calculation and Unit rendering', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const mockReseller = { id: 1, name: 'João Silva', phone: '123', createdAt: new Date(), updatedAt: new Date() };

    it('calculates the balance correctly and displays it in red when positive', () => {
        vi.mocked(useReseller).mockReturnValue({ data: mockReseller, isLoading: false } as any);
        vi.mocked(useTransactions).mockReturnValue({
            data: [
                { id: 1, resellerId: 1, type: 'order', totalPrice: 150, createdAt: new Date() },
                { id: 2, resellerId: 1, type: 'payment', totalPrice: 50, createdAt: new Date() }
            ],
            isLoading: false
        } as any);

        render(<MemoryRouter><ResellerDetailPage /></MemoryRouter>);

        expect(screen.getByText('R$ 100.00')).toBeInTheDocument();
        const balanceDiv = screen.getByText('R$ 100.00');
        expect(balanceDiv.className).toContain('text-red-700');
    });

    it('displays history with correct colors', () => {
        vi.mocked(useReseller).mockReturnValue({ data: mockReseller, isLoading: false } as any);
        vi.mocked(useTransactions).mockReturnValue({
            data: [
                { id: 1, resellerId: 1, type: 'order', totalPrice: 150, itemName: 'Produto A', createdAt: new Date() },
                { id: 2, resellerId: 1, type: 'payment', totalPrice: 50, createdAt: new Date() }
            ],
            isLoading: false
        } as any);

        render(<MemoryRouter><ResellerDetailPage /></MemoryRouter>);

        expect(screen.getByText('Produto A')).toBeInTheDocument();

        const orderRowVal = screen.getByText('R$ 150.00');
        expect(orderRowVal.className).toContain('text-red-600');

        const paymentRowVal = screen.getByText('R$ 50.00');
        expect(paymentRowVal.className).toContain('text-green-600');
    });

    it('displays green balance when balance is negative or zero (credit/paid)', () => {
        vi.mocked(useReseller).mockReturnValue({ data: mockReseller, isLoading: false } as any);
        vi.mocked(useTransactions).mockReturnValue({
            data: [
                { id: 1, resellerId: 1, type: 'order', totalPrice: 50, createdAt: new Date() },
                { id: 2, resellerId: 1, type: 'payment', totalPrice: 100, createdAt: new Date() }
            ],
            isLoading: false
        } as any);

        render(<MemoryRouter><ResellerDetailPage /></MemoryRouter>);

        expect(screen.getByText('R$ -50.00')).toBeInTheDocument();
        const balanceDiv = screen.getByText('R$ -50.00');
        expect(balanceDiv.className).toContain('text-green-700');
    });

    it('calls generateResellerExtract when PDF button is clicked', () => {
        vi.mocked(useReseller).mockReturnValue({ data: mockReseller, isLoading: false } as any);
        vi.mocked(useTransactions).mockReturnValue({
            data: [],
            isLoading: false
        } as any);

        render(<MemoryRouter><ResellerDetailPage /></MemoryRouter>);

        const btn = screen.getByText('Gerar PDF');
        fireEvent.click(btn);

        expect(generateResellerExtract).toHaveBeenCalledWith(mockReseller, [], 0);
    });
});
