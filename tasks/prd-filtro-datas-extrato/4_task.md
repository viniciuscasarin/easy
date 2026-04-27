# Tarefa 4.0: Adicionar testes unitários da `ResellerDetailPage` para os novos fluxos

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Estender `ResellerDetailPage.test.tsx` com novos casos de teste cobrindo todos os comportamentos de UI introduzidos na Tarefa 3.0: desabilitação do botão, validação de datas, toasts e chamada correta do serviço.

<requirements>
- Não alterar nem remover os testes existentes
- Cobrir os 6 cenários descritos na techspec (ver seção "Testes Unitários")
- Mockar `toast` de `'sonner'` nos testes onde é verificado
- Rodar todos os testes do arquivo ao final
</requirements>

## Subtarefas

- [ ] 4.1 Adicionar mock de `toast` de `'sonner'` no setup do arquivo de testes
- [ ] 4.2 Teste: apenas `startDate` preenchida → botão com atributo `disabled`
- [ ] 4.3 Teste: apenas `endDate` preenchida → botão com atributo `disabled`
- [ ] 4.4 Teste: ambas as datas preenchidas → botão habilitado (sem `disabled`)
- [ ] 4.5 Teste: `endDate < startDate` → `toast.error` chamado, `generateResellerExtract` **não** chamado
- [ ] 4.6 Teste: período válido sem transações → `toast.warning` chamado, `generateResellerExtract` **não** chamado
- [ ] 4.7 Teste: período válido com transações → `generateResellerExtract` chamado com `dateRange` correto
- [ ] 4.8 Rodar todos os testes: `npx vitest run src/pages/ResellerDetailPage.test.tsx`

## Detalhes de Implementação

Consultar `techspec.md` — seção **"Testes Unitários"**, tabela de cenários da `ResellerDetailPage.test.tsx`.

Use `fireEvent.change` para alterar os valores dos campos de data e `fireEvent.click` para acionar o botão.

Mock de `toast`:
```ts
vi.mock('sonner', () => ({ toast: { error: vi.fn(), warning: vi.fn() } }));
```

## Critérios de Sucesso

- Todos os 6 novos cenários passam
- Testes existentes não são afetados
- `npx vitest run src/pages/ResellerDetailPage.test.tsx` retorna 100% de sucesso

## Testes da Tarefa

- [ ] `npx vitest run src/pages/ResellerDetailPage.test.tsx` — todos os testes passando

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

- `src/pages/ResellerDetailPage.test.tsx` — arquivo a estender
- `src/pages/ResellerDetailPage.tsx` — implementação testada (Tarefa 3.0)
- `src/services/pdfService.ts` — mock já existente no arquivo de testes
