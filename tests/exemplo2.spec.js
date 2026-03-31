import {test, expect} from '@playwright/test';

test('[@funcionando @login] Deve fazer login com sucesso no OrangeHRM', async ({page}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    await page.getByPlaceholder('Username').fill('Admin');  
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
  
    await expect(page).toHaveURL(/dashboard/);

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
 
})

test('[@funcionando @busca] Deve buscar playwright no Google e acessar Documentação', async ({page}) => {
    await page.goto('https://www.google.com/', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    try {
        const acceptButton = page.getByRole('button', { name: 'Accept all' });
        if( await acceptButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await acceptButton.click();
        }
    } catch (e) {
        console.log('Accept button not found, continuing...');
    }

    const searchInput = page.locator('textarea[name="q"]');
    await searchInput.fill('playwright');
 
    await searchInput.press('Enter');
 
    await page.waitForSelector('h3', { timeout: 10000 })
 
    const firstResult = await page.locator('h3').first();
    
    await expect(firstResult).toContainText('Playwright');
    await firstResult.click();
    
    await expect(page).toHaveURL(/playwright.dev/);
    const heading = page.locator('h1');
    await expect(heading).toHaveText('Playwright');
})