# Especificação Técnica — Modo Escuro / Claro (Dark/Light Mode)

## Resumo Executivo

A implementação do modo escuro/claro utilizará a biblioteca `next-themes` para gerenciamento de estado e persistência da preferência do usuário no `localStorage`. A aplicação será envolvida por um `ThemeProvider` no nível raiz (`App.tsx`), e a alternância de cores será baseada no sistema de CSS variáveis do Tailwind v4.

A estratégia foca em centralizar cores semânticas críticas (dívidas e pagamentos) em variáveis CSS no `index.css`, permitindo que os componentes se adaptem automaticamente sem necessidade de classes utilitárias redundantes em cada arquivo. O componente de alternância (ThemeToggle) será integrado dinamicamente no `Sidebar` (desktop) e no `MainLayout` header (mobile).

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **`ThemeProvider` (de `next-themes`)**: Componente provedor que gerencia o estado do tema e injeta a classe `.dark` no elemento `html`.
- **`ThemeToggle` [NEW]**: Botão de alternância que utiliza ícones `Sun` e `Moon` do Lucide React.
- **`Sidebar` [MODIFY]**: Inclusão do `ThemeToggle` no container do logo, alinhado à direita.
- **`MainLayout` [MODIFY]**: Inclusão do `ThemeToggle` no header mobile, alinhado à direita.
- **`index.css` [MODIFY]**: Definição das variáveis semânticas para dívidas (`--debt`) e pagamentos (`--payment`) em ambos os temas.

## Design de Implementação

### Interfaces Principais

Não há novas interfaces de serviço complexas, apenas o uso do hook `useTheme` do `next-themes`.

```typescript
// Exemplo de uso no ThemeToggle
const { theme, setTheme } = useTheme();
const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
```

### Modelos de Dados

- **LocalStorage Key**: `theme` (padrão do `next-themes`).
- **Valores**: `'light' | 'dark' | 'system'`.

## Pontos de Integração

- **Shadcn UI**: Adaptação automática via variáveis CSS já configuradas no `index.css`.
- **Lucide React**: Uso de ícones para o feedback visual do botão.

## Abordagem de Testes

### Testes Unidade
- **`ThemeToggle`**: Verificar se alterna o tema ao clicar e se exibe o ícone correto.
- **Variáveis CSS**: Verificar se as cores de dívida/pagamento mudam conforme a classe `.dark`.

### Testes de Integração
- **Persistência**: Garantir que o tema sobrevive ao recarregamento da página (via `vitest` simulando localStorage).

### Testes de E2E
- Verificar visualmente (via smoke test) se todas as páginas principais mantêm legibilidade no modo escuro.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Configuração de Infraestrutura**: Envolver a aplicação no `ThemeProvider` (`App.tsx`).
2. **Estilização Base**: Definir as novas variáveis semânticas no `index.css`.
3. **Componente de UI**: Criar o `ThemeToggle.tsx`.
4. **Integração de Layout**: Adicionar o toggle no `Sidebar` e `MainLayout`.
5. **Refatoração de Cores**: Substituir classes de cores fixas (ex: `text-red-500`) pelas novas cores semânticas nos componentes afetados.

## Considerações Técnicas

### Decisões Principais

- **Cores Semânticas**: Introduzir `--debt` e `--payment` para evitar a repetição de lógica condicional de cores nos componentes.
- **OKLCH Sugerido**:
  - **Dívida (Red)**:
    - Light: `oklch(0.6 0.25 25)`
    - Dark: `oklch(0.75 0.2 25)`
  - **Pagamento (Green)**:
    - Light: `oklch(0.6 0.2 145)`
    - Dark: `oklch(0.8 0.15 145)`

### Riscos Conhecidos

- **FOUC (Flash of Unstyled Content)**: `next-themes` mitiga isso via injeção de script no cabeçalho, mas em SPAs client-side puros pode haver um leve delay no primeiro render se não configurado corretamente.
- **Legibilidade de PDFs**: A geração de PDF via `jspdf` deve ser verificada para garantir que as cores continuem adequadas para impressão (geralmente mantendo o padrão do modo claro).

### Conformidade com Padrões
- Uso de Lucide Icons (@.claude/rules).
- Uso de componentes Shadcn UI e Tailwind v4 (@.claude/rules).

### Arquivos relevantes e dependentes
- [src/App.tsx](file:///home/vinicius-casarin/repos/study/easy/src/App.tsx)
- [src/index.css](file:///home/vinicius-casarin/repos/study/easy/src/index.css)
- [src/components/layout/MainLayout.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/layout/MainLayout.tsx)
- [src/components/layout/Sidebar.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/layout/Sidebar.tsx)
- [src/components/dashboard/DashboardCards.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/dashboard/DashboardCards.tsx)
- [src/pages/ResellerDetailPage.tsx](file:///home/vinicius-casarin/repos/study/easy/src/pages/ResellerDetailPage.tsx)
