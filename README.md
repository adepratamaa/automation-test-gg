# Test Automation

Playwright + TypeScript UI automation framework

## Prerequisites

- Node.js 20 or newer
- npm
- Git

## Clone Repository

```bash
git clone https://github.com/adepratamaa/automation-test-gg.git
cd automation-test-gg
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browser

```bash
npx playwright install chromium
```

## Setup Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Update `.env` with your test account:

```bash
LANDING_URL=https://eklipse.gg/
LOGIN_URL=https://app.eklipse.gg/login
EMAIL=your-email@example.com
PASSWORD=your-password
```

## Run Tests

Run all tests:

```bash
npm run test
```

Run tests with browser visible:

```bash
npm run test:headed
```

Run one test file:

```bash
npx playwright test tests/landing.spec.ts --browser=chromium
```

## Open Playwright Report

```bash
npm run report
```

## Project Structure

- `playwright.config.ts` contains Playwright test configuration.
- `src/pages` contains Page Object Model classes.
- `src/config` contains environment helpers.
- `tests` contains the test specifications.
- `.github/workflows/playwright.yaml` contains the GitHub Actions workflow.

## Implemented Test Cases

- `TC-LP-001`: Verify public landing page
- `TC-AUTH-002`: Verify invalid email login shows a clear error
- `TC-AUTH-003`: Verify valid email login redirects to Home
- `TC-HOME-002`: Verify not connected streaming account state
- `TC-SET-002`: Verify Profile section and can edit the name
- `TC-TT-002`: Verify Twitch or Kick clip URL validation

## GitHub Actions Setup

Before running the workflow in GitHub Actions, add these repository secrets:

- `EMAIL`
- `PASSWORD`
- `LANDING_URL`
- `LOGIN_URL`

GitHub Actions will install dependencies, install Chromium, run the Playwright tests, and upload the Playwright HTML report as an artifact.
