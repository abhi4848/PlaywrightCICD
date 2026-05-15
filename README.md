# Playwright CICD Project

A test automation project using Playwright for end-to-end testing.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## Running Tests

### Run all tests
```bash
npm test
```
or
```bash
npx playwright test
```

### Run tests with UI (interactive mode)
```bash
npx playwright test --ui
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

### Run a specific test file
```bash
npx playwright test PlaywrightTest/example.spec.js
```

### Debug tests
```bash
npx playwright test --debug
```

## Recording Tests

Record user interactions and generate test code automatically:
```bash
npx playwright codegen https://example.com
```

## View Test Reports

After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Project Structure

```
PlaywrightCICD/
├── PlaywrightTest/       # Test files directory
│   └── example.spec.js   # Sample test file
├── test-results/         # Test execution results
├── playwright-report/    # HTML test reports
├── package.json          # Project configuration
└── README.md            # This file
```

## Test Configuration

Tests are configured in `playwright.config.js` (if created). You can customize:
- Browsers to test
- Timeouts
- Retries
- Parallel execution
- And more

## CI/CD Integration

This project is ready for CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins, etc.).

### Example GitHub Actions workflow:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npm test
```

## Common Issues

### `Error: No tests found`
- Ensure test files are in the correct directory and named with `.spec.js` or `.test.js`
- Test file pattern: `**/*@(*test|*spec).[jt]s?(x)`

### Browsers not installed
```bash
npx playwright install
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Test Examples](https://playwright.dev/docs/intro)
- [API Reference](https://playwright.dev/docs/api/intro)
