# Tech Spec: Filtro de Intervalo de Datas no Extrato PDF do Revendedor

## Resumo Executivo

A implementação estende dois módulos existentes sem introduzir novas dependências. Em `pdfService.ts`, a função `generateResellerExtract` recebe um parâmetro opcional `dateRange` que filtra as transações antes de montar o documento e ajusta o nome do arquivo gerado. Em `ResellerDetailPage.tsx`, dois campos `<Input type="date">` são adicionados de forma permanente; o estado local controla os valores, valida o intervalo e habilita/desabilita o botão de geração. Toasts via Sonner comunicam erros de validação e aviso de período vazio. Nenhuma alteração de schema de banco de dados é necessária.

---

## Arquitetura do Sistema

### Visão Geral dos Componentes

| Componente | Tipo | Mudança |
|---|---|---|
| `pdfService.ts` | Serviço | **Modificado** — aceita `dateRange` opcional, filtra transações, ajusta nome do arquivo |
| `ResellerDetailPage.tsx` | Página | **Modificado** — adiciona estado dos filtros, lógica de validação, campos de data e controle do botão |
| `pdfService.test.ts` | Teste unitário | **Modificado** — adiciona cenários com filtro de datas |
| `ResellerDetailPage.test.tsx` | Teste unitário | **Modificado** — adiciona cenários de desabilitação do botão e validação |

**Fluxo de dados:**
```
[Input dataInicio] ──┐
                     ├──> estado local (useState) ──> validação ──> handleGeneratePDF() ──> generateResellerExtract()
[Input dataFim]    ──┘                                              └──> toast.warning() (se período vazio)
```

---

## Design de Implementação

### Interfaces Principais

```typescript
// pdfService.ts — assinatura estendida
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export function generateResellerExtract(
  reseller: Reseller,
  transactions: Transaction[],
  balance: number,
  dateRange?: DateRange
): void;
```

```typescript
// ResellerDetailPage.tsx — estado local dos filtros
interface DateFilterState {
  startDate: string; // formato "YYYY-MM-DD" (valor nativo do input date)
  endDate: string;
}
```

### Modelos de Dados

Sem alteração de schema. O campo `createdAt: Date` existente em `Transaction` é usado para a filtragem por intervalo.

**Lógica de filtragem em `pdfService.ts`:**
```typescript
const filtered = dateRange
  ? transactions.filter(t => {
      const d = t.createdAt;
      return d >= dateRange.startDate && d <= dateRange.endDate;
    })
  : transactions;
```

**Lógica do nome do arquivo:**
```typescript
// Com filtro
const fmt = (d: Date) => d.toLocaleDateString('pt-BR').replace(/\//g, '-');
const filename = `extrato_${safeName}_${fmt(startDate)}_a_${fmt(endDate)}.pdf`;

// Sem filtro (comportamento atual preservado)
const filename = `extrato_${safeName}.pdf`;
```

**Lógica de controle do botão em `ResellerDetailPage.tsx`:**
```typescript
const hasFilter = dateFilter.startDate !== '' || dateFilter.endDate !== '';
const isFilterComplete = dateFilter.startDate !== '' && dateFilter.endDate !== '';
const isPdfButtonDisabled = hasFilter && !isFilterComplete;
```

**Validações no `handleGeneratePDF`:**
1. Se `isFilterComplete`, verificar que `startDate <= endDate`; caso contrário, `toast.error(...)`.
2. Filtrar `transactions` pelo intervalo; se resultado vazio, `toast.warning(...)` e retornar sem gerar PDF.
3. Calcular `balance` sobre as transações filtradas.
4. Chamar `generateResellerExtract(reseller, filtered, filteredBalance, dateRange)`.

### Endpoints de API

Não aplicável — aplicação client-side com IndexedDB (Dexie.js).

---

## Pontos de Integração

Não há integrações externas. A biblioteca `sonner` já está instalada e configurada (`<Toaster>` no layout raiz); basta importar `toast` de `'sonner'` diretamente na página.

---

## Abordagem de Testes

### Testes Unitários

**`pdfService.test.ts` — novos cenários:**
| Cenário | Verificação |
|---|---|
| Gera PDF com `dateRange` — inclui apenas transações no intervalo | `autoTable` chamado com `body` contendo apenas as linhas filtradas |
| Gera PDF com `dateRange` — nome do arquivo inclui as datas formatadas | `mockSave` chamado com `extrato_john_doe_DD-MM-AAAA_a_DD-MM-AAAA.pdf` |
| Gera PDF sem `dateRange` — todas as transações incluídas | Comportamento atual preservado (regressão) |

**`ResellerDetailPage.test.tsx` — novos cenários:**
| Cenário | Verificação |
|---|---|
| Apenas `dataInicio` preenchida → botão desabilitado | `button` com `disabled` |
| Apenas `dataFim` preenchida → botão desabilitado | `button` com `disabled` |
| Ambas preenchidas → botão habilitado | `button` sem `disabled` |
| `dataFim < dataInicio` → toast de erro exibido, `generateResellerExtract` não chamado | `toast.error` chamado; mock não chamado |
| Período sem transações → toast de aviso, PDF não gerado | `toast.warning` chamado; mock não chamado |
| Ambas datas válidas com transações → PDF gerado com `dateRange` | Mock chamado com `dateRange` correto |

