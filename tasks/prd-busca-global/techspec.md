# Especificação Técnica - Busca Global (Command Center)

## Resumo Executivo

A implementação da Busca Global (Command Center) visa centralizar a navegação e ações rápidas do sistema "Easy" em uma interface única e rápida, acessível via atalho `Ctrl+K`. A solução utilizará o componente `CommandDialog` do Shadcn UI (baseado em `cmdk`) integrado ao banco de dados local Dexie.js para garantir respostas em menos de 50ms.

A arquitetura será baseada em um componente desacoplado (`CommandCenter`) que utiliza um hook customizado (`useSearch`) para realizar filtragens dinâmicas nos modelos de `Resellers` e `Items`, calculando em tempo real informações críticas como o saldo devedor para exibição direta nos resultados.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **`CommandCenter.tsx`**: Componente principal que gerencia o estado aberto/fechado do diálogo, captura o input do usuário e renderiza as seções de resultados e ações rápidas.
- **`useSearch.ts`**: Hook responsável por realizar as queries no Dexie.js, lidar com o estado de carregamento e formatar os resultados de `Items` e `Resellers`.
- **`MainLayout.tsx`**: Modificado para incluir o gatilho da busca no novo Header (desktop) e no Header existente (mobile), garantindo acesso global.
- **`Header.tsx` (Novo)**: Componente de cabeçalho para desktop que abrigará o botão de busca e o seletor de tema.

**Fluxo de Dados**:
1. Usuário pressiona `Ctrl+K`.
2. O diálogo `CommandCenter` é exibido.
3. Ao digitar, o hook `useSearch` dispara queries paralelas para `db.resellers` e `db.items` usando `where('name').startsWith`.
4. Os resultados são enriquecidos com cálculos (ex: saldo) e retornados para renderização.
5. Ao selecionar um item, o `CommandCenter` utiliza o `useNavigate` para redirecionar o usuário.

## Design de Implementação

### Interfaces Principais

```typescript
export interface SearchResult {
    id: number;
    title: string;
    subtitle?: string;
    type: 'reseller' | 'item';
}

export interface SearchHookResult {
    results: SearchResult[];
    recent: SearchResult[];
    isLoading: boolean;
}
```

### Modelos de Dados

Não haverá alterações no esquema do banco de dados Dexie.js. A busca utilizará os campos `name` indexados nas tabelas `items` e `resellers`.

## Abordagem de Testes

### Testes Unidade

- **`useSearch`**: Validar se a busca retorna os itens corretos e se o cálculo do saldo para revendedores bate com o histórico de transações.
- **`CommandCenter`**: Validar o comportamento do estado vazio e a priorização de resultados.

### Testes de Integração

- Verificar se a navegação disparada pelos resultados de busca leva para as rotas corretas (`/resellers/:id` e `/items`).

### Testes de E2E

- **Playwright**: Simular o pressionamento de `Ctrl+K`, digitação de um termo e seleção do primeiro resultado via teclado (setas + Enter).

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **Instalação de Dependências**: Adicionar `cmdk` e o componente `Command` do Shadcn UI.
2. **Hook de Busca**: Implementar `useSearch` e realizar testes unitários com o banco local.
3. **Componente de UI**: Criar `CommandCenter` e estilizar de acordo com os padrões visuais (Lucide React).
4. **Refatoração de Layout**: Criar o Header desktop em `MainLayout` e integrar o gatilho.
5. **Ações Rápidas**: Mapear as navegações para criação de itens e lançamentos.

## Considerações Técnicas

### Decisões Principais

- **Cálculo de Saldo On-the-fly**: Decidido por calcular o saldo em tempo real para os 5 resultados exibidos para evitar inconsistências de dados e simplificar a implementação inicial. Caso o volume de transações cresça a ponto de impactar os 50ms, uma tabela de resumo será considerada.
- **Navegação Direta**: As ações rápidas irão navegar para as páginas de cadastro em vez de abrir modais, visando manter a consistência de rotas e facilitar o compartilhamento de links.

### Riscos Conhecidos

- **Performance do IndexedDB**: Queries de texto (startsWith) são rápidas, mas a complexidade do cálculo de saldo pode aumentar linearmente com o número de transações. Mitigação: Uso de queries eficientes e limite estrito de resultados (máximo 5).

### Conformidade com Padrões

- Baseado nas rules do projeto, utilizaremos `@/components/ui/command` instalado via CLI e manteremos a consistência de cores com o sistema de temas (dark/light).

### Arquivos relevantes e dependentes

- `src/components/layout/MainLayout.tsx`
- `src/db/database.ts`
- `src/hooks/useResellers.ts` (Referência para balance logic)
- `src/components/ui/command.tsx`
- `src/components/search/CommandCenter.tsx`
