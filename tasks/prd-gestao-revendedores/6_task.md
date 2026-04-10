# Tarefa 6.0: Ficha do Revendedor (Histórico, Saldo e PDF)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Completar a página de detalhes do revendedor com histórico completo de movimentações, cálculo de saldo devedor e geração de relatório PDF do extrato.

<requirements>
- Exibir dados do revendedor (nome, telefone, email)
- Tabela de histórico com todas as movimentações, ordenadas por data (mais recente primeiro)
- Colunas: Data, Tipo, Item, Quantidade, Valor, Observação
- Cores: pedidos (dívida) em vermelho, pagamentos/sinais em verde
- Saldo devedor = Σ Pedidos - Σ (Pagamentos + Sinais)
- Card destacado com o saldo devedor atual
- Botão "Gerar PDF" que baixa um relatório do extrato
- PDF contém: dados do revendedor, tabela de movimentações, saldo devedor
</requirements>

## Subtarefas

- [ ] 6.1 Completar `src/pages/ResellerDetailPage.tsx` — dados do revendedor + histórico
- [ ] 6.2 Criar tabela de movimentações com cores condicionais (vermelho/verde)
- [ ] 6.3 Implementar cálculo e exibição do saldo devedor
- [ ] 6.4 Criar `src/services/pdfService.ts` — geração de PDF com jsPDF + jspdf-autotable
- [ ] 6.5 Integrar botão "Gerar PDF" com o serviço
- [ ] 6.6 Integrar com hooks `useReseller(id)` e `useTransactions(resellerId)`

## Detalhes de Implementação

Consultar seção **F4 — Ficha do Revendedor** em [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/prd.md) e **Decisões Principais** (jsPDF) em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

**Cálculo do saldo:**
```typescript
const totalOrders = transactions
  .filter(t => t.type === 'order')
  .reduce((sum, t) => sum + t.totalPrice, 0);

const totalPayments = transactions
  .filter(t => t.type !== 'order')
  .reduce((sum, t) => sum + t.totalPrice, 0);

const balance = totalOrders - totalPayments;
```

## Critérios de Sucesso

- Histórico exibe todas as movimentações do revendedor
- Cores corretamente aplicadas (vermelho para dívida, verde para pagamento)
- Saldo devedor calculado e exibido corretamente
- PDF gerado contém todas as informações e é baixado corretamente
- Formatação monetária em BRL (R$)

## Testes da Tarefa

- [ ] Testes de unidade: cálculo do saldo devedor (cenários variados)
- [ ] Testes de unidade: renderização do histórico com cores corretas
- [ ] Testes de unidade: `pdfService` gera PDF sem erros
- [ ] Testes de integração: page carrega dados corretos do revendedor e suas movimentações

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/ResellerDetailPage.tsx`
- `src/services/pdfService.ts`
- `src/hooks/useResellers.ts`
- `src/hooks/useTransactions.ts`
