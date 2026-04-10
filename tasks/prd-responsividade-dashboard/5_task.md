# Tarefa 5.0: [VIEW] Transformação de Dados: Transações

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar a visualização adaptativa para a tabela de movimentações (transações), otimizando o extrato para consulta mobile.

<requirements>
- Criar o componente `TransactionCard` focado em legibilidade de extrato.
- Implementar troca dinâmica entre Tabela e Cards na `TransactionsPage`.
- Diferenciar visualmente Créditos de Débitos no card mobile (cores/ícones).
</requirements>

## Subtarefas

- [ ] 5.1 Criar componente `src/components/transactions/TransactionCard.tsx`.
- [ ] 5.2 Integrar lógica adaptativa na `TransactionsPage.tsx`.

## Detalhes de Implementação

Referencie a seção **"Data Views"** na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-responsividade-dashboard/techspec.md).

## Critérios de Sucesso

- Extrato de transações fácil de ler em smartphones.
- Indicadores visuais de saldo preservados.

## Testes da Tarefa

- [ ] Teste de unidade: Validar renderização do `TransactionCard`.
- [ ] Teste de integração: Validar fluxos de filtragem operando com a visualização de cards.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/TransactionsPage.tsx`
- `src/components/transactions/TransactionCard.tsx` [NEW]
