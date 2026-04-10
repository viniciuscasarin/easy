# Tarefa 1.0: Configuração do Caminho Base (Vite & Router)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Ajustar a configuração do Vite e o basename do React Router para que a aplicação funcione corretamente quando hospedada na subpasta `/Easy/` do GitHub Pages.

<requirements>
- O `base` no `vite.config.ts` deve ser `/Easy/`.
- O `basename` no `BrowserRouter` (em `src/App.tsx`) deve ser `/Easy/`.
- A aplicação deve continuar funcionando localmente.
</requirements>

## Subtarefas

- [ ] 1.1 Modificar `vite.config.ts` para incluir a propriedade `base: '/Easy/'`.
- [ ] 1.2 Modificar `src/App.tsx` para incluir `basename="/Easy/"` no componente de roteamento.
- [ ] 1.3 Executar build local para validar caminhos gerados.

## Detalhes de Implementação

Consulte a seção "Design de Implementação" na [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-deploy-github-pages/techspec.md).

## Critérios de Sucesso

- O arquivo `dist/index.html` gerado deve referenciar assets com o prefixo `/Easy/`.
- O roteamento via React Router deve considerar `/Easy/` como raiz.

## Testes da Tarefa

- [ ] Validar build: `npm run build` deve completar sem erros.
- [ ] Teste de fumaça: Abrir `dist/index.html` e verificar se os scripts/estilos apontam para caminhos corretos (mesmo que não carreguem localmente sem servidor).

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- [vite.config.ts](file:///home/vinicius-casarin/repos/study/easy/vite.config.ts)
- [src/App.tsx](file:///home/vinicius-casarin/repos/study/easy/src/App.tsx)
