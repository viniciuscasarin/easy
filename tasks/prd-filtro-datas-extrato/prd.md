# Filtro de Intervalo de Datas no Extrato PDF do Revendedor

## Visão Geral

Atualmente, ao gerar o extrato em PDF de um revendedor, o sistema inclui **todas** as transações do histórico, sem possibilidade de delimitar um período. Isso dificulta análises pontuais — como fechar o mês, verificar um trimestre ou apresentar um período específico ao revendedor.

Esta funcionalidade permite ao usuário definir um intervalo de datas (início e fim) diretamente na página do revendedor antes de gerar o PDF, garantindo que o extrato reflita apenas as transações e o saldo do período selecionado.

---

## Objetivos

- Permitir que o usuário gere extratos PDF correspondentes a um período específico de tempo.
- O saldo devedor exibido no PDF deve ser calculado exclusivamente com base nas transações do intervalo selecionado.
- O nome do arquivo gerado deve comunicar claramente o período coberto pelo extrato.
- Manter o comportamento atual para usuários que não aplicarem filtros de data.

**Métricas de sucesso:**
- Usuário consegue gerar PDF filtrado por período sem erros.
- O PDF gerado contém apenas transações dentro do intervalo definido.
- O saldo devedor no PDF corresponde ao calculado para o período.

---

## Histórias de Usuário

- **Como** usuário que gerencia revendedores, **eu quero** filtrar o extrato por data de início e fim **para que** eu possa gerar relatórios de fechamento mensal ou trimestral.
- **Como** usuário, **eu quero** que o nome do arquivo PDF inclua as datas do período **para que** eu possa identificar facilmente os arquivos gerados.
- **Como** usuário, **eu quero** que o extrato sem filtros continue funcionando como antes **para que** meu fluxo atual não seja impactado.
- **Como** usuário, **eu quero** ser alertado caso não existam transações no período selecionado **para que** eu não gere um PDF vazio sem perceber.

---

## Funcionalidades Principais

### 1. Filtro de Datas Permanente na Página do Revendedor

Dois campos de data (início e fim) são adicionados de forma permanente à página `ResellerDetailPage`, visíveis antes do botão de gerar PDF.

**Requisitos funcionais:**

1. O sistema deve exibir um campo "Data Início" e um campo "Data Fim" na página do revendedor.
2. Ambos os campos devem ser do tipo data (`date input` ou equivalente acessível).
3. Os campos devem ser opcionais — quando ambos estiverem vazios, o comportamento é idêntico ao atual (todas as transações incluídas).
4. Quando ao menos um campo estiver preenchido, **ambos** devem ser obrigatórios para habilitar a geração do PDF.
5. O sistema deve validar que a data de início não é posterior à data de fim, exibindo mensagem de erro informativa.
6. Caso o período selecionado não contenha transações, o sistema deve exibir um alerta ao usuário e **não** gerar o PDF.

### 2. Filtragem das Transações no PDF

A geração do PDF deve aplicar o filtro de datas antes de montar o documento.

**Requisitos funcionais:**

7. O serviço de geração de PDF deve aceitar parâmetros opcionais de `dataInicio` e `dataFim`.
8. Apenas as transações cuja data (`createdAt`) esteja dentro do intervalo `[dataInicio, dataFim]` (inclusive em ambas as extremidades) devem ser incluídas no PDF.
9. O saldo devedor exibido no PDF deve ser calculado com base **exclusivamente** nas transações filtradas.
10. Quando nenhum filtro for informado, todas as transações devem ser incluídas (comportamento atual preservado).

### 3. Nome de Arquivo Amigável com Período

O nome do arquivo PDF gerado deve incluir o período de forma legível.

**Requisitos funcionais:**

11. Quando um filtro de datas for aplicado, o nome do arquivo deve seguir o padrão: `extrato_[nome-revendedor]_[DD-MM-AAAA]_a_[DD-MM-AAAA].pdf`.
12. Quando nenhum filtro for aplicado, o nome do arquivo deve seguir o padrão atual: `extrato_[nome-revendedor].pdf`.

---

## Experiência do Usuário

**Persona principal:** Gestor de vendas que acompanha o desempenho de múltiplos revendedores e precisa gerar relatórios periódicos.

**Fluxo principal (com filtro):**
1. Usuário acessa a página de detalhe de um revendedor.
2. Usuário preenche os campos "Data Início" e "Data Fim".
3. Usuário clica em "Gerar PDF".
4. Se o período não tiver transações, o sistema exibe um aviso e não gera o arquivo.
5. Caso contrário, o PDF é gerado e baixado automaticamente com nome incluindo o período.

**Fluxo secundário (sem filtro):**
1. Usuário acessa a página do revendedor sem preencher as datas.
2. Usuário clica em "Gerar PDF".
3. PDF com todas as transações é gerado normalmente (comportamento atual).

**Considerações de UI/UX:**
- Os campos de data devem estar visualmente agrupados e próximos ao botão de geração de PDF.
- Em dispositivos móveis, os campos devem ser exibidos de forma responsiva e utilizável com teclado virtual.
- Mensagens de erro de validação devem ser claras e aparecer próximas ao campo com problema.
- O alerta de "nenhuma transação no período" deve ser exibido antes de qualquer processamento.

**Acessibilidade:**
- Os campos de data devem ter labels explícitos e associados (`<label for>`).
- Mensagens de erro devem ser anunciadas por leitores de tela (`aria-live` ou equivalente).

---

## Restrições Técnicas de Alto Nível

- A solução deve ser compatível com o banco de dados local (Dexie.js/IndexedDB) e não requer chamadas a serviços externos.
- A filtragem deve ocorrer no cliente, sem impacto de performance perceptível para o volume atual de dados.
- A biblioteca de geração de PDF (jsPDF + jspdf-autotable) deve continuar sendo utilizada; não é permitida troca de biblioteca.
- Nenhuma alteração no schema do banco de dados é esperada para esta funcionalidade.

---

## Fora de Escopo

- Salvar ou persistir os filtros de data entre sessões do usuário.
- Filtrar a tabela de transações exibida na tela com base nas mesmas datas (somente o PDF é filtrado neste escopo).
- Adicionar filtros de data em outros tipos de relatório ou exportação.
- Suporte a fuso horário ou internacionalização de formatos de data além do padrão brasileiro (DD/MM/AAAA).
- Histórico de PDFs gerados ou reenvio por e-mail.
