# Especificação Técnica - Responsividade do Dashboard

## Resumo Executivo

A implementação da responsividade no sistema "Easy" focará em transformar a experiência desktop em uma interface otimizada para dispositivos móveis, sem perda de funcionalidade. A abordagem utiliza um layout adaptativo que substitui a barra lateral fixa por um componente de menu lateral (Sheet) e transforma tabelas complexas em listas de cartões (Cards) em telas menores. Para formulários, utilizaremos o padrão de "Drawers" (gavetas) que deslizam de baixo para cima, proporcionando uma experiência nativa em smartphones.

A solução será baseada em **Tailwind CSS v4** para o controle de breakpoints (`lg: 1024px`) e na biblioteca **vaul** para a implementação dos Drawers, garantindo interações suaves e conformidade com os requisitos de design "Premium".

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **`MainLayout` (Modificado)**: Atuará como o shell da aplicação, gerenciando a exibição da `Sidebar` em desktop e do `MobileNav` (Sheet) em mobile.
- **`Sidebar` (Modificado)**: Reutilizado tanto no layout fixo quanto dentro do componente Sheet, mantendo a consistência de ícones e links.
- **`DashboardCards` (Modificado)**: Ajuste do grid para transição de 3/4 colunas (desktop) para 1 coluna (mobile).
- **`ResellerTable` & `TransactionTable` (Modificados)**: Implementação de lógica condicional para renderizar `<table>` em desktop e uma lista de `Card` customizados em mobile.
- **`ResponsiveDialog` (Novo)**: Componente wrapper que encapsula o comportamento de `Dialog` (desktop) e `Drawer` (mobile/vaul), unificando a API de modais do sistema.

## Design de Implementação

### Interfaces Principais

#### Wrapper de Diálogo Responsivo
```tsx
interface ResponsiveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}
```

### Modelos de Dados

Não há alterações nos modelos de dados de backend/IndexedDB. O foco é puramente na camada de apresentação (View).

## Abordagem de Testes

### Testes Unidade
- **Componentes de Layout**: Verificar se o breakpoint `lg` altera corretamente a visibilidade entre `Sidebar` e o botão do menu hamburger.
- **Adaptative Data Views**: Testar se a lógica de alternância entre Tabela e Card-List funciona conforme a largura da janela disparada por mocks de `window.innerWidth`.

### Testes de Integração
- **Fluxo de Lançamento**: Verificar se o formulário de transação carrega corretamente tanto dentro de um `Dialog` quanto de um `Drawer`.

### Testes de E2E
- **Simulação Mobile via Playwright**: Executar fluxos de "Novo Revendedor" e "Lançamento de Demanda" em viewports de iPhone 14 e Android Pixel 7 para garantir que os Drawers e Cards estão operacionais.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Infraestrutura**: Instalação do `vaul` e criação do componente `ResponsiveDialog`.
2. **Navegação Shell**: Atualização do `MainLayout` para incluir o menu mobile (Sheet).
3. **Dashboard Context**: Refatoração do `DashboardCards` para grid adaptativo.
4. **Data Views**: Implementação da transformação de tabelas em cards nas páginas de Revendedores e Transações.
5. **Polimento**: Ajustes de padding, touch targets e transições.

### Dependências Técnicas

- **Bibliotecas**: `vaul` (para Drawers).
- **Configuração**: Tailwind CSS v4 já integrado (verificar breakpoints padrões).

## Considerações Técnicas

### Decisões Principais

- **Uso de Vaul**: Escolhido por ser o padrão de mercado para drawers acessíveis e performáticos, conforme sugerido no PRD.
- **Estratégia de Tabela**: Optamos por implementações específicas para cada tabela em vez de um componente genérico para permitir maior controle sobre a hierarquia de informações nos cards mobile (ex: destacar saldo devedor em `ResellerCard`).
- **Breakpoints**: Mantido o padrão `lg` (1024px) do Tailwind para evitar customizações desnecessárias e facilitar a manutenção.

### Riscos Conhecidos

- **Complexidade de Tabelas**: Algumas tabelas podem ter muitas colunas. A mitigação é selecionar apenas os campos essenciais para o "Header" do card mobile.
- **Performance de Renderização**: A renderização condicional de componentes complexos (Table vs Cards) deve ser otimizada para evitar flashes de conteúdo.

### Conformidade com Padrões
- Uso de componentes **shadcn/ui**.
- Estética **Premium** (vibrant colors, glassmorphism).
- Sem uso de placeholders (usar dados reais ou mocks realistas em testes).

### Arquivos relevantes e dependentes
- `src/components/layout/MainLayout.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/dashboard/DashboardCards.tsx`
- `src/components/resellers/ResellerTable.tsx`
- `src/pages/ResellersPage.tsx`
- `src/pages/TransactionsPage.tsx`
- `src/components/ui/dialog.tsx`
