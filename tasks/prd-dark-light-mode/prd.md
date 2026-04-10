# Documento de Requisitos de Produto (PRD) — Modo Escuro / Claro

## Visão Geral

Adicionar ao Sistema de Gestão de Revendedores um botão de alternância entre modo escuro e modo claro. A funcionalidade permite que o administrador ajuste o tema visual da aplicação de acordo com sua preferência pessoal, melhorando o conforto visual em diferentes condições de iluminação. A aplicação deve respeitar inicialmente a preferência do sistema operacional e persistir a escolha do usuário para sessões futuras.

## Objetivos

- Oferecer ao usuário controle sobre o tema visual da aplicação (claro ou escuro)
- Respeitar automaticamente a preferência de tema do sistema operacional na primeira visita
- Persistir a escolha do usuário no navegador para que seja mantida ao recarregar a página ou retornar à aplicação
- Garantir que todas as telas e componentes existentes funcionem corretamente em ambos os temas, mantendo legibilidade e contraste adequados
- **Métrica de sucesso:** Alternância de tema em < 100ms sem flash de conteúdo sem estilo (FOUC)

## Histórias de Usuário

- Como administrador, eu quero que o sistema respeite a preferência de tema do meu sistema operacional para que a interface já esteja confortável ao abrir pela primeira vez
- Como administrador, eu quero clicar em um botão no header para alternar entre modo claro e escuro para adaptar a interface à minha preferência visual
- Como administrador, eu quero que minha escolha de tema seja lembrada para que ao recarregar a página o tema permaneça o mesmo
- Como administrador, eu quero que dívidas e pagamentos continuem visualmente distintos em ambos os temas para não perder informação contextual

## Funcionalidades Principais

### F7 — Alternância de Tema (Dark/Light Mode)

Botão de alternância no header da aplicação que permite trocar entre modo claro e modo escuro, utilizando o mecanismo nativo de CSS variables do Shadcn UI.

#### Requisitos Funcionais

- **RF7.1** — Exibir um botão de ícone no header da aplicação para alternar o tema
- **RF7.2** — Usar ícone de **sol** (☀️) quando estiver no modo escuro (indicando "mudar para claro") e ícone de **lua** (🌙) quando estiver no modo claro (indicando "mudar para escuro"), utilizando ícones do Lucide React
- **RF7.3** — Na primeira visita (sem preferência salva), o tema inicial deve ser determinado pela preferência do sistema operacional via `prefers-color-scheme`
- **RF7.4** — Ao clicar no botão, o tema deve alternar imediatamente entre claro e escuro
- **RF7.5** — A preferência do usuário deve ser persistida no `localStorage` do navegador
- **RF7.6** — Ao recarregar a página ou retornar à aplicação, o tema salvo deve ser aplicado automaticamente
- **RF7.7** — Todos os componentes Shadcn UI existentes devem se adaptar corretamente ao tema via CSS variables (`:root` para claro, `.dark` para escuro)
- **RF7.8** — Definir variações de cor para os indicadores contextuais em cada tema:
  - **Modo claro:** Dívidas em vermelho (tom padrão), pagamentos em verde (tom padrão)
  - **Modo escuro:** Dívidas em vermelho ajustado (tom mais claro/vibrante para fundo escuro), pagamentos em verde ajustado (tom mais claro/vibrante para fundo escuro)
- **RF7.9** — A transição entre temas não deve causar flash de conteúdo sem estilo (FOUC)

## Experiência do Usuário

- **Persona:** Administrador/Dono de negócio (mesma persona do sistema existente)
- **Fluxo principal:** O botão de tema fica sempre visível no header → Administrador clica no ícone → O tema alterna instantaneamente → A escolha é persistida
- **UI/UX:**
  - Botão posicionado no **header** da aplicação, alinhado à direita
  - Ícone `Sun` (Lucide) no modo escuro, ícone `Moon` (Lucide) no modo claro
  - Transição suave entre temas (sem animação de cores para evitar FOUC, mas com feedback visual no ícone)
  - Tooltip ou `aria-label` descritivo (ex: "Alternar para modo escuro" / "Alternar para modo claro")
- **Acessibilidade:**
  - Contraste mínimo WCAG AA em ambos os temas
  - `aria-label` dinâmico no botão de toggle
  - Foco visível no botão via teclado

## Restrições Técnicas de Alto Nível

- Utilizar o sistema de CSS variables nativo do Shadcn UI (`:root` e `.dark`)
- Persistência via `localStorage` (consistente com a abordagem client-side do sistema)
- Componente de ThemeProvider deve envolver a aplicação no nível raiz
- Evitar uso de classes `dark:` do Tailwind diretamente nos componentes — priorizar tokens semânticos
- Compatível com a stack existente: React (Vite), TypeScript, Tailwind CSS, Shadcn UI, Lucide React

## Fora de Escopo

- Múltiplos temas customizáveis além de claro e escuro
- Configurações avançadas de acessibilidade (alto contraste, tamanho de fonte, modo daltônico)
- Sincronização de preferência de tema entre dispositivos
- Animações elaboradas na transição de tema
- Modo automático baseado em horário do dia
