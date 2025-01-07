import { test, expect } from '@playwright/test';

let context ;
let page;
test.beforeAll(async ({browser})=>
{
   
    context = await browser.newContext();
    await context.tracing.start({
        snapshots:true, screenshots:true
    })
    page = await page.newContext()
})
test.afterAll(async()=>{
await context.tracing.stop({path:'test_2.zip'})
})
test('test', async ({ }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('TODO 1 - Mon 6 Jan');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Todo 2- Tue 7 Jan');
  await page.getByTestId('text-input').press('Enter');
  await page.locator('div').filter({ hasText: 'TODO 1 - Mon 6 Jan' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('button', { name: '×' }).click();
});