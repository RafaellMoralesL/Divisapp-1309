import { expect, test } from '@playwright/test';

test.describe('DivisApp', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('muestra el título y ningún resultado antes de calcular', async ({ page }) => {
    await expect(page.getByText('DivisApp 25001309')).toBeVisible();
    await expect(page.getByText('Resultado de la conversión:')).toHaveCount(0);
  });

  test('convierte 800 quetzales en 100 dólares', async ({ page }) => {
    await page.locator('ion-input input').fill('800');
    await page.getByRole('button', { name: 'Calcular Conversión' }).click();
    await expect(page.locator('h2')).toHaveText('$100.00 Dólares');
  });

  test('redondea el resultado a dos decimales', async ({ page }) => {
    await page.locator('ion-input input').fill('100');
    await page.getByRole('button', { name: 'Calcular Conversión' }).click();
    await expect(page.locator('h2')).toHaveText('$12.50 Dólares');
  });
});
