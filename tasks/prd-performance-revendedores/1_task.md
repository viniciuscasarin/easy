# Tarefa 1.0: Implementação do Hook `usePerformanceAnalysis`

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Desenvolver um hook customizado que abstraia toda a lógica de agregação e processamento de dados necessária para a seção de Análise de Performance. O hook deve retornar dados prontos para o Recharts, minimizando o processamento no componente UI.

<requirements>
- Integrar com o Dexie.js (`db.transactions` e `db.resellers`).
- Suportar filtro de período de 90 (padrão), 180 e 360 dias.
- Calcular faturamento acumulado e percentual para o Pareto.
- Calcular saldo devedor total por revendedor para o Ranking de risco.
- Identificar o número de revendedores que compõem 80% do faturamento.
- Utilizar `useMemo` para otimizar os cálculos.
</requirements>

## Subtarefas

- [ ] 1.1 Definir interfaces `PerformanceData` e `AnalysisPeriod` no `useDashboard.ts`.
- [ ] 1.2 Implementar função auxiliar de cálculo de soma por revendedor com filtro de data.
- [ ] 1.3 Implementar lógica de faturamento acumulado (Pareto) com ordenação decrescente.
- [ ] 1.4 Implementar lógica de ranking de risco (saldo devedor).
- [ ] 1.5 Exportar o hook `usePerformanceAnalysis` usando `useQuery` do TanStack Query.

## Detalhes de Implementação

Referencie a seção "Design de Implementação > Interfaces Principais" na [techspec.md](techspec.md). Use `date-fns` para o cálculo do intervalo de dias.

## Critérios de Sucesso

- O hook retorna dados agrupados por revendedor.
- O percentual acumulado no Pareto chega a exatamente 100% no último item.
- O ranking de risco reflete corretamente `Soma(Pedidos) - Soma(Pagamentos/Sinais)`.
- Mudanças no parâmetro `days` disparam uma nova consulta e recálculo.

## Testes da Tarefa

- [ ] Teste unitário para a lógica de cálculo do Pareto em `useDashboard.test.ts`.
- [ ] Teste de integração verificando se o hook retorna dados do Dexie simulado (mock).

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- [src/hooks/useDashboard.ts](file:///home/vinicius-casarin/repos/study/easy/src/hooks/useDashboard.ts)
- [src/db/database.ts](file:///home/vinicius-casarin/repos/study/easy/src/db/database.ts)
