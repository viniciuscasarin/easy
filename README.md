# Easy — Gestão de Demandas e Revendedores
[![Deploy to GitHub Pages](https://github.com/viniciuscasarin/easy/actions/workflows/deploy.yml/badge.svg)](https://github.com/viniciuscasarin/easy/actions/workflows/deploy.yml)

Este projeto é uma ferramenta de gestão financeira e de pedidos desenvolvida como um estudo prático de Spec-Driven Development (SDD). A aplicação foi construída para ser 100% client-side, rodando inteiramente no navegador sem a necessidade de um servidor ou banco de dados externo tradicional.

# Funcionalidades
- Dashboard: Visão geral de saldo total a receber e volume de pedidos diários.
- Gestão de Revendedores: Cadastro e "ficha do cliente" com histórico completo de movimentações.
- Controle de Saldo: Cálculo automático de saldo devedor (Pedidos vs. Pagamentos/Sinais).
- Catálogo de Itens: Gerenciamento de produtos e preços base para agilizar os lançamentos.
- Lançamento de Demandas: Fluxo inteligente para registro de novos pedidos ou recebimento de valores.
- Backup & Portabilidade: Funções de exportação e importação de estado em JSON, permitindo que o usuário tenha total controle sobre seus dados e possa migrar de computador.

# Como Rodar
Este projeto foi projetado para ser portátil e independente.

- Clone o repositório.

- Instale as dependências: npm install.

- Gere o build de produção: npm run build.

A pasta dist gerada contém tudo o que é necessário. Como a aplicação utiliza client-side storage, ela pode ser hospedada em qualquer serviço estático (Vercel, Netlify, GitHub Pages) ou rodar localmente via um servidor HTTP simples.
