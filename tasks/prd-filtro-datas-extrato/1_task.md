# Tarefa 1.0: Estender `pdfService` com suporte a `DateRange`

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Modificar `pdfService.ts` para aceitar um parâmetro opcional `dateRange` que filtra as transações antes de montar o PDF e ajusta o nome do arquivo gerado para incluir as datas do período de forma amigável.

<requirements>
- Exportar interface `DateRange { startDate: Date; endDate: Date }`
- Adicionar parâmetro opcional `dateRange?: DateRange` à função `generateResellerExtract`
- Filtrar `transactions` pelo intervalo `[startDate, endDate]` (inclusive) quando `dateRange` for informado
- O `balance` recebido já será pré-calculado pela página; o serviço não precisa recalculá-lo
- Quando `dateRange` presente: nome do arquivo = `extrato_[nome]_DD-MM-AAAA_a_DD-MM-AAAA.pdf`
- Quando `dateRange` ausente: nome do arquivo = `extrato_[nome].pdf` (comportamento atual preservado)
</requirements>

## Subtarefas

- [ ] 1.1 Exportar o tipo/interface `DateRange` em `pdfService.ts`
- [ ] 1.2 Adicionar parâmetro `dateRange?: DateRange` à assinatura de `generateResellerExtract`
- [ ] 1.3 Implementar filtragem das transações por `createdAt` dentro do intervalo
- [ ] 1.4 Implementar lógica condicional do nome do arquivo com datas em `DD-MM-AAAA`
- [ ] 1.5 Garantir que o comportamento sem `dateRange` continua idêntico ao atual

## Detalhes de Implementação

Consultar `techspec.md` — seções **"Interfaces Principais"** e **"Modelos de Dados"**.

Ponto de atenção: a formatação `DD-MM-AAAA` deve usar `toLocaleDateString('pt-BR')` com substituição de `/` por `-`.

## Critérios de Sucesso

- `generateResellerExtract` aceita o novo parâmetro sem quebrar chamadas existentes
- Quando `dateRange` fornecido, apenas transações dentro do intervalo aparecem no PDF
- Nome do arquivo segue o padrão amigável com datas quando filtro ativo
- Nome do arquivo permanece `extrato_[nome].pdf` quando sem filtro

## Testes da Tarefa

- [ ] Testes de unidade adicionados em `pdfService.test.ts` (Tarefa 2.0)

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes

- `src/services/pdfService.ts` — arquivo principal a modificar
