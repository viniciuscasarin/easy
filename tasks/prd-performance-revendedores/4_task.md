# Tarefa 4.0: Integração da `PerformanceAnalysisSection` no Dashboard

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Montar a seção completa no Dashboard, integrando o filtro de período, os gráficos criados anteriormente e os cards de insights textuais.

<requirements>
- Select para filtrar período: 90, 180, 360 dias.
- Grid layout: Lado a lado (desktop) e empilhado (mobile).
- Exibir insights: "X revendedores concentram 80%" e "Maior devedor: [Nome] (R$ [Valor])".
- Esqueleto de carregamento (Skeleton/Pulse) consistente com o restante do Dashboard.
</requirements>

## Subtarefas

- [ ] 4.1 Criar `PerformanceAnalysisSection.tsx` para orquestrar o estado e layout.
- [ ] 4.2 Integrar o `Select` do `shadcn/ui` para mudar o estado de dias.
- [ ] 4.3 Implementar lógica dos textos de insight dinâmicos.
- [ ] 4.4 Adicionar a seção em `src/pages/DashboardPage.tsx`.

## Detalhes de Implementação

Referencie a seção "Arquitetura do Sistema > Visão Geral dos Componentes" na [techspec.md](techspec.md).

## Critérios de Sucesso

- A seção respeita a responsividade do layout.
- Ao mudar o filtro, tanto os gráficos quanto os textos de insight são atualizados.
- O esqueleto de carregamento aparece enquanto os dados são processados.

## Testes da Tarefa

- [ ] Teste de interação no componente para garantir que o clique no Select altera o estado.
- [ ] Verificação de layout em diferentes viewports (Mobile/Desktop).

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- [src/pages/DashboardPage.tsx](file:///home/vinicius-casarin/repos/study/easy/src/pages/DashboardPage.tsx)
- [src/components/dashboard/PerformanceAnalysisSection.tsx](file:///home/vinicius-casarin/repos/study/easy/src/components/dashboard/PerformanceAnalysisSection.tsx)
