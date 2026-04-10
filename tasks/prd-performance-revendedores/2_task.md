# Tarefa 2.0: Criação do Componente `ParetoChart`

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar o componente de visualização da Análise de Pareto utilizando Recharts. O gráfico deve sobrepor barras (faturamento individual) e uma linha (percentual acumulado).

<requirements>
- Utilizar `ComposedChart` do Recharts.
- Eixo Y Esquerdo: Faturamento em BRL.
- Eixo Y Direito: Porcentagem Acumulada (0-100%).
- Adicionar linha de referência horizontal em 80%.
- Tooltips personalizados com valores formatados em Real e Percentual.
- Cores: Barras em tons de Azul, Linha em cor contrastante (ex: Laranja ou Zinco).
</requirements>

## Subtarefas

- [ ] 2.1 Criar arquivo `ParetoChart.tsx` em `src/components/dashboard/`.
- [ ] 2.2 Configurar `ComposedChart` com os dois eixos Y.
- [ ] 2.3 Implementar `ReferenceLine` em `y=80` no eixo de porcentagem.
- [ ] 2.4 Estilizar labels e eixos para garantir legibilidade (nomes de revendedores no eixo X).

## Detalhes de Implementação

Consulte a seção "Considerações Técnicas > Decisões Principais" na [techspec.md](techspec.md). Utilize os componentes do `shadcn/ui` para o container do card se necessário.

## Critérios de Sucesso

- O gráfico é renderizado corretamente com dados de teste.
- A linha de percentual acumulado acompanha corretamente a progressão das barras.
- Tooltip mostra o nome do revendedor, faturamento e quanto ele contribui para o total acumulado.

## Testes da Tarefa

- [ ] Teste de fumaça (smoke test) verificando se o componente renderiza sem erros no Vitest/Testing Library.
- [ ] Verificação visual da escala de 0 a 100% no eixo direito.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- [src/components/dashboard/ParetoChart.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/dashboard/ParetoChart.tsx)
