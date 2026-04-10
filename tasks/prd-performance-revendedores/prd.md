# PRD - Seção de Análise de Performance de Revendedores

## Visão Geral

Esta funcionalidade adiciona uma seção de inteligência de negócio ao Dashboard do sistema Easy. O objetivo é fornecer aos administradores uma visão clara de quem são os revendedores que mais contribuem para o faturamento (Lei de Pareto) e quais representam o maior risco financeiro (Inadimplência), permitindo tomadas de decisão baseadas em dados.

## Objetivos

- **Identificação de Key Accounts**: Visualizar os 20% de revendedores que geram 80% do faturamento.
- **Gestão de Risco**: Identificar rapidamente os revendedores com maior saldo devedor acumulado.
- **Flexibilidade Temporal**: Permitir a análise de performance em diferentes janelas de tempo (90, 180 e 360 dias).
- **Sucesso**: Administrador consegue identificar os top devedores e top geradores de receita em menos de 10 segundos.

## Histórias de Usuário

- **Como Administrador**, eu quero ver um gráfico de Pareto para identificar quais revendedores concentram meu faturamento e focar meus esforços de relacionamento neles.
- **Como Administrador**, eu quero ver um ranking dos maiores devedores para priorizar cobranças e gerir o fluxo de caixa.
- **Como Administrador**, eu quero filtrar esses dados por períodos diferentes para entender a evolução ou sazonalidade das vendas.

## Funcionalidades Principais

### 1. Gráfico de Análise de Pareto (80/20)
- **Descrição**: Gráfico composto (barras + linha) mostrando o faturamento individual e o percentual acumulado.
- **Requisitos**:
    1. Calcular a soma de todos os pedidos por revendedor no período selecionado.
    2. Ordenar revendedores do maior para o menor faturamento.
    3. Exibir barras para o faturamento individual.
    4. Exibir uma linha para o percentual acumulado.
    5. Destacar visualmente (cor ou linha de corte) os revendedores que compõem os primeiros 80%.

### 2. Gráfico de Ranking de Inadimplência
- **Descrição**: Gráfico de barras horizontais com os 10 maiores saldos devedores.
- **Requisitos**:
    1. Calcular saldo = (Soma de Pedidos) - (Soma de Pagamentos/Sinais) por revendedor.
    2. Considerar todo o histórico de saldo, independentemente de datas de vencimento.
    3. Exibir o Top 10 revendedores com maior saldo positivo (dívida).

### 3. Filtro de Período Global da Seção
- **Descrição**: Select para alternar a janela de dados.
- **Opções**: 90 dias (Padrão), 180 dias, 360 dias.

### 4. Cards de Insight Dinâmicos
- **Descrição**: Resumos textuais automáticos baseados nos cálculos.
- **Requisitos**:
    1. Texto 1: "Atenção: [X] revendedores concentram 80% das suas vendas."
    2. Texto 2: "[Nome] é atualmente o maior devedor (R$ [Valor])."

## Experiência do Usuário (UI/UX)

- **Layout**: Uso do componente `Card` do shadcn/ui.
- **Cores**: 
    - Faturamento/Pareto: Tons de Azul.
    - Inadimplência/Risco: Vermelho/Coral.
- **Responsividade**: Os gráficos devem se ajustar para visualização em mobile (empilhamento de cards).
- **Interatividade**: Tooltips detalhando valores exatos ao passar o mouse.

## Restrições Técnicas de Alto Nível

- **Banco de Dados**: Consultas realizadas no Dexie.js.
- **Performance**: Uso obrigatório de `useMemo` para cálculos de agregação de dados.
- **Biblioteca de Gráficos**: Recharts (preferencial) ou Chart.js.
- **Escalabilidade**: O sistema deve lidar com centenas de revendedores sem travamentos na UI durante o cálculo.

## Fora de Escopo

- Exportação de relatórios em PDF ou CSV.
- Filtros por categoria de produto ou região de revendedor.
- Notificações automáticas de cobrança.
- Análise de inadimplência baseada em dias de atraso (aging real); será considerado apenas o saldo total.
