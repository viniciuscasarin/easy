# Tarefa 4.0: Integração do ThemeToggle no Layout e Sidebar

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Inserir o botão de tema nos locais designados para desktop (Sidebar) e mobile (Header).

<requirements>
- No Desktop: Alinhado à direita no container do logo "Easy" na `Sidebar`.
- No Mobile: Alinhado à direita no `header` do `MainLayout`.
- Manter o alinhamento visual com os elementos existentes.
</requirements>

## Subtarefas

- [ ] 4.1 Modificar `src/components/layout/Sidebar.tsx` para incluir o `ThemeToggle`.
- [ ] 4.2 Modificar `src/components/layout/MainLayout.tsx` para incluir o `ThemeToggle` no header.

## Detalhes de Implementação

Consulte a seção "Arquitetura do Sistema" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-dark-light-mode/techspec.md).

## Critérios de Sucesso

- O botão é visível e funcional em ambas as visualizações (desktop/mobile).
- O layout não quebra ao adicionar o novo elemento.

## Testes da Tarefa

- [ ] Teste manual em diferentes resoluções.

## Arquivos relevantes
- [src/components/layout/Sidebar.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/layout/Sidebar.tsx)
- [src/components/layout/MainLayout.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/layout/MainLayout.tsx)
