# Especificação Técnica - Saúde da Dívida (Aging)

## Resumo Executivo

Esta especificação detalha a implementação da métrica de "Saúde da Dívida (Aging)" para o Dashboard do sistema Easy. A solução consiste em um novo hook performático para processamento de dados do Dexie.js e um componente visual de alta fidelidade utilizando Recharts e shadcn/ui. O objetivo é categorizar o saldo devedor global em três faixas de tempo (Recente, Atenção e Crítico) e destacar os principais devedores estagnados.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **`useDebtAging` (Novo Hook)**: Responsável por processar a base de transações e revendedores, calculando o saldo por revendedor e identificando a data da última movimentação.
- **`DebtHealthAgingCard` (Novo Componente)**: Card que ocupa a largura total da página, contendo o gráfico de rosca (PieChart), legenda de valores e a lista de alerta de revendedores críticos.
- **`DashboardPage` (Modificação)**: Integração do novo componente abaixo da grid de cards existente.

## Design de Implementação

### Interfaces Principais

```typescript
export interface AgingData {
    category: 'recent' | 'attention' | 'critical';
    value: number; // Valor absoluto em R$
    percentage: number;
    color: string;
}

export interface CriticalReseller {
    id: number;
    name: string;
    balance: number;
    lastMovement: Date;
}

export interface DebtAgingResult {
    buckets: AgingData[];
    criticalResellers: CriticalReseller[];
    totalDebt: number;
}
```

### Lógica de Cálculo (Performance)

O hook `useDebtAging` deve realizar um único "pass-through" sobre as transações para maximizar a performance:
1. Buscar todos os revendedores e todas as transações (ou usar um `yield` se suportado pelo driver).
2. Criar um Map: `resellerMap<resellerId, { balance: number, lastDate: Date }>`.
3. Iterar sobre as transações uma vez:
   - Atualizar o saldo conforme o tipo (`order` [+] / `payment` or `signal` [-]).
   - Atualizar a `lastDate` se a transação for mais recente que a armazenada.
4. Categorizar cada revendedor com `balance > 0` baseando-se na diferença entre `now` e `lastDate`.

## Abordagem de Testes

### Testes Unidade
- **`calculateAging`**: Testar a lógica de categorização com diferentes deltas de tempo (6 dias, 15 dias, 45 dias).
- **Formatadores**: Garantir que o valor BRL seja renderizado corretamente.

### Testes de E2E
- **Dashboard Flow**: Verificar se o gráfico de aging aparece no Dashboard assim que o sistema é carregado com dados simulados.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Instalação**: `npm install recharts date-fns`.
2. **Hook**: Implementar `useDebtAging` em `src/hooks/useDashboard.ts`.
3. **UI Base**: Criar o container do componente `DebtHealthAgingCard` usando shadcn/ui `Card`.
4. **Visualização**: Implementar o `PieChart` com Recharts.
5. **Lista**: Integrar a `Table` do shadcn/ui para os top 3 revendedores.
6. **Integração**: Adicionar ao `DashboardPage.tsx`.

## Considerações Técnicas

### Decisões Principais
- **Local State Processing**: O cálculo é feito no cliente via Dexie.js para manter a característica offline-first e reativa do sistema.
- **Recharts**: Escolhido por ser o padrão de mercado para React e permitir customização fácil de cores semânticas.

### Conformidade com Padrões
- Uso de `date-fns` para manipulação de datas conforme sugerido.
- Segue o padrão de design system `shadcn/ui`.
- Mantém o padrão de `Intl.NumberFormat('pt-BR')` para moedas.

### Arquivos relevantes e dependentes
- `src/db/database.ts` (Modelos de dados)
- `src/hooks/useDashboard.ts` (Lógica de dados)
- `src/pages/DashboardPage.tsx` (Ponto de entrada)
- `src/components/dashboard/DebtHealthAgingCard.tsx` (Novo arquivo)
