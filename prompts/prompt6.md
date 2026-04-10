Título: Seção de Análise de Pareto e Inadimplência (Insights de Negócio)

Adicione uma nova seção ao Dashboard chamada "Análise de Performance de Revendedores". Esta seção deve utilizar dados do Dexie.js para calcular e exibir dois gráficos comparativos (use Recharts ou Chart.js).

Lógica de Cálculo (Pareto):

Faturamento por Revendedor: Calcule a soma de todos os "Pedidos" realizados por cada revendedor.

Ordenação: Ordene os revendedores do maior faturamento para o menor.

Acumulado: Calcule o percentual acumulado. Identifique visualmente (ex: uma linha de corte ou cor diferente) os revendedores que somados representam 80% do faturamento total.

Lógica de Cálculo (Inadimplência):

Saldo Devedor: Calcule a diferença entre (Soma de Pedidos) e (Soma de Pagamentos/Sinais) para cada revendedor.

Ranking de Risco: Exiba um gráfico de barras horizontais com os 5 ou 10 revendedores que possuem o maior saldo devedor em aberto.

Requisitos da Interface (UI):

Gráfico de Pareto: Use um gráfico de barras (faturamento individual) sobreposto por uma linha (percentual acumulado).

Cards de Insight: Ao lado dos gráficos, mostre dois textos automáticos:

"Atenção: [X] revendedores concentram 80% das suas vendas."

"[Nome do Revendedor] é atualmente o maior devedor (R$ [Valor])."

Estilização: Use o componente Card do shadcn/ui para envolver cada gráfico. Garanta que as cores sejam intuitivas (Azul para faturamento, Vermelho para inadimplência).

Especificações Técnicas:

O processamento dos dados deve ser feito via useMemo para evitar recalculamentos desnecessários no React.

Certifique-se de que a lógica lide corretamente com casos onde o revendedor tem saldo zero ou positivo (crédito).