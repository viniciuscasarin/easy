import { test, expect } from '@playwright/test';

test.describe('Filtro de Datas no Extrato PDF do Revendedor', () => {
    let resellerUrl: string;

    test.beforeEach(async ({ page }) => {
        // Criar um revendedor com uma transação para usar nos testes
        await page.goto('/easy/resellers');
        await page.getByRole('button', { name: 'Novo Revendedor' }).click();
        await page.getByPlaceholder('Nome do revendedor').fill('Revendedor Teste PDF');
        await page.getByRole('button', { name: 'Salvar' }).click();
        await expect(page.getByText('Revendedor Teste PDF')).toBeVisible();

        // Navegar para a ficha do revendedor
        await page.getByText('Revendedor Teste PDF').click();
        resellerUrl = page.url();
        await expect(page.getByText('Ficha do Revendedor')).toBeVisible();
    });

    test('botão Gerar PDF deve estar desabilitado quando apenas Data Início é preenchida', async ({ page }) => {
        await page.goto(resellerUrl);

        await page.getByLabel('Data Início').fill('2025-01-01');

        const pdfButton = page.getByRole('button', { name: 'Gerar PDF' });
        await expect(pdfButton).toBeDisabled();
    });

    test('botão Gerar PDF deve estar desabilitado quando apenas Data Fim é preenchida', async ({ page }) => {
        await page.goto(resellerUrl);

        await page.getByLabel('Data Fim').fill('2025-03-31');

        const pdfButton = page.getByRole('button', { name: 'Gerar PDF' });
        await expect(pdfButton).toBeDisabled();
    });

    test('botão Gerar PDF deve estar habilitado quando ambas as datas são preenchidas', async ({ page }) => {
        await page.goto(resellerUrl);

        await page.getByLabel('Data Início').fill('2025-01-01');
        await page.getByLabel('Data Fim').fill('2025-03-31');

        const pdfButton = page.getByRole('button', { name: 'Gerar PDF' });
        await expect(pdfButton).toBeEnabled();
    });

    test('deve exibir toast de erro quando Data Fim é anterior a Data Início', async ({ page }) => {
        await page.goto(resellerUrl);

        await page.getByLabel('Data Início').fill('2025-06-01');
        await page.getByLabel('Data Fim').fill('2025-01-01');

        await page.getByRole('button', { name: 'Gerar PDF' }).click();

        await expect(page.locator('[data-sonner-toast]')).toBeVisible();
        await expect(page.locator('[data-sonner-toast]')).toContainText('data de início não pode ser posterior');
    });

    test('deve exibir toast de aviso quando não há transações no período', async ({ page }) => {
        await page.goto(resellerUrl);

        // Usar um período antigo onde o revendedor recém-criado não tem transações
        await page.getByLabel('Data Início').fill('2020-01-01');
        await page.getByLabel('Data Fim').fill('2020-12-31');

        await page.getByRole('button', { name: 'Gerar PDF' }).click();

        await expect(page.locator('[data-sonner-toast]')).toBeVisible();
        await expect(page.locator('[data-sonner-toast]')).toContainText('Nenhuma transação encontrada');
    });
});
