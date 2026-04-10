# Tarefa 6.0: Refatoração de Cores nas Tabelas

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Aplicar a mesma lógica de cores semânticas às tabelas de transações e itens.

<requirements>
- Utilizar `text-debt` para valores negativos ou ordens.
- Utilizar `text-payment` para pagamentos recebidos.
</requirements>

## Subtarefas

- [ ] 6.1 Refatorar `TransactionTable.tsx`.
- [ ] 6.2 Verificar `ItemTable.tsx` se houver indicadores de preço/custo coloridos.

## Detalhes de Implementação

Referencie os arquivos relevantes listados na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-dark-light-mode/techspec.md).

## Critérios de Sucesso

- Consistência visual entre as tabelas e o restante da aplicação.

## Testes da Tarefa

- [ ] Teste visual das tabelas no modo claro e escuro.

## Arquivos relevantes
- [src/components/transactions/TransactionTable.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/transactions/TransactionTable.tsx)
- [src/components/items/ItemTable.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/items/ItemTable.tsx)
