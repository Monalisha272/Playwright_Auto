const{test, expect} = require('@playwright/test')

test('Test', async({page, context})=>{

    await page.goto('https://todomvc.com/examples/react/dist/')

    await expect(page).toHaveTitle('TodoMVC: React')
    await page.pause()
    //using page object property 
    await page.click('id=todo-input')
    await page.locator('id=todo-input').fill('Todo1--')
    await page.getByTestId('id=todo-input').press('Enter')

    //using page selector
await page.locator('#root > main')
})