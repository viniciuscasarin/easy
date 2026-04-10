Preciso de uma nova métrica visual no Dashboard chamada "Saúde da Dívida (Aging)". O objetivo é categorizar o saldo devedor total com base no tempo decorrido desde o último lançamento de cada revendedor.

Lógica de Cálculo:

Identificação: Para cada revendedor que possui saldo devedor (Saldo > 0), verifique a data da última Demanda (Pedido ou Pagamento) registada.

Categorização: Agrupe o valor total devido nessas três categorias:

Recente (Verde): Última movimentação há menos de 7 dias.

Em Atenção (Amarelo): Última movimentação entre 8 e 30 dias.

Crítico (Vermelho): Mais de 30 dias sem qualquer movimentação ou pagamento.

Interface (UI/UX):

Gráfico de Rosca (Doughnut Chart): Exiba a distribuição percentual do valor total a receber nessas três cores (Verde, Amarelo, Vermelho). Utilize o Recharts.

Legenda Detalhada: Ao lado do gráfico, mostre o valor absoluto em Reais (R$) para cada categoria.

Lista de Alerta: Abaixo do gráfico, liste os 3 revendedores que estão na categoria "Crítico" com o maior saldo devedor, para facilitar a cobrança imediata.

Requisitos Técnicos:

Utilize as funções de data do JavaScript ou a biblioteca date-fns para calcular a diferença de dias.

Garanta que o componente seja responsivo e utilize os Cards do shadcn/ui.

A lógica deve ser processada no frontend usando os dados carregados do Dexie.js.