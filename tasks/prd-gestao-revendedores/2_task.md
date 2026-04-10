# Tarefa 2.0: Camada de Dados (Dexie.js / IndexedDB)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar o banco de dados local com Dexie.js, definir os modelos de dados (Item, Reseller, Transaction) e implementar hooks customizados com TanStack Query para operações CRUD de cada entidade.

<requirements>
- Classe `AppDatabase` estendendo `Dexie` com 3 tabelas (items, resellers, transactions)
- Tipos TypeScript para Item, Reseller e Transaction definidos
- Hooks customizados com TanStack Query: `useItems`, `useResellers`, `useTransactions`
- Cada hook deve expor: query de listagem, query por ID, mutations de CRUD (create, update, delete)
- Invalidação automática de cache após mutations
</requirements>

## Subtarefas

- [ ] 2.1 Criar `src/db/database.ts` — classe `AppDatabase` com tabelas e índices
- [ ] 2.2 Definir tipos/interfaces em `src/db/database.ts`: `Item`, `Reseller`, `Transaction`, `TransactionType`
- [ ] 2.3 Criar instância singleton do banco exportada
- [ ] 2.4 Implementar `src/hooks/useItems.ts` — `useItems()`, `useItem(id)`, `useCreateItem()`, `useUpdateItem()`, `useDeleteItem()`
- [ ] 2.5 Implementar `src/hooks/useResellers.ts` — `useResellers()`, `useReseller(id)`, `useCreateReseller()`, `useUpdateReseller()`, `useDeleteReseller()`
- [ ] 2.6 Implementar `src/hooks/useTransactions.ts` — `useTransactions(resellerId?)`, `useCreateTransaction()`, `useDeleteTransaction()`
- [ ] 2.7 Implementar `src/hooks/useDashboard.ts` — `useTotalDebt()`, `useTodayOrders()`

## Detalhes de Implementação

Consultar a seção **Interfaces Principais** e **Modelos de Dados** em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

**Tabela de índices Dexie:**

| Tabela         | Índices                             |
|----------------|-------------------------------------|
| `items`        | `++id, name`                        |
| `resellers`    | `++id, name`                        |
| `transactions` | `++id, resellerId, type, createdAt` |

## Critérios de Sucesso

- Banco cria tabelas corretamente ao inicializar
- CRUD funcional para cada entidade
- Hooks retornam dados corretamente com loading/error states
- Cache invalidado automaticamente após mutations

## Testes da Tarefa

- [ ] Testes de unidade: operações CRUD no Dexie com `fake-indexeddb`
- [ ] Testes de unidade: criação e leitura de cada tipo de entidade
- [ ] Testes de integração: hooks com `renderHook` + `QueryClientProvider`

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/db/database.ts`
- `src/hooks/useItems.ts`
- `src/hooks/useResellers.ts`
- `src/hooks/useTransactions.ts`
- `src/hooks/useDashboard.ts`
