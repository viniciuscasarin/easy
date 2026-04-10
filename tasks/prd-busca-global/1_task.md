# Tarefa 1.0: Infraestrutura e Componentes UI

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Instalação das dependências necessárias e criação da estrutura básica do `CommandCenter` utilizando Shadcn UI e `cmdk`.

<requirements>
- Dependência `cmdk` instalada.
- Componente `Command` do Shadcn UI instalado em `@/components/ui/command`.
- Componente `CommandCenter.tsx` criado em `src/components/search/` (esqueleto inicial).
- Estilização básica com Lucide React (Ícones: User, Tag, Zap).
</requirements>

## Subtarefas

- [ ] 1.1 Instalar dependência `cmdk`.
- [ ] 1.2 Instalar componente Shadcn `Command` via CLI.
- [ ] 1.3 Criar diretório `src/components/search/`.
- [ ] 1.4 Implementar esqueleto do `CommandCenter.tsx` com `CommandDialog`.
- [ ] 1.5 Validar renderização manual do diálogo (temporário).

## Detalhes de Implementação

- Utilizar o componente `CommandDialog` como base conforme seção "Arquitetura do Sistema" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-busca-global/techspec.md).
- Garantir que o diálogo suporte os grupos de resultados definidos no PRD (Revendedores, Itens, Ações).

## Critérios de Sucesso

- Diálogo de comando abrindo e fechando via estado controlado.
- Ícones Lucide React renderizando corretamente.
- Estrutura de arquivos seguindo o padrão do projeto.

## Testes da Tarefa

- [ ] Teste de unidade: Verificar se `CommandCenter` renderiza os componentes `CommandInput` e `CommandList`.
- [ ] Teste de integração: Verificar se o `CommandDialog` é montado no DOM quando o estado de abertura for verdadeiro.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/search/CommandCenter.tsx`
- `src/components/ui/command.tsx`
- `package.json`
