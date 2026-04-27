# Tarefa 3.0: Atualizar `ResellerDetailPage` com campos de data, validações e toast

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Modificar `ResellerDetailPage.tsx` para adicionar dois campos `<Input type="date">` permanentes na página, controlar o estado local do filtro, validar o intervalo e integrar com `toast` (Sonner) para feedback ao usuário.

<requirements>
- Dois campos `<Input type="date">` visíveis na página: "Data Início" e "Data Fim"
- Estado local `dateFilter: { startDate: string; endDate: string }` via `useState`
- Botão "Gerar PDF" desabilitado quando apenas um dos campos estiver preenchido
- Botão habilitado quando ambos os campos estiverem preenchidos OU ambos estiverem vazios
- Ao clicar com ambas as datas: validar que `startDate <= endDate`; se inválido → `toast.error(...)`
- Ao clicar com intervalo válido: filtrar `transactions`, calcular `filteredBalance`, emitir `toast.warning` se sem transações no período e não gerar PDF
- Ao clicar com intervalo válido e transações existentes: chamar `generateResellerExtract(reseller, filtered, filteredBalance, dateRange)`
- Sem datas: comportamento atual preservado (todas as transações, sem `dateRange`)
</requirements>

## Subtarefas

- [ ] 3.1 Adicionar `useState` para `dateFilter` (`startDate`, `endDate` como strings)
- [ ] 3.2 Renderizar os dois campos `<Input type="date">` com labels, visualmente agrupados próximos ao botão de PDF
- [ ] 3.3 Implementar lógica de `isPdfButtonDisabled` e aplicar ao botão (ambos os botões desktop e mobile)
- [ ] 3.4 Implementar `handleGeneratePDF` com: conversão `string → Date` (início `00:00:00`, fim `23:59:59`), validação de ordem, filtragem e cálculo de `filteredBalance`
- [ ] 3.5 Integrar `toast` (import de `'sonner'`): `toast.error` para intervalo inválido, `toast.warning` para período vazio
- [ ] 3.6 Verificar layout responsivo — campos de data visíveis tanto em desktop quanto em mobile

## Detalhes de Implementação

Consultar `techspec.md` — seções **"Interfaces Principais"** (estado local), **"Modelos de Dados"** (lógica de controle do botão e validações) e **"Riscos Conhecidos"** (conversão de fuso horário).

Conversão segura de string para Date:
```ts
const start = new Date(dateFilter.startDate + 'T00:00:00');
const end   = new Date(dateFilter.endDate   + 'T23:59:59');
```

## Critérios de Sucesso

- Campos de data aparecem na página em ambos os tamanhos de tela
- Botão desabilitado corretamente conforme regras de estado
- Toasts aparecem nos cenários de erro e aviso corretos
- PDF gerado com `dateRange` quando tudo válido; sem `dateRange` quando campos vazios
- Testes existentes da página continuam passando

## Testes da Tarefa

- [ ] Testes de unidade adicionados em `ResellerDetailPage.test.tsx` (Tarefa 4.0)

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

- `src/pages/ResellerDetailPage.tsx` — arquivo principal a modificar
- `src/components/ui/input.tsx` — componente `<Input>` reutilizado
- `sonner` — import de `toast` para feedback ao usuário
