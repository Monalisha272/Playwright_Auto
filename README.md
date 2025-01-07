# Playwright_Auto
TodoMVC Automated Test Suite
Overview
This repository contains an automated test suite for the TodoMVC application using Playwright in JavaScript. 
Features
	•	Navigates to the TodoMVC application.
	•	Validates the correct URL.
	•	Adds TODO items with dynamic dates.
	•	Verifies the presence of TODO items.
	•	Marks a TODO item as completed.
	•	Validates completed items have a strike-through style.
	•	Deletes a TODO item and verifies its removal.
	•	Captures screenshots for each step.
	•	Supports video recording of test executions.

Prerequisites
	•	Node.js (version 16 or later)
	•	npm 
Setup
	1	Clone this repository:git clone https://github.com/Monalisha272/Playwright_Auto.git
	2	Navigate to the project directory:cd todomvc-playwright-test
	3	Install dependencies:npm install
	4	Ensure Playwright browsers are installed:npx playwright install

Test Execution

npx playwright test

View Test Results with Screenshots and Videos
After running the tests, detailed reports, including screenshots and videos, will be available in the test-results/directory.
Example:
To view screenshots:
ls screenshots/

Example logs:
Navigating to TodoMVC URL: https://todomvc.com/examples/react/dist/
Adding TODO 1: TODO 1 - 2024-01-07
Verifying TODO 1 is visible in the list.
Marking TODO 1 as completed.
Deleting TODO 2: TODO 2 - 2024-01-08
Configuration
Video Recording
Video recording is enabled by modifying the playwright.config.js file 

Screenshots
Screenshots are saved in the screenshots/ directory, created dynamically during execution.

Allure Report:
Modify playwright.config.js file in your project root directory. 
Execute the test with the following command:
npx playwright test --reporter=line,allure-playwright

To view and generate Allure report execute the following command:
npx allure generate ./allure-results --clean
npx allure open

Notes
	•	The tests are designed for the React implementation of TodoMVC.
	•	Make sure the screenshots directory exists or is created automatically before running tests.
	•	Test data uses dynamic date generation, ensuring relevance across different execution times.
	•	Logs provide visibility into test execution and make debugging easier.


