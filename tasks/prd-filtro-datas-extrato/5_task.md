# Tarefa 5.0: Criar teste E2E Playwright cobrindo o fluxo de filtro de datas

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar um novo arquivo de teste E2E com Playwright que valida o fluxo de filtro de datas na página do revendedor em um ambiente de browser real, cobrindo os cenários críticos de interação do usuário.

<requirements>
- Testar apenas o fluxo novo (não duplicar testes E2E existentes)
- Navegar para a página de detalhe de um revendedor com dados seedados
- Cobrir: botão desabilitado com apenas um campo preenchido
- Cobrir: toast de erro ao submeter com `dataFim < dataInicio`
- Cobrir: toast de aviso ao submeter com período sem transações
- Cobrir: PDF gerado (download iniciado) quando intervalo válido com transações
</requirements>

## Subtarefas

- [ ] 5.1 Criar o arquivo de teste em `tests/pdf-date-filter.spec.ts`
- [ ] 5.2 Implementar seed de dados (revendedor + transações) no `beforeEach` ou usar dados do `dummy_data.json`
- [ ] 5.3 Teste E2E: preencher apenas `dataInicio` → verificar botão desabilitado
- [ ] 5.4 Teste E2E: preencher apenas `dataFim` → verificar botão desabilitado
- [ ] 5.5 Teste E2E: `dataFim < dataInicio` → clicar no botão → verificar toast de erro visível
- [ ] 5.6 Teste E2E: intervalo sem transações → verificar toast de aviso visível
- [ ] 5.7 Rodar os testes: `npx playwright test tests/pdf-date-filter.spec.ts`

## Detalhes de Implementação

Consultar `techspec.md` — seção **"Testes de E2E"**.

Para interceptar o download do PDF, usar `page.waitForEvent('download')` do Playwright.
Para verificar toasts, aguardar o seletor do elemento de toast aparecer no DOM (ex: `[data-sonner-toast]`).

## Critérios de Sucesso

- Todos os cenários E2E passam no ambiente de teste
- Nenhum teste E2E existente é quebrado
- `npx playwright test tests/pdf-date-filter.spec.ts` retorna sucesso

## Testes da Tarefa

- [ ] `npx playwright test tests/pdf-date-filter.spec.ts` — todos os testes passando

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

- `tests/pdf-date-filter.spec.ts` — novo arquivo a criar
- `playwright.config.ts` — configuração base do Playwright
- `dummy_data.json` — dados de exemplo para seed
- `src/pages/ResellerDetailPage.tsx` — página testada
