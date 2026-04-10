# Tarefa 1.0: Setup do Projeto e Infraestrutura Base

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Inicializar o projeto React com Vite e TypeScript, instalar todas as dependências necessárias, configurar o layout base com barra lateral de navegação e o sistema de rotas.

<requirements>
- Projeto Vite + React + TypeScript inicializado
- Tailwind CSS configurado e funcional
- Shadcn UI inicializado com componentes base instalados
- Lucide React instalado
- Dexie.js e dexie-react-hooks instalados
- TanStack Query configurado com QueryClientProvider
- React Router DOM configurado com rotas para todas as pages
- Layout com Sidebar fixa e área de conteúdo
- Todas as pages criadas como placeholder
</requirements>

## Subtarefas

- [ ] 1.1 Inicializar projeto com `npm create vite@latest ./ -- --template react-ts`
- [ ] 1.2 Instalar dependências: `tailwindcss`, `@tanstack/react-query`, `dexie`, `dexie-react-hooks`, `react-router-dom`, `lucide-react`, `jspdf`, `jspdf-autotable`
- [ ] 1.3 Configurar Tailwind CSS (tailwind.config, globals.css)
- [ ] 1.4 Inicializar Shadcn UI e instalar componentes: Button, Card, Table, Dialog, Input, Select, Label, Separator
- [ ] 1.5 Configurar React Router DOM com rotas: `/` (Dashboard), `/items` (Itens), `/resellers` (Revendedores), `/resellers/:id` (Ficha), `/transactions` (Lançamentos), `/backup` (Backup)
- [ ] 1.6 Criar componente `MainLayout` com Sidebar (links de navegação com ícones Lucide) e área de conteúdo
- [ ] 1.7 Criar pages placeholder para cada rota
- [ ] 1.8 Configurar `QueryClientProvider` no `main.tsx`

## Detalhes de Implementação

Consultar a seção **Estrutura de Diretórios** e **Dependências Técnicas** em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

## Critérios de Sucesso

- Aplicação roda com `npm run dev` sem erros
- Navegação entre todas as rotas funciona via sidebar
- Layout responsivo com sidebar fixa
- Todas as dependências instaladas e importáveis

## Testes da Tarefa

- [ ] Testes de unidade: renderização do `MainLayout` e `Sidebar`
- [ ] Testes de integração: navegação entre rotas renderiza a page correta

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/App.tsx`
- `src/main.tsx`
- `src/components/layout/MainLayout.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/pages/*.tsx`
- `package.json`
- `tailwind.config.ts`
