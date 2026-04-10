# Tarefa 3.0: Desenvolvimento do Componente DebtHealthAgingCard - UI de Gráfico

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Criar a interface visual do card de Aging, apresentando a distribuição da dívida em um gráfico de rosca.

<requirements>
- Utilizar `Card` do shadcn/ui.
- Implementar `PieChart` (donnut) com as cores: Verde (#10b981), Amarelo (#f59e0b), Vermelho (#ef4444).
- Mostrar legenda com nomes das categorias e valores absolutos formatados em BRL.
</requirements>

## Subtarefas

- [ ] 3.1 Criar `src/components/dashboard/DebtHealthAgingCard.tsx`.
- [ ] 3.2 Integrar `ResponsiveContainer` e `PieChart` do Recharts.
- [ ] 3.3 Implementar a legenda lateral com a formatação `pt-BR`.

## Detalhes de Implementação

Referência: Seção "Design de Implementação -> Interfaces Principais" na [techspec.md](techspec.md).

## Critérios de Sucesso

- Gráfico renderizado corretamente com as cores e porcentagens.
- Legenda exibe valores em R$ que somam o total da dívida.

## Testes da Tarefa

- [ ] Testes de renderização com diferentes estados de dados.
- [ ] Teste de acessibilidade (contraste de cores).

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/dashboard/DebtHealthAgingCard.tsx`
- `src/components/ui/card.tsx`
