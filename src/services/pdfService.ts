import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { type Reseller, type Transaction } from '../db/database';

export function generateResellerExtract(reseller: Reseller, transactions: Transaction[], balance: number) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Configurações fonte
    doc.setFont('helvetica');

    // Título
    doc.setFontSize(22);
    doc.text('Extrato do Revendedor', pageWidth / 2, 20, { align: 'center' });

    // Informações do Revendedor
    doc.setFontSize(12);
    doc.text(`Nome: ${reseller.name}`, 14, 40);
    doc.text(`Telefone: ${reseller.phone || '-'}`, 14, 48);
    doc.text(`Email: ${reseller.email || '-'}`, 14, 56);

    // Saldo Devedor
    doc.setFontSize(14);
    const balanceText = `Saldo Devedor Atual: R$ ${balance.toFixed(2)}`;
    const balanceColor = balance > 0 ? [220, 38, 38] : [22, 163, 74];
    doc.setTextColor(balanceColor[0], balanceColor[1], balanceColor[2]);
    doc.text(balanceText, 14, 70);

    // Tabela de Transações
    const tableData = transactions.map(t => [
        t.createdAt.toLocaleDateString(),
        t.type === 'order' ? 'Pedido' : t.type === 'payment' ? 'Pagamento' : 'Sinal',
        t.itemName || '-',
        t.quantity ? t.quantity.toString() : '-',
        `R$ ${t.totalPrice.toFixed(2)}`,
        t.observation || '-'
    ]);

    autoTable(doc, {
        startY: 80,
        head: [['Data', 'Tipo', 'Item', 'Qtd', 'Valor', 'Observação']],
        body: tableData,
        didParseCell: function (data) {
            if (data.section === 'body' && data.column.index === 4) {
                const type = transactions[data.row.index].type;
                if (type === 'order') {
                    data.cell.styles.textColor = [220, 38, 38]; // text-red-600
                } else {
                    data.cell.styles.textColor = [22, 163, 74]; // text-green-600
                }
            }
        }
    });

    // Salvar o arquivo
    const safeName = reseller.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`extrato_${safeName}.pdf`);
}
