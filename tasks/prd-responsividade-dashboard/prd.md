# PRD - Responsividade do Dashboard e Gestão de Revendedores

## Visão Geral

Este documento descreve os requisitos para tornar o dashboard de gestão de revendedores ("Easy") totalmente responsivo. O objetivo é permitir que tanto o administrador quanto o revendedor consigam visualizar saldos, lançar demandas e gerenciar movimentações com excelência técnica e usabilidade em qualquer dispositivo (Desktop, iPhone, Android), garantindo portabilidade para operações de campo.

## Objetivos

- **Acessibilidade Universal**: Garantir que 100% das funcionalidades de gestão estejam operacionais em telas mobile.
- **Consistência Visual**: Manter a identidade visual do sistema Easy, adaptando apenas o layout para otimização de espaço.
- **Eficiência Operacional**: Reduzir o tempo de lançamento de demandas em dispositivos móveis através de componentes adaptados (Drawer, Hamburger Menu).

## Histórias de Usuário

- **Como Administrador**, eu quero visualizar o saldo devedor de um revendedor no meu celular durante uma visita técnica, para que eu possa tomar decisões de crédito na hora.
- **Como Administrador**, eu quero conseguir lançar uma nova demanda (pedido/pagamento) rapidamente via smartphone, para evitar o acúmulo de papel ou a necessidade de um notebook.
- **Como Revendedor**, eu quero consultar meu extrato de movimentações de forma clara no celular, para conferir meus pagamentos e dívidas.

## Funcionalidades Principais

### 1. Navegação Adaptativa (Shell)
- **O que faz**: Ajusta o menu de navegação conforme o tamanho da tela.
- **Por que é importante**: Sidebar fixa consome muito espaço em telas pequenas.
- **Requisitos**:
    1. Em Desktop (> 1024px): Manter a Sidebar lateral fixa.
    2. Em Mobile (< 1024px): Substituir a Sidebar pelo componente **Sheet (Hamburger Menu)** do shadcn/ui.
    3. O Sheet deve conter todos os links de navegação presentes na Sidebar original.

### 2. Dashboard Cards Responsivos
- **O que faz**: Reorganiza os cartões de resumo (Total de Dívida, Volume de Ordens, etc).
- **Por que é importante**: Em mobile, cartões lado a lado ficam ilegíveis.
- **Requisitos**:
    1. Desktop: Grid de 3 ou 4 colunas.
    2. Mobile: Grid de 1 coluna (cards empilhados).
    3. Utilizar obrigatoriamente `gap-4` para separação visual.

### 3. Transformação de Tabelas em Cards (Data Views)
- **O que faz**: Altera a forma como os dados de "Movimentações" e "Revendedores" são exibidos em telas pequenas.
- **Por que é importante**: Tabelas horizontais são difíceis de navegar no mobile mesmo com scroll.
- **Requisitos**:
    1. Desktop: Manter tabela tradicional (`<table>`).
    2. Mobile: Transformar cada linha da tabela em um **Card de Registro** individual.
    3. O Card de Registro deve mostrar os campos principais (Nome, Valor, Data) de forma hierárquica.

### 4. Modais e Formulários Dinâmicos
- **O que faz**: Adapta a abertura de formulários de lançamento e edição.
- **Requisitos**:
    1. Desktop: Utilizar `Dialog` (Modal centralizado).
    2. Mobile: Utilizar **Drawer** (componente vaul do shadcn/ui) que abre de baixo para cima.

## Experiência do Usuário

- **UI/UX**: Foco em áreas de toque adequadas e legibilidade.
- **Acessibilidade**: Garantir que o menu Hamburger seja acessível via teclado e leitores de tela.
- **Interações**: Transições suaves ao abrir o Sheet e o Drawer.

## Restrições Técnicas de Alto Nível

- **Framework UI**: Utilização estrita de componentes do **shadcn/ui**.
- **Aesthetics**: Manter o padrão visual "Premium" definido para o projeto Easy (vibrant colors, glassmorphism onde aplicável).
- **Performance**: O layout responsivo não deve impactar o tempo de carregamento inicial.

## Fora de Escopo

- Otimizações específicas para modo paisagem (landscape) em smartphones.
- Gestos complexos como swipe-to-delete (foco inicial apenas em layout adaptativo).
- Mudanças profundas na lógica de negócio ou filtros de busca.
