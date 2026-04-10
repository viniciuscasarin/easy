# PRD - Busca Global (Command Center)

## Visão Geral

O "Easy Command Center" é uma barra de busca global e centro de comando acessível de qualquer lugar da aplicação. Ele resolve o problema de lentidão na navegação entre diferentes telas e na execução de ações repetitivas, fornecendo uma interface única e rápida para encontrar dados (revendedores e itens) e disparar comandos operacionais. É valioso para usuários administradores que lidam com grandes volumes de dados e precisam de agilidade no dia a dia.

## Objetivos

- Reduzir o tempo médio de navegação entre a tela inicial e a ficha de um revendedor ou edição de item.
- Centralizar ações comuns (cadastro de itens, novos lançamentos) em um único atalho de teclado.
- Proporcionar uma experiência de busca instantânea (< 50ms) independente do volume de dados local.
- **Métricas principais**: Frequência de uso do atalho Ctrl+K vs. navegação manual; Taxa de sucesso na primeira busca.

## Histórias de Usuário

- Como administrador, eu quero usar um atalho de teclado (Ctrl+K) para abrir a busca rapidamente, sem tirar as mãos do teclado.
- Como administrador, eu quero ver o saldo atual de um revendedor diretamente nos resultados da busca, para que eu não precise navegar até a ficha dele apenas para conferir uma dívida.
- Como administrador, eu quero disparar o cadastro de um novo pedido diretamente do centro de comando, para agilizar o processo de venda.
- Como administrador, eu quero receber sugestões de criação ("Cadastrar [termo]") quando o que eu procuro não existe, para manter o fluxo de trabalho sem interrupções.

## Funcionalidades Principais

1.  **Interface de Diálogo (CommandDialog)**:
    - Janela flutuante centralizada que sobrepõe qualquer conteúdo da tela.
    - Acionada pelo atalho `Ctrl+K` ou `Cmd+K`.
    
2.  **Busca em Tempo Real (Filtragem Dinâmica)**:
    - Consulta instantânea via Dexie.js em duas categorias principais:
        - **Revendedores**: Exibe Nome e Saldo. Clique navega para `ResellerDetailPage`.
        - **Itens**: Exibe Nome e Preço. Clique abre modal de edição/visualização.
    - **Requisito 30.1**: Limitar a exibição a no máximo 5 resultados por categoria.
    
3.  **Sugestões Inteligentes (Estado Vazio)**:
    - Quando o campo de busca estiver vazio, exibir:
        - Os 3 revendedores acessados mais recentemente.
        - Os 2 itens mais recentemente cadastrados/vendidos.
    
4.  **Sistema de Ações Rápidas**:
    - Seção fixa de "Ações" com:
        - "Cadastrar Novo Item": Abre formulário de criação de produtos.
        - "Novo Lançamento: Pedido": Abre tela de lançamento com tipo "Pedido".
        - "Novo Lançamento: Pagamento/Sinal": Abre tela de lançamento com tipo "Pagamento".

5.  **Tratamento de Resultados Não Encontrados**:
    - Se a busca não retornar dados, sugerir ações contextuais dinâmicas:
        - "Cadastrar revendedor: [Input do usuário]"
        - "Cadastrar produto: [Input do usuário]"

## Experiência do Usuário

- **UI/UX**: Utilizar o componente `Command` do Shadcn UI para manter a consistência visual.
- **Ícones**: Utilizar Lucide React para identificação visual rápida:
    - Usuário (`User`) para revendedores.
    - Etiqueta (`Tag`) para itens.
    - Raio (`Zap`) para ações rápidas.
- **Navegação**: Suporte total a navegação por setas do teclado e tecla `Enter` para confirmação.

## Restrições Técnicas de Alto Nível

- **Performance**: A integração com o banco local Dexie.js é mandatória para garantir a instantaneidade dos resultados.
- **Persistência**: O histórico de "Revendedores Recentes" deve ser mantido localmente (localStorage ou tabela no Dexie).
- **Consistência**: O estado do Header deve refletir a presença da busca de forma discreta.

## Fora de Escopo

- Pesquisa de transações específicas por valor ou data diretamente na busca global.
- Configurações do sistema ou perfil do usuário nos resultados da busca.
- Funcionalidades de chat ou ajuda integradas.
