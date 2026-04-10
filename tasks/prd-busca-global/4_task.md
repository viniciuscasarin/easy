# Tarefa 4.0: Histórico Recente e Ações Rápidas

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementação da seção de itens recentes e mapeamento de comandos operacionais (Ações Rápidas).

<requirements>
- Persistência de "Revendedores Recentes" (máximo 3) via `localStorage`.
- Seção "Ações" com comandos para: "Cadastrar Novo Item", "Novo Lançamento: Pedido", "Novo Lançamento: Pagamento".
- Exibição de 2 itens recentemente cadastrados/vendidos (via consulta Dexie order by id desc).
- Integração com o hook `useSearch` para retornar esses dados quando o termo de busca estiver vazio.
</requirements>

## Subtarefas

- [ ] 4.1 Implementar lógica de atualização do histórico de recentes ao navegar para um revendedor.
- [ ] 4.2 Adicionar busca por itens recentes via Dexie na lógica do `useSearch`.
- [ ] 4.3 Mapear os comandos da seção "Ações" para suas respectivas rotas: `/items` (com modal de novo item) ou `/transactions`.
- [ ] 4.4 Renderizar as seções de Recentes e Ações no `CommandCenter`.

## Detalhes de Implementação

- Referenciar "Histórias de Usuário" e "Funcionalidades Principais (Historico e Ações)" no [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-busca-global/prd.md).
- Utilizar `localStorage.getItem('recent_resellers')` para persistência simples.

## Critérios de Sucesso

- Abrir o CommandCenter sem digitar mostra revendedores visitados.
- Seleção de "Novo Lançamento" navega para a tela correta com o contexto adequado.
- Ícones `Zap` e `History` utilizados corretamente.

## Testes da Tarefa

- [ ] Teste de unidade: Validar se a função de adicionar recentes mantém o limite de 3 itens e evita duplicatas.
- [ ] Teste de integração: Verificar se a lista de recentes é limpa ou atualizada conforme as navegações ocorrem.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/hooks/useSearch.ts`
- `src/components/search/CommandCenter.tsx`
- `src/db/database.ts`
