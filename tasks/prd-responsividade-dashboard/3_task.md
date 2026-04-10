# Tarefa 3.0: [VIEW] Dashboard e Grid Responsivo

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Garantir que os cartões de resumo do dashboard sejam exibidos corretamente em dispositivos móveis, sem quebra de layout ou texto ilegível.

<requirements>
- Alterar o grid de `DashboardCards.tsx` de 3/4 colunas para 1 coluna em mobile.
- Manter o espaçamento `gap-4`.
- Garantir legibilidade dos valores financeiros nos cards menores.
</requirements>

## Subtarefas

- [ ] 3.1 Modificar classes Tailwind em `DashboardCards.tsx` (`grid-cols-1 lg:grid-cols-3/4`).
- [ ] 3.2 Ajustar paddings internos dos cards para mobile.

## Detalhes de Implementação

Referencie a seção **"Dashboard Context"** na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-responsividade-dashboard/techspec.md).

## Critérios de Sucesso

- Cards empilhados verticalmente em telas menores que 1024px.
- Sem transbordamento (overflow) horizontal.

## Testes da Tarefa

- [ ] Teste de unidade: Verificar aplicação de classes CSS baseadas em media queries.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/dashboard/DashboardCards.tsx`
