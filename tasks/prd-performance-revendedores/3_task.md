# Tarefa 3.0: Criação do Componente `DefaultRankingChart`

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar o gráfico de barras horizontais que exibe o Top 10 revendedores com maior saldo devedor (Inadimplência).

<requirements>
- Utilizar `BarChart` com `layout="vertical"` do Recharts.
- Exibir os 10 primeiros itens do ranking de risco.
- Cor das barras: Tons de Vermelho/Destructive.
- Tooltips formatados em BRL.
</requirements>

## Subtarefas

- [ ] 3.1 Criar arquivo `DefaultRankingChart.tsx` em `src/components/dashboard/`.
- [ ] 3.2 Implementar gráfico de barras horizontais com `XAxis type="number"` e `YAxis type="category"`.
- [ ] 3.3 Configurar cores e tooltips.

## Detalhes de Implementação

Utilizar o componente `Card` do `shadcn/ui` para manter a consistência visual com outros cards do dashboard.

## Critérios de Sucesso

- O gráfico exibe no máximo 10 barras.
- Os nomes dos revendedores aparecem legíveis ao lado das barras.
- A ordenação é decrescente (maior devedor no topo).

## Testes da Tarefa

- [ ] Teste unitário verificando o limite de 10 itens na exibição de dados.
- [ ] Verificação de formatação monetária nas legendas/tooltips.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- [src/components/dashboard/DefaultRankingChart.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/dashboard/DefaultRankingChart.tsx)
