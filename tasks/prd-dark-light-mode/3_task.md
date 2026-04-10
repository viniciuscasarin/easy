# Tarefa 3.0: Criação do componente ThemeToggle

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Desenvolver o componente de UI responsável por alternar entre os temas claro e escuro.

<requirements>
- Utilizar `useTheme` do `next-themes`.
- Exibir ícone `Sun` (sol) no modo escuro e `Moon` (lua) no modo claro.
- O botão deve ser um `Button` do Shadcn UI com variante `ghost` e tamanho `icon`.
- Adicionar `aria-label` descritivo.
</requirements>

## Subtarefas

- [ ] 3.1 Criar `src/components/ui/ThemeToggle.tsx`.
- [ ] 3.2 Implementar lógica de alternância.
- [ ] 3.3 Adicionar Tooltip ou `aria-label`.

## Detalhes de Implementação

Referencie o design de componentes na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-dark-light-mode/techspec.md).

## Critérios de Sucesso

- O clique no botão alterna o tema e o ícone instantaneamente.
- O componente é acessível via teclado.

## Testes da Tarefa

- [ ] Teste de unidade para verificar a mudança de ícone baseada no tema.

## Arquivos relevantes
- [src/components/ui/ThemeToggle.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/ui/ThemeToggle.tsx)
