Adicione uma barra de busca global no Header da aplicação que funcione como um centro de comando (atalho Ctrl+K ou Cmd+K). Utilize o componente Command do shadcn/ui.

Funcionalidades da Busca:

Resultados em Tempo Real: Ao digitar, a busca deve filtrar simultaneamente:

Revendedores: Mostrar nome e saldo atual. Ao clicar, navega para a ficha do revendedor.

Itens: Mostrar nome do item e preço. Ao clicar, abre o modal de edição/visualização do item.

Sugestões Inteligentes: Se a barra estiver vazia, mostre os "Revendedores Recentes" ou os itens mais vendidos/lançados.

Sistema de Atalhos (Ações Rápidas):
Crie uma seção de "Ações" dentro da busca para agilizar o trabalho:

"Cadastrar Novo Item": Abre o modal de criação de itens.

"Novo Lançamento: Pedido": Abre a tela de lançamento já com o select de tipo marcado como "Pedido".

"Novo Lançamento: Pagamento/Sinal": Abre a tela de lançamento já com o tipo marcado como "Pagamento".

Requisitos Técnicos:

Integre a busca com o banco Dexie.js para que a consulta seja instantânea.

Utilize o componente CommandDialog do shadcn para o efeito visual de "janela flutuante" que aparece por cima de qualquer tela.

Adicione ícones do Lucide React ao lado de cada tipo de resultado (ex: ícone de usuário para revendedores, ícone de tag para itens, ícone de raio para ações).