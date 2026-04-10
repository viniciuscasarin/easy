# Especificação Técnica - Seção de Análise de Performance

## Resumo Executivo

A implementação da Seção de Análise de Performance consistirá em um novo conjunto de ganchos (hooks) de dados e componentes de visualização integrados ao Dashboard existente. Utilizaremos o Recharts para renderizar um Gráfico de Pareto (faturamento acumulado) e um Gráfico de Ranking de Inadimplência, aproveitando o banco de dados local Dexie.js para cálculos em tempo real. A solução foca em performance via `useMemo` e flexibilidade temporal através de filtros de 90, 180 e 360 dias.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **`usePerformanceAnalysis(days)` (Novo Hook)**: Responsável por buscar, filtrar e processar os dados de transações e revendedores.
- **`PerformanceAnalysisSection` (Novo Componente)**: Container principal que gerencia o estado do filtro de período e o layout dos gráficos.
- **`ParetoChart` (Novo sub-componente)**: Implementação do gráfico composto (Bar + Line) para análise 80/20.
- **`DefaultRankingChart` (Novo sub-componente)**: Gráfico de barras horizontais para o ranking de risco.
- **`DashboardPage` (Modificação)**: Integração da nova seção abaixo dos cards existentes.

### Fluxo de Dados

1. O componente `PerformanceAnalysisSection` define o estado `days` (padrão 90).
2. O hook `usePerformanceAnalysis(days)` consulta as tabelas `resellers` e `transactions` do Dexie.js.
3. Os dados são filtrados pela data de criação (`createdAt`) e agregados por `resellerId`.
4. Cálculos de faturamento (Pareto) e saldo (Inadimplência) são realizados e retornados em um formato compatível com Recharts.

## Design de Implementação

### Interfaces Principais

```typescript
export interface PerformanceData {
    pareto: {
        resellerName: string;
        revenue: number;
        cumulativePercentage: number;
    }[];
    ranking: {
        resellerName: string;
        balance: number;
    }[];
    insights: {
        countTo80: number;
        topDebtor: { name: string; value: number } | null;
    };
}

export type AnalysisPeriod = 90 | 180 | 360;
```

### Modelos de Dados

- **Entidades Utilizadas**: `Transaction`, `Reseller`.
- **Cálculo de Faturamento**: Soma de `totalPrice` onde `type === 'order'`.
- **Cálculo de Saldo**: `Σ(order.totalPrice) - Σ(payment.totalPrice + signal.totalPrice)`.

## Abordagem de Testes

### Testes Unidade
- **`usePerformanceAnalysis` logic**: Validar se a ordenação do Pareto está correta e se o cálculo de percentual acumulado atinge 100% no último item.
- **Filtro de Período**: Garantir que transações fora do intervalo de dias não sejam contabilizadas.

### Testes de Integração
- Renderização dos gráficos em conjunto com o `PerformanceAnalysisSection`.
- Interatividade do Select de dias.

### Testes de E2E (Playwright)
- Verificar se a seção aparece no Dashboard carregada com dados.
- Trocar o filtro de 90 para 180 dias e verificar se os valores nos cards de insight são atualizados.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Desenvolvimento do Hook `usePerformanceAnalysis`**: Base de dados essencial para os gráficos.
2. **Criação do Componente `ParetoChart`**: Implementação da lógica visual mais complexa (eixos duplos).
3. **Criação do Componente `DefaultRankingChart`**: Implementação mais simples de barras.
4. **Montagem da `PerformanceAnalysisSection`**: Integração do filtro e layout.
5. **Integração na `DashboardPage`**.

## Considerações Técnicas

### Decisões Principais

- **ComposedChart (Recharts)**: Escolhido por permitir a sobreposição de `Bar` e `Line` com eixos Y independentes, essencial para o Pareto.
- **Processamento em Memória**: Dado que o volume esperado de revendedores é de centenas (não milhões), o processamento no cliente via `useMemo` garante resposta instantânea às mudanças de filtro sem latência de rede ou sobrecarga do IndexedDB.

### Riscos Conhecidos

- **Eixo X Legibilidade**: Com muitos revendedores, os nomes no eixo X podem ficar ilegíveis. Mitigação: Limitar a exibição visual a um número razoável ou usar labels rotacionadas.
- **Precisão de Ponto Flutuante**: Saldos podem apresentar imprecisões decimais. Mitigação: Arredondar valores monetários antes da exibição.

### Conformidade com Padrões
- Uso de `date-fns` para manipulação de datas conforme padrão do projeto.
- Uso de componentes `shadcn/ui` (`Card`, `Select`) para consistência de UI.
- Arquitetura baseada em hooks personalizados (`TanStack Query`).

### Arquivos relevantes e dependentes
- `src/db/database.ts` (Dependência de dados)
- `src/hooks/useDashboard.ts` (Local do novo hook)
- `src/pages/DashboardPage.tsx` (Ponto de inserção)
- `src/components/dashboard/` (Local dos novos componentes)
