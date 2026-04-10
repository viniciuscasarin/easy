# Tarefa 2.0: Implementação de Variáveis CSS Semânticas

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Definir tokens de cores semânticas no `index.css` que se adaptam automaticamente ao tema ativo.

<requirements>
- Criar as variáveis `--debt` e `--payment` no bloco `:root` (light) e `.dark` (dark).
- Mapear as variáveis no `@theme inline` do Tailwind v4 (`--color-debt`, `--color-payment`).
- Utilizar os valores OKLCH sugeridos na Tech Spec.
</requirements>

## Subtarefas

- [ ] 2.1 Adicionar variáveis `--debt` e `--payment` ao `:root` em `src/index.css`.
- [ ] 2.2 Adicionar variáveis `--debt` e `--payment` ao `.dark` em `src/index.css`.
- [ ] 2.3 Mapear as variáveis no bloco `@theme inline`.

## Detalhes de Implementação

Consulte a seção "Decisões Principais" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-dark-light-mode/techspec.md) para os valores OKLCH.

## Critérios de Sucesso

- As classes `text-debt` e `text-payment` devem estar disponíveis e refletir as cores corretas em ambos os temas.

## Testes da Tarefa

- [ ] Teste visual: Criar um elemento temporário com `text-debt` e validar a mudança de tom ao alternar a classe `.dark` no `html`.

## Arquivos relevantes
- [src/index.css](file:///home/vinicius-casarin/repos/study/easy/src/index.css)