### Testes de Integração

Não necessários para este escopo — lógica de filtro está inteiramente no cliente.

### Testes de E2E

Usando **Playwright**, cobrir o fluxo novo:
1. Navegar para a página de detalhe de um revendedor com transações seedadas.
2. Preencher `dataInicio` e `dataFim` com intervalo válido.
3. Verificar que o botão "Gerar PDF" está habilitado.
4. Tentar preencher apenas um campo → verificar botão desabilitado.
5. Preencher `dataFim < dataInicio` → clicar no botão → verificar que toast de erro aparece.
6. Preencher intervalo sem transações → verificar toast de aviso.

---

## Sequenciamento de Desenvolvimento

### Ordem de Construção

1. **`pdfService.ts`** — Adicionar tipo `DateRange`, estender `generateResellerExtract` com filtragem e nomeclatura condicional. Sem dependências de UI.
2. **`pdfService.test.ts`** — Cobrir os novos cenários do serviço. Validar antes de tocar na UI.
3. **`ResellerDetailPage.tsx`** — Adicionar estado `dateFilter`, campos `<Input type="date">`, lógica de validação e controle do botão. Integrar `toast`.
4. **`ResellerDetailPage.test.tsx`** — Cobrir todos os novos cenários de UI.
5. **Playwright E2E** — Adicionar spec do fluxo de filtro.

### Dependências Técnicas

- `sonner` — já instalada; sem instalação adicional necessária.
- `jsPDF` + `jspdf-autotable` — já instaladas; sem alteração de versão.
- Nenhuma dependência bloqueante externa.

---

## Monitoramento e Observabilidade

Aplicação client-side local sem infraestrutura de monitoramento. Feedback ao usuário é fornecido via:
- Toast de **erro** (`toast.error`) para validação de intervalo inválido.
- Toast de **warning** (`toast.warning`) para período sem transações.
- Download automático do PDF como confirmação de sucesso.

---

## Considerações Técnicas

### Decisões Principais

| Decisão | Escolha | Justificativa |
|---|---|---|
| Componente de data | `<Input type="date">` nativo | Já disponível no projeto; sem nova dependência; compatível com mobile |
| Filtro no serviço vs. na página | Filtragem **no serviço** (`pdfService.ts`) | Mantém a página "thin", facilita testes unitários do serviço isoladamente |
| Cálculo do saldo | Recalculado **na página** antes da chamada | O saldo filtrado é um dado de entrada do serviço — responsabilidade da página compor os dados corretos |
| Alertas | `toast` do Sonner | Já integrado no layout; padrão do projeto (vide `backup/ImportExport.tsx`) |

### Riscos Conhecidos

- **Fuso horário:** `createdAt` armazenado como `Date` no IndexedDB pode ter comportamento diferente entre navegadores ao comparar com strings de `input[type=date]` (que são `YYYY-MM-DD` local). Mitigação: converter `string → Date` com horário `00:00:00` no início do dia e `23:59:59` no fim do dia para tornar o intervalo inclusivo.
- **Testes existentes:** `pdfService.test.ts` valida `mockSave` com o nome atual (`extrato_john_doe.pdf`). O novo cenário sem `dateRange` deve continuar passando sem alteração do teste existente; apenas cenários novos serão adicionados.

### Conformidade com Padrões

Não existe pasta `.claude/rules` no projeto. A Tech Spec segue os padrões observados no codebase:
- Componentes UI do Shadcn (`@/components/ui/...`).
- Hooks personalizados em `src/hooks/`.
- Testes com Vitest + React Testing Library para unitários e Playwright para E2E.
- Estado local com `useState` do React (sem store global para dados efêmeros de UI).

### Arquivos Relevantes e Dependentes

| Arquivo | Papel |
|---|---|
| [`src/services/pdfService.ts`](file:///home/vinicius-casarin/repos/study/easy/src/services/pdfService.ts) | Modificado — lógica de filtro e nome do arquivo |
| [`src/services/pdfService.test.ts`](file:///home/vinicius-casarin/repos/study/easy/src/services/pdfService.test.ts) | Modificado — novos cenários de teste |
| [`src/pages/ResellerDetailPage.tsx`](file:///home/vinicius-casarin/repos/study/easy/src/pages/ResellerDetailPage.tsx) | Modificado — campos de data, validação, integração com toast |
| [`src/pages/ResellerDetailPage.test.tsx`](file:///home/vinicius-casarin/repos/study/easy/src/pages/ResellerDetailPage.test.tsx) | Modificado — novos cenários de UI |
| [`src/components/ui/input.tsx`](file:///home/vinicius-casarin/repos/study/easy/src/components/ui/input.tsx) | Reutilizado sem modificação |
| [`src/components/ui/sonner.tsx`](file:///home/vinicius-casarin/repos/study/easy/src/components/ui/sonner.tsx) | Reutilizado sem modificação |
