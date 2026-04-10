Crie um sistema para gerenciar demandas e pagamentos de revendedores. A aplicação deve ser uma SPA usando React (Vite), Tailwind CSS, Shadcn UI e Lucide React. Para salvar os dados localmente no navegador, utilize a biblioteca Dexie.js (IndexedDB).

Regras de Negócio e Telas:

Cadastro de Itens: Crie uma tela para gerenciar um catálogo de itens (nome e preço base). Esses itens serão usados na hora de lançar um pedido.

Gestão de Revendedores: Uma tela para cadastrar revendedores e uma lista para encontrá-los. Cada revendedor deve ter uma "ficha própria" (página de detalhes).

Lançamento de Demanda: Um formulário onde eu escolho o revendedor e o tipo de movimentação:

Se for Pedido: Seleciono um item do catálogo, a quantidade e o valor (puxa o automático, mas deixa editar). Tem que ter um campo "Observação" para detalhes como nome na placa.

Se for Pagamento ou Sinal: Apenas um campo de valor para abater da dívida.

Ficha do Revendedor: Deve mostrar o histórico de tudo o que ele pediu e pagou, exibindo o saldo devedor atual (Total de Pedidos - Total de Pagamentos). Adicione um botão para gerar um relatório em PDF desse extrato.

Dashboard: Na tela inicial, mostre o total geral que todos os revendedores devem e o volume de pedidos do dia.

Importação e Exportação:
Como o banco é local, crie uma função para exportar todo o estado da aplicação em um arquivo JSON e outra para importar esse arquivo. Isso serve para backup e para trocar de computador sem perder os dados.

Requisitos Técnicos:

Use TypeScript e TanStack Query para os hooks de dados.

O layout deve ter uma barra lateral de navegação e usar os componentes do Shadcn UI (Table, Card, Dialog para formulários, etc).

O build final deve ser estático (capaz de rodar via index.html).

Cores: Destaque dívidas em vermelho e pagamentos em verde.