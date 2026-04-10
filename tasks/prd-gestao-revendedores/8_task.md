# Tarefa 8.0: Importação e Exportação de Dados (Backup JSON)

<critical>Ler os arquivos de prd.md e techspec.md desta pasta, se você não ler esses arquivos sua tarefa será invalidada</critical>

## Visão Geral

Implementar funcionalidade de exportação e importação do estado completo da aplicação em formato JSON, permitindo backup e portabilidade de dados entre computadores.

<requirements>
- Botão "Exportar" que gera e baixa um arquivo JSON com todos os dados (itens, revendedores, movimentações)
- Input de arquivo "Importar" que aceita um arquivo JSON e restaura os dados
- Validação do arquivo importado (formato correto, campos obrigatórios)
- Confirmação antes de importar (aviso que dados atuais serão substituídos)
- Feedback de sucesso/erro após operação
- Nome do arquivo exportado com timestamp (ex: `backup-2024-01-15.json`)
</requirements>

## Subtarefas

- [ ] 8.1 Criar `src/services/backupService.ts` — funções `exportData()` e `importData(file)`
- [ ] 8.2 Implementar `exportData()`: ler todas as tabelas do Dexie, serializar em JSON, trigger download
- [ ] 8.3 Implementar `importData(file)`: ler arquivo, validar estrutura, limpar banco, inserir dados
- [ ] 8.4 Criar `src/components/backup/ImportExport.tsx` — botões de exportar e input de importar
- [ ] 8.5 Implementar `src/pages/BackupPage.tsx` — page com instruções e componente ImportExport
- [ ] 8.6 Adicionar Dialog de confirmação antes de importar
- [ ] 8.7 Adicionar validação do JSON importado (verificar que contém items, resellers, transactions)
- [ ] 8.8 Adicionar feedback visual (toast de sucesso/erro)

## Detalhes de Implementação

Consultar seção **F6 — Importação e Exportação** em [prd.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/prd.md) e **Services** em [techspec.md](file:///home/vinicius-casarin/repos/study/easy/tasks/prd-gestao-revendedores/techspec.md).

**Estrutura do JSON de backup:**
```json
{
  "version": 1,
  "exportedAt": "2024-01-15T10:00:00Z",
  "data": {
    "items": [...],
    "resellers": [...],
    "transactions": [...]
  }
}
```

## Critérios de Sucesso

- Exportação gera arquivo JSON válido com todos os dados
- Importação restaura todos os dados corretamente
- Dados inválidos são rejeitados com mensagem de erro clara
- Confirmação previne importação acidental
- Dados são consistentes após ciclo export → import

## Testes da Tarefa

- [ ] Testes de unidade: `exportData()` gera JSON com estrutura correta
- [ ] Testes de unidade: `importData()` rejeita JSON inválido
- [ ] Testes de unidade: validação de estrutura do arquivo
- [ ] Testes de integração: ciclo completo export → limpar → import → verificar integridade dos dados

<critical>SEMPRE CRIE E EXECUTE OS TESTES DA TAREFA ANTES DE CONSIDERÁ-LA FINALIZADA</critical>

## Arquivos relevantes
- `src/pages/BackupPage.tsx`
- `src/components/backup/ImportExport.tsx`
- `src/services/backupService.ts`
- `src/db/database.ts`
