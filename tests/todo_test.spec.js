const { test, expect } = require('@playwright/test');

test.describe('TodoMVC Automated Test', () => {
  const todoUrl = 'https://todomvc.com/examples/react/dist/';

  // Generate dates for TODO items
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  const todo1Text = `TODO 1 - ${currentDate.toISOString().split('T')[0]}`;
  const todo2Text = `TODO 2 - ${tomorrowDate.toISOString().split('T')[0]}`;

  test('TodoMVC Workflow Test', async ({page }) => {
    // 1. Go to TodoMVC
    await test.step('Navigate to TodoMVC', async () => {
      await page.goto(todoUrl);
    });

    // 2. Validate URL
    await test.step('Validate URL', async () => {
      expect(page.url()).toBe(todoUrl);
    });

    // 3. Add TODO 1 with current date
    await test.step(`Add TODO 1: ${todo1Text}`, async () => {
      await page.fill('.new-todo', todo1Text);
      await page.press('.new-todo', 'Enter');
    });

    // 4. Verify TODO 1 appears in the list
    const todo1 = page.locator('.todo-list li', { hasText: todo1Text });
    await test.step('Verify TODO 1 appears in the list', async () => {
      await expect(todo1).toBeVisible();
    });

    // 5. Add TODO 2 with tomorrow's date
    await test.step(`Add TODO 2: ${todo2Text}`, async () => {
      await page.fill('.new-todo', todo2Text);
      await page.press('.new-todo', 'Enter');
    });

    // 6. Mark TODO 1 as completed
    await test.step('Mark TODO 1 as completed', async () => {
      await todo1.locator('.toggle').click();
    });

    // 7. Verify TODO 1 is displayed as completed
    await test.step('Verify TODO 1 is displayed as completed', async () => {
      await expect(todo1).toHaveClass(/completed/); // Check if it has the 'completed' class
    });

    // 8. Delete TODO 2
    const todo2 = page.locator('.todo-list li', { hasText: todo2Text });
    await test.step('Delete TODO 2', async () => {
      await todo2.hover(); // Hover to make the delete button visible
      await todo2.locator('.destroy').click(); // Click the delete button
    });

    // 9. Verify TODO 2 is removed
    await test.step('Verify TODO 2 is removed', async () => {
      await expect(todo2).not.toBeVisible();
    });
  });
});
