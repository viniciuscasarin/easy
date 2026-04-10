# PRD: Automação de Deploy no GitHub Pages (Projeto Easy)

## Visão Geral

Este documento detalha os requisitos para a implementação de um fluxo de integração e entrega contínua (CI/CD) para a aplicação "Easy". O objetivo é automatizar o processo de build e publicação da SPA React (Vite) no GitHub Pages sempre que houver um push na branch `main`, garantindo que a versão online esteja sempre em sincronia com o código mais recente.

## Objetivos

- Automatizar o ciclo de deploy, eliminando intervenções manuais para atualização da página.
- Garantir a integridade da aplicação através de um processo de build padronizado no ambiente de CI.
- Fornecer feedback imediato sobre o status do deploy através do GitHub Actions.
- **Métrica de Sucesso**: Deploy concluído com sucesso em menos de 3 minutos após o push na branch `main`.

## Histórias de Usuário

- **Como Desenvolvedor**, eu quero que meu código seja buildado e publicado automaticamente ao fazer push na `main`, para que eu possa focar no desenvolvimento em vez de tarefas operacionais de deploy.
- **Como Usuário Final**, eu quero que as novas funcionalidades e correções de bugs estejam disponíveis no link do GitHub Pages assim que forem aprovadas e mescladas, para que eu tenha sempre a versão mais atualizada da ferramenta de gestão.

## Funcionalidades Principais

1.  **Workflow de CI/CD**: Arquivo de configuração do GitHub Actions (`.github/workflows/deploy.yml`).
    - **O que faz**: Define os triggers, passos e permissões para o deploy.
    - **Requisito 1.1**: O fluxo deve ser iniciado automaticamente em qualquer `push` na branch `main`.
    - **Requisito 1.2**: Deve utilizar o Node.js versão 25 (conforme preferência do ambiente do usuário).
2.  **Geração e Upload de Artefatos**:
    - **O que faz**: Executa o build de produção e prepara os arquivos para o GitHub Pages.
    - **Requisito 2.1**: Executar `npm install` seguido de `npm run build`.
    - **Requisito 2.2**: Utilizar a action oficial `actions/upload-pages-artifact` para capturar a pasta `dist`.
3.  **Hospedagem via GitHub Actions**:
    - **O que faz**: Realiza o deploy direto sem necessidade de uma branch intermediária (como `gh-pages`).
    - **Requisito 3.1**: Utilizar a action `actions/deploy-pages`.
    - **Requisito 3.2**: Configurar as permissões do repositório para permitir escrita no GitHub Pages (`id-token: write`, `pages: write`).

## Experiência do Usuário

- **Visibilidade**: O status do deploy deve ser visível na aba "Actions" do GitHub e através do badge de status no `README.md` (opcional).
- **Notificação**: Notificação nativa do GitHub em caso de falha no workflow.

## Restrições Técnicas de Alto Nível

- **Configuração do Vite**: A propriedade `base` no `vite.config.ts` deve ser definida como `/Easy/` para assegurar o carregamento correto de assets no domínio do GitHub Pages (`username.github.io/Easy/`).
- **Permissões**: É necessário habilitar explicitamente a opção "GitHub Actions" como fonte de deploy nas configurações de "Pages" do repositório no GitHub.
- **Segurança**: O workflow não deve expor informações sensíveis. Como confirmado pelo usuário, não há variáveis de ambiente (.env) críticas para o build atuais.

## Fora de Escopo

- Automação de deploy para outros ambientes (Dev, Staging).
- Deploy de branches que não sejam a `main`.
- Gestão de domínios customizados (além do padrão do GitHub).
- Configuração de testes E2E complexos nesta fase inicial.
