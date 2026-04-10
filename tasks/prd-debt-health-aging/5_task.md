# Tarefa 5.0: Integração e Validação Final

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Integrar o componente completo no Dashboard principal e validar a funcionalidade com testes end-to-end.

<requirements>
- Adicionar `DebtHealthAgingCard` ao `DashboardPage.tsx`.
- Posicionar em uma nova linha abaixo dos cards de resumo.
- Garantir responsividade (full-width).
</requirements>

## Subtarefas

- [ ] 5.1 Importar e renderizar o componente em `DashboardPage.tsx`.
- [ ] 5.2 Ajustar o layout da grid para acomodar o card de largura total.
- [ ] 5.3 Realizar smoke test manual no navegador.

## Detalhes de Implementação

Referência: Seção "Arquitetura do Sistema -> DashboardPage" na [techspec.md](techspec.md).

## Critérios de Sucesso

- Dashboard exibe a nova seção de Aging sem erros.
- A aplicação permanece responsiva em resoluções mobile e desktop.

## Testes da Tarefa

- [ ] Teste de regressão visual (se aplicável).
- [ ] Teste E2E com Playwright simulando fluxo de criação de pedido/pagamento e mudança de cor no aging.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/DashboardPage.tsx`
- `tests/dashboard-aging.spec.ts`
