# Tarefa 2.0: Desenvolvimento do Hook useDebtAging

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar a lógica de processamento de dados para calcular o saldo devedor por revendedor e o tempo desde a última movimentação.

<requirements>
- Criar o hook `useDebtAging` em `src/hooks/useDashboard.ts`.
- Realizar o cálculo performático (iteração única sobre transações).
- Categorizar em Recent, Attention e Critical.
- Incluir `signal` como reset de contador de movimentação.
</requirements>

## Subtarefas

- [ ] 2.1 Definir interfaces `AgingData`, `CriticalReseller` e `DebtAgingResult`.
- [ ] 2.2 Implementar o hook `useDebtAging` utilizando `useQuery` do TanStack Query.
- [ ] 2.3 Validar a lógica de aging com `date-fns`.

## Detalhes de Implementação

Referência: Seção "Design de Implementação -> Lógica de Cálculo" na [techspec.md](techspec.md).

## Critérios de Sucesso

- O hook retorna os buckets de aging com valores consolidados corretos.
- O hook retorna os top 3 revendedores críticos ordenados por saldo.

## Testes da Tarefa

- [ ] Teste unitário para a função de agrupamento e categorização de aging.
- [ ] Teste de integração verificando se o hook responde corretamente a dados simulados do Dexie.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/hooks/useDashboard.ts`
- `src/db/database.ts`
