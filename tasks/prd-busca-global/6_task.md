# Tarefa 6.0: Refinamento de UX e Testes E2E

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Polimento final da interface, melhorias de acessibilidade via teclado e implementação de testes end-to-end com Playwright.

<requirements>
- Navegação completa por teclado (setas pra cima/baixo, Enter) funcionando sem bugs.
- Micro-animações de entrada e saída do diálogo.
- Garante conformidade com o tema Dark/Light.
- Suporte a mobile (Header mobile atualizado para disparar a busca).
- Suite de testes E2E validando o fluxo principal.
</requirements>

## Subtarefas

- [ ] 6.1 Revisar estilos CSS para garantir harmonia com o sistema de temas do projeto.
- [ ] 6.2 Integrar o gatilho da busca no Header mobile (ver seção "Visão Geral dos Componentes" na Tech Spec).
- [ ] 6.3 Implementar testes E2E em `tests/e2e/search.spec.ts` cobrindo: abertura por atalho, busca e navegação.
- [ ] 6.4 Realizar auditoria básica de acessibilidade (foco, contraste).

## Detalhes de Implementação

- Ver seção "Abordagem de Testes - Testes de E2E" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-busca-global/techspec.md).
- Garantir que o `CommandCenter` no mobile use um gatilho apropriado (ex: ícone de lupa no topo).

## Critérios de Sucesso

- Aplicação passa nos testes E2E automatizados.
- Busca utilizável em dispositivos mobile e desktop.
- Consistência visual absoluta com o restante da aplicação.

## Testes da Tarefa

- [ ] Teste de E2E: Simular `Ctrl+K`, digitar nome de revendedor existente, pressionar `Enter` e validar a URL final.
- [ ] Teste de E2E: Validar se no mobile o ícone de busca abre o diálogo corretamente.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `tests/e2e/search.spec.ts`
- `src/components/layout/Header.tsx`
- `src/components/search/CommandCenter.tsx`
