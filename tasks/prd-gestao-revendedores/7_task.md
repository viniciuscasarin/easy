# Tarefa 7.0: Dashboard (Tela Inicial)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar a tela inicial (Dashboard) com indicadores resumidos do negócio: total geral de dívidas de todos os revendedores e volume de pedidos do dia.

<requirements>
- Card com o total geral que todos os revendedores devem (soma de saldos devedores)
- Card com o volume de pedidos do dia (quantidade e valor total)
- Cards estilizados com Shadcn UI
- Dívida total em destaque com cor vermelha
- Valores formatados em BRL (R$)
- Dados atualizados em tempo real via TanStack Query
</requirements>

## Subtarefas

- [ ] 7.1 Criar `src/components/dashboard/DashboardCards.tsx` — componentes de card
- [ ] 7.2 Implementar `src/pages/DashboardPage.tsx` — composição dos cards
- [ ] 7.3 Integrar com hook `useDashboard` (`useTotalDebt()` e `useTodayOrders()`)
- [ ] 7.4 Estilizar cards com destaque visual (ícones Lucide, cores semânticas)
- [ ] 7.5 Adicionar estado vazio (mensagem quando não há dados)

## Detalhes de Implementação

Consultar seção **F5 — Dashboard** em [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/prd.md) e **Hooks** em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

**Cálculos do dashboard:**
- `totalDebt`: Σ (pedidos de todos revendedores) - Σ (pagamentos de todos revendedores)
- `todayOrders`: filtrar transactions onde `type === 'order'` e `createdAt` é hoje

## Critérios de Sucesso

- Dashboard exibe totais corretos
- Cards são visualmente atraentes e informativos
- Valores atualizam ao adicionar novos lançamentos
- Estado vazio tratado adequadamente

## Testes da Tarefa

- [ ] Testes de unidade: cálculo do total de dívidas
- [ ] Testes de unidade: filtro de pedidos do dia
- [ ] Testes de unidade: renderização dos cards com dados e sem dados
- [ ] Testes de integração: dashboard reflete dados inseridos

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/DashboardPage.tsx`
- `src/components/dashboard/DashboardCards.tsx`
- `src/hooks/useDashboard.ts`
