# Tarefa 2.0: Hook de Busca (useSearch)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementação da lógica de busca reativa utilizando Dexie.js para buscar revendedores e itens, incluindo o cálculo de saldo devedor.

<requirements>
- Hook `useSearch` em `src/hooks/useSearch.ts`.
- Busca via `where('name').startsWith()` no Dexie.js para `items` e `resellers`.
- Cálculo de saldo em tempo real para os revendedores encontrados.
- Limite estrito de 5 resultados por categoria.
- Formatação dos resultados conforme interface `SearchResult` da Tech Spec.
</requirements>

## Subtarefas

- [ ] 2.1 Criar o arquivo `src/hooks/useSearch.ts`.
- [ ] 2.2 Implementar lógica de filtragem para `db.resellers`.
- [ ] 2.3 Implementar lógica de filtragem para `db.items`.
- [ ] 2.4 Integrar cálculo de saldo consultando `db.transactions` (ver `useResellers` como referência).
- [ ] 2.5 Lidar com estados de `isLoading` e `results` formatados.

## Detalhes de Implementação

- Referenciar seção "Design de Implementação" e "Considerações Técnicas - Cálculo de Saldo On-the-fly" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-busca-global/techspec.md).
- Utilizar `liveQuery` do Dexie para reatividade se necessário, ou `useEffect` dependente do termo de busca.

## Critérios de Sucesso

- Busca retornando resultados corretos em menos de 50ms.
- Saldo exibido para revendedores reflete a soma real das transações.
- Máximo de 5 resultados por categoria.

## Testes da Tarefa

- [ ] Teste de unidade: Mockar o banco Dexie e validar se o filtro por nome funciona.
- [ ] Teste de unidade: Validar se o cálculo de saldo está correto para um conjunto conhecido de transações.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/hooks/useSearch.ts`
- `src/db/database.ts`
- `src/hooks/useResellers.ts`
