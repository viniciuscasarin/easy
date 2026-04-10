# Tarefa 4.0: [VIEW] Transformação de Dados: Revendedores

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar a lógica que transforma a tabela de revendedores em uma lista de cards informativos em dispositivos móveis.

<requirements>
- Criar o componente `ResellerCard` para exibição mobile.
- Implementar lógica condicional na `ResellersPage` ou `ResellerTable` para alternar visualizações.
- Mostrar campos essenciais: Nome, Saldo Devedor e Status.
</requirements>

## Subtarefas

- [ ] 4.1 Criar componente `src/components/resellers/ResellerCard.tsx`.
- [ ] 4.2 Integrar lógica de "Table to Cards" na `ResellersPage.tsx`.
- [ ] 4.3 Garantir que ações (Editar/Ver Detalhes) estejam acessíveis no Card.

## Detalhes de Implementação

Referencie a seção **"Data Views"** na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-responsividade-dashboard/techspec.md).

## Critérios de Sucesso

- Tabela substituída por cards em resoluções mobile.
- Dados consistentes entre as duas visualizações.

## Testes da Tarefa

- [ ] Teste de unidade: Validar renderização do `ResellerCard`.
- [ ] Teste de integração: Verificar se o toggle de visualização responde ao redimensionamento.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/resellers/ResellerTable.tsx`
- `src/pages/ResellersPage.tsx`
- `src/components/resellers/ResellerCard.tsx` [NEW]
