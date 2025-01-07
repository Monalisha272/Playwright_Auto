const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('TodoMVC Automated Test with Logging', () => {
  const todoUrl = 'https://todomvc.com/examples/react/dist/';

  // Generate dates for TODO items
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  const todo1Text = `TODO 1 - ${currentDate.toISOString().split('T')[0]}`;
  const todo2Text = `TODO 2 - ${tomorrowDate.toISOString().split('T')[0]}`;

  // Ensure screenshots folder exists
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
    console.log('Created screenshots directory.');
  }

  test('TodoMVC Workflow Test', async ({ page }) => {
    console.log('Test: TodoMVC Workflow - STARTED');

    try {
      // 1. Go to TodoMVC
      await test.step('Navigate to TodoMVC', async () => {
        console.log('Step 1: Navigating to TodoMVC...');
        await page.goto(todoUrl);
        console.log('Step 1: Navigation successful.');
      });

      // 2. Validate URL
      await test.step('Validate URL', async () => {
        console.log('Step 2: Validating URL...');
        expect(page.url()).toBe(todoUrl);
        console.log('Step 2: URL validation successful.');
        await page.screenshot({ path: 'screenshots/screenshot-step2.png' });
      });

      // 3. Add TODO 1 with current date
      await test.step(`Add TODO 1: ${todo1Text}`, async () => {
        console.log(`Step 3: Adding TODO 1 (${todo1Text})...`);
        await page.fill('.new-todo', todo1Text);
        await page.press('.new-todo', 'Enter');
        console.log('Step 3: TODO 1 added successfully.');
        await page.screenshot({ path: 'screenshots/screenshot-step3.png' });
      });

      // 4. Validate TODO 1 appears in the list
      const todo1 = page.locator('.todo-list li', { hasText: todo1Text });
      await test.step('Verify TODO 1 appears in the list', async () => {
        console.log(`Step 4: Verifying TODO 1 (${todo1Text}) is visible...`);
        await expect(todo1).toBeVisible();
        console.log('Step 4: TODO 1 is visible in the list.');
        await page.screenshot({ path: 'screenshots/screenshot-step4.png' });
      });

      // 5. Add TODO 2 with tomorrow's date
      await test.step(`Add TODO 2: ${todo2Text}`, async () => {
        console.log(`Step 5: Adding TODO 2 (${todo2Text})...`);
        await page.fill('.new-todo', todo2Text);
        await page.press('.new-todo', 'Enter');
        console.log('Step 5: TODO 2 added successfully.');
        await page.screenshot({ path: 'screenshots/screenshot-step5.png' });
      });

      // 6. Mark TODO 1 as completed
      await test.step('Mark TODO 1 as completed', async () => {
        console.log(`Step 6: Marking TODO 1 (${todo1Text}) as completed...`);
        await todo1.locator('.toggle').click();
        console.log('Step 6: TODO 1 marked as completed.');
        await page.screenshot({ path: 'screenshots/screenshot-step6.png' });
      });

      // 7. Validate TODO 1 is displayed as completed
      await test.step('Verify TODO 1 is displayed as completed', async () => {
        console.log(`Step 7: Verifying TODO 1 (${todo1Text}) is marked as completed...`);
        await expect(todo1).toHaveClass(/completed/); // Check if it has the 'completed' class
        console.log('Step 7: TODO 1 is marked as completed.');
        await page.screenshot({ path: 'screenshots/screenshot-step7.png' });
      });

      // 8. Delete TODO 2
      const todo2 = page.locator('.todo-list li', { hasText: todo2Text });
      await test.step('Delete TODO 2', async () => {
        console.log(`Step 8: Deleting TODO 2 (${todo2Text})...`);
        await todo2.hover(); // Hover to make the delete button visible
        await todo2.locator('.destroy').click(); // Click the delete button
        console.log('Step 8: TODO 2 deleted successfully.');
        await page.screenshot({ path: 'screenshots/screenshot-step8.png' });
      });

      // 9. Validate TODO 2 is removed
      await test.step('Verify TODO 2 is removed', async () => {
        console.log(`Step 9: Verifying TODO 2 (${todo2Text}) is removed...`);
        await expect(todo2).not.toBeVisible();
        console.log('Step 9: TODO 2 is successfully removed.');
        await page.screenshot({ path: 'screenshots/screenshot-step9.png' });
      });

      console.log('Test: TodoMVC Workflow - COMPLETED');
    } catch (error) {
      console.error(`Test failed with error: ${error.message}`);
      throw error; // Rethrow the error to mark the test as failed
    }
  });
});
