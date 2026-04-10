# PRD - Saúde da Dívida (Aging)

## Visão Geral

Este documento detalha os requisitos para a nova métrica "Saúde da Dívida (Aging)" no Dashboard do sistema Easy. O objetivo é fornecer uma visão clara e imediata da qualidade do saldo devedor, categorizando o montante total a receber com base no tempo decorrido desde a última movimentação de cada revendedor. Isso permite identificar rapidamente inadimplências potenciais e priorizar esforços de cobrança.

## Objetivos

- **Visibilidade de Risco**: Quantificar o saldo devedor por "idade", diferenciando dívidas operacionais recentes de dívidas críticas estagnadas.
- **Priorização de Cobrança**: Oferecer uma lista imediata dos 3 casos mais críticos para ação rápida.
- **Sucesso**: Redução percentual da categoria "Crítico" ao longo do tempo e maior agilidade na identificação de revendedores inativos com saldo pendente.

## Histórias de Usuário

- **Como Gerente de Vendas**, eu quero ver a distribuição da saúde da minha dívida em um gráfico para entender se a maior parte do meu saldo a receber é recente ou está "envelhecendo".
- **Como Operador de Cobrança**, eu quero identificar os revendedores que não fazem pedidos nem pagamentos há mais de 30 dias para iniciar um contato proativo.
- **Como Usuário Financeiro**, eu quero ver o valor absoluto em Reais de cada categoria de aging para provisionar possíveis perdas ou fluxo de caixa.

## Funcionalidades Principais

### 1. Categorização de Aging (Envelhecimento)
- O sistema deve calcular a diferença em dias entre a data atual e a data da **última movimentação** (Pedido ou Pagamento) para cada revendedor com `Saldo > 0`.
- **Categorias**:
    1. **Recente (Verde)**: Última movimentação < 7 dias.
    2. **Em Atenção (Amarelo)**: Última movimentação entre 8 e 30 dias.
    3. **Crítico (Vermelho)**: Última movimentação > 30 dias.
- **Regra de Negócio**: Se um revendedor possui saldo mas nenhum registro de Pedido ou Pagamento, deve ser categorizado como "Crítico" (assumindo saldo importado sem movimentação recente).

### 2. Gráfico de Rosca (Doughnut Chart)
- Exibição visual da distribuição percentual do valor total devido entre as três categorias.
- Implementação utilizando a biblioteca **Recharts**.
- Cores semânticas consistentes: Verde (Success), Amarelo (Warning), Vermelho (Destructive/Error).

### 3. Legenda com Valores Absolutos
- Exibir ao lado do gráfico o valor total consolidado em Reais (R$) para cada categoria de aging.

### 4. Lista de Alerta de Cobrança
- Tabela ou lista simplificada abaixo do gráfico com os top 3 revendedores na categoria **Crítico**.
- Ordenação: Maior saldo devedor (descendente).
- **Interação**: Cada item deve ser clicável, navegando para o perfil detalhado do revendedor.

## Experiência do Usuário

- **UI**: O componente deve ser encapsulado em um `Card` do shadcn/ui.
- **Responsividade**: Em telas menores, a legenda e a lista de alerta devem se ajustar verticalmente.
- **Formatação**: Todos os valores monetários devem seguir o padrão BRL (`R$ #.###,##`).
- **Feedback Visual**: Cores claras e acessíveis para as categorias de aging.

## Restrições Técnicas de Alto Nível

- **Processamento**: Toda a lógica de cálculo deve ser executada no frontend, consumindo os dados do **Dexie.js**.
- **Bibliotecas**: `date-fns` para manipulação de datas e `Recharts` para visualização.
- **Performance**: O cálculo deve ser otimizado para evitar travamentos na UI durante a iteração sobre a lista de revendedores e transações.

## Fora de Escopo

- Relatórios históricos de evolução do aging (ex: como estava a dívida há 3 meses).
- Filtros por região ou grupo de revendedores nesta fase inicial.
- Envio automático de notificações ou e-mails de cobrança através deste componente.
