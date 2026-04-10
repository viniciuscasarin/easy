Preciso que o dashboard de gestão de revendedores seja totalmente responsivo. O usuário final (o revendedor ou o administrador) deve conseguir lançar demandas e consultar o saldo devedor tanto no desktop quanto no celular (iPhone/Android).

Em telas grandes: Manter a Sidebar lateral fixa.

Em telas pequenas: Substituir a Sidebar por um menu "Hamburger" (usando o componente Sheet do shadcn/ui) ou uma barra de navegação inferior (Bottom Nav).

Os cards de resumo do Dashboard devem passar de 3 ou 4 colunas no desktop para 1 coluna empilhada no mobile.

Utilizar gap-4 para garantir respiro visual em telas pequenas.

As tabelas de movimentações e revendedores devem ser otimizadas. Em telas mobile, em vez de uma tabela horizontal com scroll, transforme cada linha da tabela em um "Card de Registro" visual, ou utilize overflow-x-auto com indicação visual de que há mais colunas.