# Eklipse.gg Test Automation

Playwright + TypeScript UI automation framework for Eklipse.gg using the Page Object Model pattern.

## Structure

- `playwright.config.ts` contains Playwright test configuration.
- `src/pages` contains Page Object Model classes.
- `src/data` contains test data.
- `src/config` contains environment helpers.
- `tests` contains the test specifications.

## Implemented Test Cases

- `TC-LP-001`: Verify public landing page
- `TC-AUTH-002`: Verify invalid email login shows a clear error
- `TC-AUTH-003`: Verify valid email login redirects to Home
- `TC-HOME-002`: Verify not connected streaming account state
- `TC-SET-002`: Verify Profile section and can edit the name
- `TC-TT-002`: Verify Twitch or Kick clip URL validation

## Setup

```bash
npm install
npx playwright install chromium
```

Copy `.env.example` to `.env` and update `LANDING_URL`, `LOGIN_URL`, `EMAIL`, and `PASSWORD`.

## Run Tests

```bash
npm run test
```

## Open Report

```bash
npm run report
```
