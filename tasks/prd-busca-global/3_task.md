# Tarefa 3.0: Integração de Layout e Atalhos

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Integração global do `CommandCenter` no layout da aplicação, suporte a atalhos de teclado e criação do cabeçalho desktop.

<requirements>
- `CommandCenter` registrado no `MainLayout.tsx`.
- Listener global para `Ctrl+K` e `Cmd+K` para alternar visibilidade.
- Novo componente `Header.tsx` em `src/components/layout/` para Desktop.
- Botão "Pesquisar (Ctrl+K)" no Header que dispara a abertura da busca.
- Navegação via `useNavigate` ao selecionar resultados.
</requirements>

## Subtarefas

- [ ] 3.1 Criar o componente `src/components/layout/Header.tsx`.
- [ ] 3.2 Modificar `MainLayout.tsx` para incluir o `Header` e o `CommandCenter`.
- [ ] 3.3 Implementar `useEffect` no `CommandCenter` ou `MainLayout` para capturar atalhos de teclado.
- [ ] 3.4 Implementar função de navegação no `CommandCenter` para redirecionar para `/resellers/:id` ou `/items`.
- [ ] 3.5 Garantir que o diálogo seja fechado após uma seleção bem-sucedida.

## Detalhes de Implementação

- Ver seção "Arquitetura do Sistema - Fluxo de Dados" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-busca-global/techspec.md).
- Utilizar `CommandItem` do Shadcn com o atributo `onSelect` para disparar a navegação.

## Critérios de Sucesso

- Atalho de teclado `Ctrl+K` funcionando consistentemente em todas as rotas.
- Seleção de um revendedor redirecionando para sua ficha.
- Cabeçalho desktop visível e funcional com busca e seletor de tema.

## Testes da Tarefa

- [ ] Teste de unidade: Verificar se o preventDefault do evento `keydown` está sendo chamado para `Ctrl+K`.
- [ ] Teste de integração: Simular clique em um `CommandItem` e verificar a chamada do `useNavigate`.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/layout/MainLayout.tsx`
- `src/components/layout/Header.tsx`
- `src/components/search/CommandCenter.tsx`
