# Tarefa 2.0: Implementação do Pipeline (GitHub Actions)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar o workflow do GitHub Actions para automatizar o processo de build e deploy sempre que houver um push na branch `main`.

<requirements>
- Utilizar Node.js versão 22.
- Utilizar as ações oficiais do GitHub para Pages.
- O workflow deve disparar no `push` para `main`.
- Os artefatos de build devem ser extraídos da pasta `dist/`.
</requirements>

## Subtarefas

- [ ] 2.1 Criar diretório `.github/workflows` se não existir.
- [ ] 2.2 Criar arquivo `deploy.yml` com a definição do workflow.
- [ ] 2.3 Validar a sintaxe do arquivo YAML.

## Detalhes de Implementação

Consulte o exemplo de YAML na seção "Design de Implementação" da [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-deploy-github-pages/techspec.md).

## Critérios de Sucesso

- Arquivo `.github/workflows/deploy.yml` criado corretamente.
- Configuração de permissões (`pages: write`, `id-token: write`) incluída.

## Testes da Tarefa

- [ ] Validar YAML: Garantir que não há erros de indentação ou campos obrigatórios ausentes.
- [ ] Verificação de gatilhos: Confirmar que o gatilho `on: push: branches: ["main"]` está presente.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- [.github/workflows/deploy.yml](file:///home/vinicius-casarin/repos/study/easy/.github/workflows/deploy.yml)
