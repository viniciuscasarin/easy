# Especificação Técnica: Automação de Deploy no GitHub Pages (Projeto Easy)

## Resumo Executivo

Esta especificação detalha a implementação de um pipeline de CI/CD utilizando GitHub Actions para automatizar o build e o deploy da aplicação "Easy" no GitHub Pages. A solução utiliza Node.js 22 e as ações oficiais do GitHub para realizar o deploy diretamente dos artefatos de build, eliminando a necessidade de gerenciar uma branch `gh-pages` manual. Para garantir o funcionamento correto do roteamento em uma subpasta, o projeto será configurado com um `base` path no Vite e um `basename` no React Router.

## Arquitetura do Sistema

### Visão Geral dos Componentes

- **workflow/deploy.yml [NOVO]**: Arquivo YAML que define o fluxo de automação (gatilhos, ambiente, passos de build e deploy).
- **vite.config.ts [MODIFICADO]**: Ajuste da propriedade `base` para `/Easy/` para garantir que os caminhos dos assets gerados sejam relativos à subpasta do GitHub Pages.
- **src/App.tsx [MODIFICADO]**: Configuração do `basename` no `BrowserRouter` para que o roteamento do lado do cliente reconheça a subpasta `/Easy/`.

### Fluxo de Dados

1.  **Push na Branch `main`**: Gatilho inicial.
2.  **Ambiente Virtual (Ubuntu)**: Instanciação do Node.js 22.
3.  **Build**: Instalação de dependências e execução do comando de build do Vite.
4.  **Upload de Artefatos**: Coleta da pasta `dist` e empacotamento para o GitHub Pages.
5.  **Deploy**: Ativação do deploy nas máquinas do GitHub Pages.

## Design de Implementação

### Interfaces Principais

O workflow do GitHub Actions será o ponto central de integração:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Modelos de Dados (Configurações)

**vite.config.ts**:
```typescript
export default defineConfig({
  base: '/Easy/',
  // ... rest of config
})
```

**src/App.tsx**:
```tsx
<BrowserRouter basename="/Easy/">
  {/* rotas */}
</BrowserRouter>
```

## Pontos de Integração

- **GitHub Actions**: Utilizado para computação do build e infraestrutura de deploy.
- **GitHub Pages**: Hospedagem final do conteúdo estático.
- **Node.js 22**: Runtime definida para execução do processo de build.

## Abordagem de Testes

### Testes Unidade
- Execução automática de `npm run test` (Vitest) antes do build no workflow (opcional, mas recomendado).

### Testes de Integração
- **Build de Produção**: O workflow falhará se o comando `npm run build` apresentar erros (ex: erros de tipagem do TS ou assets ausentes).

### Testes de E2E (Manual/Verificação)
1.  Verificar se o workflow no GitHub Actions termina com sucesso (check verde).
2.  Acessar `https://<usuario>.github.io/Easy/`.
3.  Navegar entre as abas (Dashboard, Itens, Revendedores) e recarregar a página para garantir que o roteamento está estável.

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1.  **Ajuste da Configuração do Projeto**: Modificar `vite.config.ts` e `App.tsx` para suporte ao caminho base.
2.  **Criação do Workflow**: Adicionar o arquivo `.github/workflows/deploy.yml`.
3.  **Configuração do Repositório**: Habilitar o deploy via Actions nas "Settings" do GitHub.
4.  **Verificação Final**: Push na `main` e validação do deploy.

### Dependências Técnicas

- Acesso administrativo ao repositório no GitHub para configurar as permissões de Pages.
- Git instalado localmente para realizar o push.

## Monitoramento e Observabilidade

- **GitHub Actions Tabs**: Monitoramento de sucesso/falha através da interface do desenvolvedor.
- **Badges de Status**: Inclusão de badge de status no `README.md` para visibilidade imediata.

## Considerações Técnicas

### Decisões Principais

- **Node.js 22 vs 25**: Optamos pela 22 (LTS) por garantir maior estabilidade e compatibilidade com as ações oficiais do GitHub no momento.
- **Deploy via Artefatos**: Escolhido em vez de deploy via branch `gh-pages` por ser o padrão recomendado e mais limpo (não polui o histórico do Git com arquivos de build).
- **Vite ^8.0.4**: Manteremos a versão atual conforme solicitação, garantindo que o build funcione com as configurações propostas.

### Riscos Conhecidos

- **404 no Refresh**: Páginas recarregadas em rotas internas (ex: `/Easy/items`) podem dar 404. Solução: Como o GitHub Pages não suporta fallback nativo sem hack (404.html), documentaremos como opcional a adição de um script de redirecionamento ou uso de `HashRouter` se necessário.
- **Configuração de Base**: Se o nome do repositório for alterado, o `base` e `basename` precisam ser atualizados correspondentemente.

### Conformidade com Padrões

- Uso de ações oficiais (`actions/checkout`, `actions/setup-node`, `actions/upload-pages-artifact`, `actions/deploy-pages`).
- Configuração de subpasta seguindo documentação oficial do Vite.

### Arquivos relevantes e dependentes

- [package.json](file:///home/vinicius-casarin/repos/study/easy/package.json)
- [vite.config.ts](file:///home/vinicius-casarin/repos/study/easy/vite.config.ts)
- [src/App.tsx](file:///home/vinicius-casarin/repos/study/easy/src/App.tsx)
- [.github/workflows/deploy.yml](file:///home/vinicius-casarin/repos/study/easy/.github/workflows/deploy.yml) (a ser criado)
