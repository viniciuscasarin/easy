import { test, expect } from '@playwright/test';

test.describe('Global Search (Command Center)', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the app (base path is /easy/)
        await page.goto('/easy/');
        // Wait for the app to load
        await expect(page.locator('body')).toBeVisible();
    });

    test('should open command center with Ctrl+K', async ({ page }) => {
        await page.keyboard.press('Control+k');
        const dialog = page.getByRole('dialog');
        await expect(dialog).toBeVisible();
        await expect(page.getByPlaceholder('Digite um comando ou pesquise...')).toBeFocused();
    });

    test('should search and navigate to a reseller', async ({ page }) => {
        // 1. Create a reseller first to have something to search
        await page.goto('/easy/resellers');
        await page.getByRole('button', { name: 'Novo Revendedor' }).click();
        await page.getByPlaceholder('Nome do revendedor').fill('Test Reseller');
        await page.getByRole('button', { name: 'Salvar' }).click();

        // Wait for creation
        await expect(page.getByText('Test Reseller')).toBeVisible();

        // 2. Open Search
        await page.keyboard.press('Control+k');
        const input = page.getByPlaceholder('Digite um comando ou pesquise...');
        await input.fill('Test');

        // 3. Wait for results and navigate
        const resultItem = page.getByRole('option', { name: 'Test Reseller' });
        await expect(resultItem).toBeVisible();

        // Navigate with keyboard
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        // 4. Verify navigation to detail page
        await expect(page).toHaveURL(/\/resellers\/\d+/);
        await expect(page.locator('h1')).toContainText('Test Reseller');
    });

    test('should show suggestions when no result is found', async ({ page }) => {
        await page.keyboard.press('Control+k');
        await page.getByPlaceholder('Digite um comando ou pesquise...').fill('NonExistentThing');

        await expect(page.getByText('Nenhum resultado encontrado para "NonExistentThing"')).toBeVisible();
        await expect(page.getByText('Cadastrar revendedor: "NonExistentThing"')).toBeVisible();
    });

    test('should open command center via mobile trigger', async ({ page }) => {
        // Set viewport to mobile
        await page.setViewportSize({ width: 375, height: 667 });

        // The mobile header should be visible
        const searchButton = page.locator('header.lg\\:hidden').getByRole('button').filter({ has: page.locator('svg') }).nth(1); // Second button is search (first is menu)
        // Actually, in MainLayout:
        // <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
        //   <Search size={20} />
        // </Button>

        await searchButton.click();
        await expect(page.getByRole('dialog')).toBeVisible();
    });
});
