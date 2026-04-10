import { describe, it, expect, vi } from 'vitest';
import { generateResellerExtract } from './pdfService';

const mockSave = vi.fn();
const mockText = vi.fn();
const mockSetFontSize = vi.fn();
const mockSetFont = vi.fn();
const mockSetTextColor = vi.fn();

vi.mock('jspdf', () => {
    return {
        default: class {
            internal = {
                pageSize: {
                    getWidth: vi.fn().mockReturnValue(210)
                }
            };
            save = mockSave;
            text = mockText;
            setFontSize = mockSetFontSize;
            setFont = mockSetFont;
            setTextColor = mockSetTextColor;
        }
    };
});

vi.mock('jspdf-autotable', () => ({
    default: vi.fn(),
}));

import autoTable from 'jspdf-autotable';
import { type Reseller, type Transaction } from '../db/database';

describe('pdfService', () => {
    it('generates PDF without errors', () => {
        const mockReseller: Reseller = {
            id: 1,
            name: 'John Doe',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const mockTransactions: Transaction[] = [
            {
                id: 1,
                resellerId: 1,
                type: 'order',
                totalPrice: 100,
                createdAt: new Date(),
            }
        ];

        generateResellerExtract(mockReseller, mockTransactions, 100);

        expect(mockSave).toHaveBeenCalledWith('extrato_john_doe.pdf');
        expect(autoTable).toHaveBeenCalled();
        expect(mockText).toHaveBeenCalledWith('Nome: John Doe', 14, 40);
        expect(mockSetTextColor).toHaveBeenCalledWith(220, 38, 38);
    });
});
