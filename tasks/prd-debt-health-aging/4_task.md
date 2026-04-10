# Tarefa 4.0: Desenvolvimento do Componente DebtHealthAgingCard - Tabela de Alerta

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Adicionar a lista de alerta ao componente de Aging para destacar os revendedores que precisam de atenção imediata.

<requirements>
- Listar exatamente 3 revendedores (Top 3 críticos por maior saldo).
- Exibir nome, saldo e dias desde a última movimentação.
- Tornar os itens clicáveis com navegação para o perfil do revendedor.
- Utilizar a `Table` do shadcn/ui.
</requirements>

## Subtarefas

- [ ] 4.1 Implementar a seção "Lista de Alerta" abaixo do gráfico.
- [ ] 4.2 Adicionar a lógica de navegação usando `react-router-dom`.
- [ ] 4.3 Garantir que a lista só exiba revendedores na categoria "Crítico".

## Detalhes de Implementação

Referência: Seção "Experiência do Usuário" na [techspec.md](techspec.md).

## Critérios de Sucesso

- Lista de alerta exibe os dados corretos conforme o hook.
- Clique no revendedor redireciona para a rota correta.

## Testes da Tarefa

- [ ] Teste unitário para ordenação da lista de alerta.
- [ ] Teste de interação de clique.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/dashboard/DebtHealthAgingCard.tsx`
- `src/components/ui/table.tsx`
