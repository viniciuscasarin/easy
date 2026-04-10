# Tarefa 4.0: Gestão de Revendedores (Cadastro e Listagem)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar a tela de gestão de revendedores com listagem, busca, formulário de cadastro/edição e a página de detalhes (ficha) com estrutura base.

<requirements>
- Tabela de revendedores com colunas: Nome, Telefone, Email, Ações
- Campo de busca para filtrar revendedores por nome
- Botão "Novo Revendedor" que abre Dialog com formulário
- Formulário com campos: Nome (obrigatório), Telefone, Email, Observações
- Clique no nome do revendedor navega para `/resellers/:id` (ficha)
- Exclusão com confirmação via Dialog
- Página de detalhes (placeholder — será completada na Tarefa 6.0)
</requirements>

## Subtarefas

- [ ] 4.1 Criar `src/components/resellers/ResellerForm.tsx` — formulário com campos
- [ ] 4.2 Criar `src/components/resellers/ResellerTable.tsx` — tabela com busca e ações
- [ ] 4.3 Implementar `src/pages/ResellersPage.tsx` — composição com tabela, busca e Dialog
- [ ] 4.4 Implementar `src/pages/ResellerDetailPage.tsx` — estrutura base com dados do revendedor
- [ ] 4.5 Integrar com hooks `useResellers`, `useCreateReseller`, `useUpdateReseller`, `useDeleteReseller`
- [ ] 4.6 Implementar busca/filtro local por nome

## Detalhes de Implementação

Consultar seção **F2 — Gestão de Revendedores** em [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/prd.md) e **Estrutura de Diretórios** em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

## Critérios de Sucesso

- CRUD completo de revendedores funcional via interface
- Busca filtra revendedores em tempo real
- Navegação para ficha do revendedor funcional
- Formulário com validação adequada

## Testes da Tarefa

- [ ] Testes de unidade: renderização do `ResellerForm` e `ResellerTable`
- [ ] Testes de unidade: funcionalidade de busca/filtro
- [ ] Testes de integração: fluxo completo criar → buscar → editar → excluir revendedor
- [ ] Testes de integração: navegação para a página de detalhes

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/ResellersPage.tsx`
- `src/pages/ResellerDetailPage.tsx`
- `src/components/resellers/ResellerForm.tsx`
- `src/components/resellers/ResellerTable.tsx`
- `src/hooks/useResellers.ts`
