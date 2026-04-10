# Tarefa 3.0: Cadastro de Itens (Catálogo)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar a tela de gerenciamento do catálogo de itens com listagem em tabela, formulário de criação/edição em Dialog e funcionalidade de exclusão.

<requirements>
- Tabela de itens com colunas: Nome, Preço Base, Ações (editar, excluir)
- Botão "Novo Item" que abre Dialog com formulário
- Formulário com campos: Nome (texto obrigatório) e Preço Base (numérico obrigatório)
- Edição de item reutiliza o mesmo Dialog/formulário com dados preenchidos
- Exclusão com confirmação via Dialog
- Validação de formulário (campos obrigatórios, preço > 0)
- Formatação de preço em BRL (R$)
</requirements>

## Subtarefas

- [ ] 3.1 Criar `src/components/items/ItemForm.tsx` — formulário com campos nome e preço base
- [ ] 3.2 Criar `src/components/items/ItemTable.tsx` — tabela Shadcn com colunas e ações
- [ ] 3.3 Implementar `src/pages/ItemsPage.tsx` — composição da page com tabela, botão novo e Dialog
- [ ] 3.4 Integrar com hooks `useItems`, `useCreateItem`, `useUpdateItem`, `useDeleteItem`
- [ ] 3.5 Adicionar validação de formulário
- [ ] 3.6 Adicionar Dialog de confirmação para exclusão

## Detalhes de Implementação

Consultar seção **F1 — Cadastro de Itens** em [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/prd.md) e **Estrutura de Diretórios** em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

## Critérios de Sucesso

- CRUD completo de itens funcional via interface
- Validação impede salvar dados inválidos
- Tabela atualiza automaticamente após operações
- Preço formatado em R$

## Testes da Tarefa

- [ ] Testes de unidade: renderização do `ItemForm` e `ItemTable`
- [ ] Testes de unidade: validação do formulário (campos vazios, preço negativo)
- [ ] Testes de integração: fluxo completo criar → listar → editar → excluir item

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/ItemsPage.tsx`
- `src/components/items/ItemForm.tsx`
- `src/components/items/ItemTable.tsx`
- `src/hooks/useItems.ts`
