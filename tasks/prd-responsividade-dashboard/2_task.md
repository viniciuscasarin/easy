# Tarefa 2.0: [LAYOUT] Layout Shell e Navegação Adaptativa

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Adaptar o shell principal da aplicação para suportar um menu hamburger em dispositivos móveis, escondendo a barra lateral fixa.

<requirements>
- Modificar `MainLayout.tsx` para incluir o componente `Sheet` do shadcn/ui.
- Garantir que o botão hamburger apareça apenas em telas `< 1024px`.
- Reutilizar o componente `Sidebar` dentro do menu mobile para manter consistência.
</requirements>

## Subtarefas

- [ ] 2.1 Atualizar `MainLayout.tsx` com lógica de renderização condicional.
- [ ] 2.2 Criar botão de gatilho (Menu) visível apenas em mobile.
- [ ] 2.3 Refatorar `Sidebar.tsx` se necessário para funcionar dentro do `SheetContent`.

## Detalhes de Implementação

Referencie a seção **"Navegação Shell"** na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-responsividade-dashboard/techspec.md).

## Critérios de Sucesso

- Barra lateral some em telas mobile.
- Menu hamburger funcional e acessível via toque.
- Todos os links de navegação acessíveis em ambos os modos.

## Testes da Tarefa

- [ ] Teste de unidade: Verificar visibilidade dos componentes por breakpoint.
- [ ] Teste de integração: Validar transições de rota a partir do menu mobile.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/layout/MainLayout.tsx`
- `src/components/layout/Sidebar.tsx`
