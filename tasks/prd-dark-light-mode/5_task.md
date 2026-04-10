# Tarefa 5.0: Refatoração de Cores nas Views Dashboard e Detalhes

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Substituir cores hardcoded por variáveis semânticas para garantir que dívidas e pagamentos se adaptem ao tema escuro.

<requirements>
- Substituir `text-red-500/600/700` por `text-debt`.
- Substituir `text-green-500/600/700` por `text-payment`.
- Garantir que as bordas e fundos condicionais também usem variantes que funcionem bem no dark mode.
</requirements>

## Subtarefas

- [ ] 5.1 Refatorar `DashboardCards.tsx`.
- [ ] 5.2 Refatorar `ResellerDetailPage.tsx`.

## Detalhes de Implementação

Referencie os arquivos relevantes listados na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-dark-light-mode/techspec.md).

## Critérios de Sucesso

- As cores de dívida permanecem vermelhas, mas em tons mais vibrantes no dark mode.
- Nenhuma cor crítica some ou perde contraste no modo escuro.

## Testes da Tarefa

- [ ] Verificar visualmente as duas páginas em ambos os temas.

## Arquivos relevantes
- [src/components/dashboard/DashboardCards.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/dashboard/DashboardCards.tsx)
- [src/pages/ResellerDetailPage.tsx](file:///home/vinicius-casarin/repos/study/easy/src/pages/ResellerDetailPage.tsx)
