// @ts-check
import { test, expect } from '@playwright/test';


test('displays dogs in the list', async ({ page }) => {
  await page.goto('http://localhost:3000/dogs');
  const dogsList=page.getByTestId("dogsList");
  await expect(dogsList).toBeVisible();
  expect(await page.locator('ul > li').count()).toBeGreaterThan(0);
  
});

test('creating a dog',async ({page})=>{
    await page.goto('http://localhost:3000/dogs')
    const name=page.getByPlaceholder("name");
    const nick=page.getByPlaceholder("nick");
    const age=page.getByPlaceholder("age");
    const btn=page.getByTestId("save");
    await name.fill("tester");
    await nick.fill("puppyy");
    await age.fill("23");
    await btn.click();

    await page.waitForURL('**/dogs');
    await expect(page.getByTestId("dogsList")).toContainText('tester');

}) 

test('deleting the tester',async({page})=>{
    await page.goto('http://localhost:3000/dogs')
    const testerRow = page.locator('[data-testid="dog-row"]', { hasText: 'tester' });
    await testerRow.getByTestId('delete').click();
    await expect(page.getByTestId("dogsList")).not.toContainText('tester')

})
