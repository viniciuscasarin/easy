# Documento de Requisitos de Produto (PRD) — Sistema de Gestão de Revendedores

## Visão Geral

Sistema SPA para gerenciar demandas e pagamentos de revendedores. O objetivo é oferecer ao administrador controle completo sobre pedidos, cobranças e saldos devedores de seus revendedores, utilizando armazenamento local no navegador (IndexedDB) para eliminar a necessidade de backend.

## Objetivos

- Centralizar o controle de pedidos e pagamentos de revendedores em uma aplicação web simples
- Permitir acompanhar saldos devedores em tempo real
- Gerar relatórios em PDF para compartilhar extratos com revendedores
- Garantir que os dados possam ser exportados/importados para backup e portabilidade
- Métricas de sucesso: tempo para lançar um pedido < 30s, exportação/importação sem perda de dados

## Histórias de Usuário

- Como administrador, eu quero cadastrar itens com nome e preço base para que eu possa usá-los ao lançar pedidos
- Como administrador, eu quero cadastrar revendedores para que eu possa controlar suas demandas e pagamentos
- Como administrador, eu quero lançar um pedido selecionando item, quantidade e valor (editável) para registrar a venda
- Como administrador, eu quero lançar pagamentos/sinais para abater da dívida do revendedor
- Como administrador, eu quero visualizar a ficha de um revendedor com histórico e saldo devedor para saber quanto ele deve
- Como administrador, eu quero gerar um PDF do extrato do revendedor para enviar a ele
- Como administrador, eu quero ver um dashboard com totais gerais para ter uma visão macro do negócio
- Como administrador, eu quero exportar/importar dados em JSON para não perder informações ao trocar de computador

## Funcionalidades Principais

### F1 — Cadastro de Itens
- CRUD de itens (nome e preço base)
- Itens são utilizados na tela de lançamento de pedidos
- Requisitos: RF1.1 Criar item, RF1.2 Editar item, RF1.3 Excluir item, RF1.4 Listar itens

### F2 — Gestão de Revendedores
- CRUD de revendedores com listagem e busca
- Cada revendedor possui uma página de detalhes ("ficha")
- Requisitos: RF2.1 Criar revendedor, RF2.2 Editar revendedor, RF2.3 Excluir revendedor, RF2.4 Listar/Buscar revendedores, RF2.5 Página de detalhes

### F3 — Lançamento de Demanda
- Formulário com seleção de revendedor e tipo de movimentação
- **Pedido:** seleção de item do catálogo, quantidade, valor (puxa automático, editável), campo "Observação"
- **Pagamento/Sinal:** apenas campo de valor para abatimento
- Requisitos: RF3.1 Selecionar revendedor, RF3.2 Selecionar tipo, RF3.3 Lançar pedido, RF3.4 Lançar pagamento/sinal

### F4 — Ficha do Revendedor
- Histórico de pedidos e pagamentos
- Saldo devedor = Total de Pedidos - Total de Pagamentos
- Botão para gerar PDF do extrato
- Requisitos: RF4.1 Exibir histórico, RF4.2 Calcular saldo, RF4.3 Gerar PDF

### F5 — Dashboard
- Total geral que todos os revendedores devem
- Volume de pedidos do dia
- Requisitos: RF5.1 Calcular total geral, RF5.2 Calcular volume diário

### F6 — Importação e Exportação
- Exportar todo o estado em JSON
- Importar JSON para restaurar dados
- Requisitos: RF6.1 Exportar JSON, RF6.2 Importar JSON, RF6.3 Validar integridade

## Experiência do Usuário

- **Persona:** Administrador/Dono de negócio que gerencia revendedores
- **Fluxo principal:** Dashboard → Lançar demanda → Conferir ficha do revendedor
- **UI/UX:**
  - Layout com barra lateral de navegação
  - Componentes Shadcn UI (Table, Card, Dialog para formulários)
  - Ícones Lucide React
  - **Cores:** Dívidas em vermelho, pagamentos em verde
- **Responsividade:** Desktop-first, funcional em tablets

## Restrições Técnicas de Alto Nível

- **Stack obrigatória:** React (Vite), TypeScript, Tailwind CSS, Shadcn UI, Lucide React
- **Dados:** Dexie.js (IndexedDB) — sem backend
- **Hooks de dados:** TanStack Query
- **Geração de PDF:** Biblioteca client-side (ex: jsPDF, react-pdf)
- **Sem autenticação:** aplicação single-user local

## Fora de Escopo

- Autenticação e controle de acesso
- Backend/API server
- Sincronização em nuvem
- App mobile nativo
- Relatórios avançados (gráficos, tendências)
- Multi-idioma
- Notificações push
