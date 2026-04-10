import { test, expect } from '@playwright/test';

test.describe('Performance Analysis Section', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/easy/');
    });

    test('should display the performance analysis section', async ({ page }) => {
        await expect(page.getByText('Análise de Performance')).toBeVisible();
        await expect(page.getByText('Análise de Pareto (80/20)')).toBeVisible();
        await expect(page.getByText('Ranking de Inadimplência')).toBeVisible();
    });

    test('should change period filter and update insights', async ({ page }) => {
        // Initial state (90 days)
        await expect(page.getByText('Janela:')).toBeVisible();

        // Open select
        await page.getByRole('combobox').click();

        // Select 180 days
        await page.getByLabel('Últimos 180 dias').click();

        // Check if insights cards are still there (they should update, but at least exist)
        await expect(page.getByText('Concentração de Vendas')).toBeVisible();
    });

    test('should show pareto chart with corect axes', async ({ page }) => {
        await expect(page.getByText('Faturamento')).toBeVisible();
        await expect(page.getByText('% Acumulado')).toBeVisible();
    });

    test('should show ranking of debtors', async ({ page }) => {
        await expect(page.getByText('Saldo Devedor')).toBeVisible();
    });
});
