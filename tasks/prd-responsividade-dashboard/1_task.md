# Tarefa 1.0: [INFRA] Configuração de Diálogos Responsivos

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Esta tarefa foca na infraestrutura necessária para suportar diálogos que se adaptam entre modais centralizados (Desktop) e gavetas/drawers (Mobile).

<requirements>
- Instalar a biblioteca `vaul`.
- Criar o componente `ResponsiveDialog` conforme interface na `techspec.md`.
- Unificar a API de modais para que o sistema escolha automaticamente entre `Dialog` e `Drawer` baseado no breakpoint `lg` (1024px).
</requirements>

## Subtarefas

- [ ] 1.1 Executar `npm install vaul` para suporte a drawers.
- [ ] 1.2 Implementar `src/components/ui/ResponsiveDialog.tsx`.
- [ ] 1.3 Garantir integração com o sistema de temas do `shadcn/ui`.

## Detalhes de Implementação

Referencie a seção **"Wrapper de Diálogo Responsivo"** na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-responsividade-dashboard/techspec.md).

## Critérios de Sucesso

- Componente `ResponsiveDialog` funcional.
- Mudança automática de visual baseado na largura da tela.
- Sem erros de TypeScript na interface do componente.

## Testes da Tarefa

- [ ] Teste de unidade: Verificar troca de renderização baseado em `window.innerWidth`.
- [ ] Teste de integração: Validar que o conteúdo do diálogo é preservado na troca.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/ui/dialog.tsx`
- `src/components/ui/ResponsiveDialog.tsx` [NEW]
