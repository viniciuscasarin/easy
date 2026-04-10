# Tarefa 5.0: Estado Vazio e Sugestões Dinâmicas

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementação do tratamento de resultados não encontrados e sugestões de criação baseadas no input do usuário.

<requirements>
- Exibição de "Nenhum resultado encontrado para '[termo]'" quando não houver correspondências.
- Sugestão dinâmica "Cadastrar revendedor: '[termo]'" navegando para o formulário de criação de revendedor com o nome pré-preenchido.
- Sugestão dinâmica "Cadastrar produto: '[termo]'" navegando para o cadastro de itens.
- Garantir que as sugestões apareçam apenas quando há um termo de busca.
</requirements>

## Subtarefas

- [ ] 5.1 Implementar o componente `CommandEmpty` customizado para exibir sugestões dinâmicas.
- [ ] 5.2 Configurar navegação com passagem de estado ou query params para `/resellers` e `/items` para preencher o nome.
- [ ] 5.3 Testar o fluxo de transição entre o estado de busca com resultados e o estado sem resultados.

## Detalhes de Implementação

- Ver seção "Histórias de Usuário - Sugestões de criação" no [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-busca-global/prd.md).
- Utilizar a propriedade `search` ou estado do input no `CommandCenter` para gerar os links dinâmicos.

## Critérios de Sucesso

- Usuário consegue iniciar o fluxo de cadastro de um item inexistente em 1 clique.
- Interface amigável para estados sem resultados.

## Testes da Tarefa

- [ ] Teste de unidade: Verificar se a string de busca é capturada corretamente para as sugestões.
- [ ] Teste de integração: Verificar se ao clicar em "Cadastrar [termo]", o redirecionamento ocorre para a URL correta.

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/components/search/CommandCenter.tsx`
- `src/App.tsx` (Rotas para receber params se necessário)
