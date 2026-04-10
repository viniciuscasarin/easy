# Tarefa 5.0: Lançamento de Demanda (Pedido / Pagamento / Sinal)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar o formulário de lançamento de movimentações com seleção de revendedor, tipo de movimentação e campos dinâmicos conforme o tipo escolhido.

<requirements>
- Select para escolher o revendedor
- Select para tipo de movimentação: "Pedido", "Pagamento", "Sinal"
- Se tipo = Pedido:
  - Select de item do catálogo
  - Campo quantidade (numérico)
  - Campo valor unitário (puxa preço base do item automaticamente, mas permite edição)
  - Campo valor total (calculado: quantidade × valor unitário)
  - Campo "Observação" (texto livre, ex: "nome na placa")
- Se tipo = Pagamento ou Sinal:
  - Apenas campo de valor para abatimento
- Feedback de sucesso após lançamento (toast ou alert)
</requirements>

## Subtarefas

- [ ] 5.1 Criar `src/components/transactions/TransactionForm.tsx` — formulário dinâmico
- [ ] 5.2 Implementar lógica de campos dinâmicos baseado no tipo selecionado
- [ ] 5.3 Implementar preenchimento automático do preço ao selecionar item
- [ ] 5.4 Implementar cálculo automático do valor total (quantidade × unitário)
- [ ] 5.5 Implementar `src/pages/TransactionsPage.tsx` — page com formulário
- [ ] 5.6 Integrar com hooks `useCreateTransaction`, `useItems`, `useResellers`
- [ ] 5.7 Adicionar validação de formulário (campos obrigatórios, valores > 0)
- [ ] 5.8 Adicionar feedback de sucesso (toast/sonner)

## Detalhes de Implementação

Consultar seção **F3 — Lançamento de Demanda** em [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/prd.md) e **Interfaces Principais** em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

O campo `totalPrice` na `Transaction` armazena:
- Para pedidos: `quantity * unitPrice`
- Para pagamentos/sinais: o valor de abatimento informado

## Critérios de Sucesso

- Formulário exibe campos corretos conforme tipo selecionado
- Preço base do item é preenchido automaticamente mas é editável
- Valor total é calculado automaticamente
- Dados são persistidos corretamente no IndexedDB
- Feedback visual de sucesso após lançamento

## Testes da Tarefa

- [ ] Testes de unidade: renderização condicional dos campos por tipo
- [ ] Testes de unidade: cálculo automático de valor total
- [ ] Testes de unidade: preenchimento automático do preço ao selecionar item
- [ ] Testes de integração: fluxo completo de lançamento de pedido
- [ ] Testes de integração: fluxo completo de lançamento de pagamento

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/TransactionsPage.tsx`
- `src/components/transactions/TransactionForm.tsx`
- `src/hooks/useTransactions.ts`
- `src/hooks/useItems.ts`
- `src/hooks/useResellers.ts`
