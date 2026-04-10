# Tarefa 1.0: Configuração de Infraestrutura e Provedor de Tema

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Configurar o `next-themes` na aplicação para permitir o gerenciamento de estado do tema (claro/escuro) e persistência automática.

<requirements>
- Utilizar `ThemeProvider` da biblioteca `next-themes`.
- Configurar o atributo `class` para que a classe `.dark` seja injetada no elemento `html`.
- Envolver a aplicação no nível raiz (`App.tsx`).
</requirements>

## Subtarefas

- [ ] 1.1 Configurar o `ThemeProvider` no `src/App.tsx`.
- [ ] 1.2 Validar se o tema padrão segue a preferência do sistema operacional (`system`).

## Detalhes de Implementação

Consulte a seção "Configuração de Infraestrutura" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-dark-light-mode/techspec.md).

## Critérios de Sucesso

- O elemento `html` deve receber a classe `dark` quando o tema for alterado.
- A aplicação deve inicializar sem erros e respeitar o tema do sistema na primeira carga.

## Testes da Tarefa

- [ ] Teste manual: Verificar presença da classe `dark` no DevTools ao manipular o estado via console (temporariamente).

## Arquivos relevantes
- [src/App.tsx](file:///home/vinicius-casarin/repos/study/easy/src/App.tsx)
