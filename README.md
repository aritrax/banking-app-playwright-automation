# Banking Application - Playwright Automation

## 📌 Project Overview

This project is an end-to-end test automation framework built using **Playwright with TypeScript** for a banking web application.

The framework follows the **Page Object Model (POM)** design pattern and covers functional, positive, negative, validation, filtering, sorting, pagination, and transaction scenarios.

The project covers **8 major modules with 71 test scenarios**.

---

## 🛠️ Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)
- Playwright Fixtures
- Playwright Test Runner
- Allure Report
- Playwright HTML Report
- Git & GitHub

---

## 📂 Project Structure

```text
banking-app-playwright-automation/
│
├── .github/
│
├── fixtures/
│   └── testFixtures.ts
│
├── logindata/
│
├── pageobject/
│   ├── AccountPage.ts
│   ├── DashBoard.ts
│   ├── LoanPage.ts
│   ├── LoginPage.ts
│   ├── PayBillPage.ts
│   ├── POManager.ts
│   ├── SendMoneyPage.ts
│   ├── TransactionPage.ts
│   └── TransferPage.ts
│
├── tests/
│   ├── 01_LoginPageTest.spec.ts
│   ├── 02_DashBoardTest.spec.ts
│   ├── 03_AccountPageTest.spec.ts
│   ├── 04_TransferPageTest.spec.ts
│   ├── 05_SendMoneyPageTest.spec.ts
│   ├── 06_PayBillPageTest.spec.ts
│   ├── 07_TransactionPageTest.spec.ts
│   └── 08_LoanPageTest.spec.ts
│
├── playwright-report/
├── test-results/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# 🧪 Test Coverage

## 🔐 Login Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| LOGIN-001 | Login with valid standard user | `@smoke @regression` |
| LOGIN-002 | Login with invalid username | `@regression` |
| LOGIN-003 | Login with invalid password | `@regression` |
| LOGIN-004 | Login with locked user | `@smoke @regression` |
| LOGIN-005 | Login with frozen user | `@regression` |
| LOGIN-006 | Login with admin user | `@regression` |
| LOGIN-007 | Login with empty username | `@regression` |
| LOGIN-008 | Login with empty password | `@regression` |

### Coverage

- Valid login
- Invalid credentials
- Locked user
- Frozen user
- Admin login
- Empty field validation
- Login page navigation and error handling

---

## 🏠 Dashboard Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| DASH-001 | Verify dashboard loads after successful login | `@smoke @regression` |
| DASH-002 | Verify Total Net Worth is displayed | `@smoke @regression` |
| DASH-003 | Verify Transfer Money quick action | `@smoke @regression` |
| DASH-004 | Verify Send Money quick action | `@smoke @regression` |
| DASH-005 | Verify Pay a Bill quick action | `@regression` |
| DASH-006 | Verify Transactions quick action | `@regression` |
| DASH-007 | Verify Logout | `@smoke @regression` |

### Coverage

- Dashboard loading
- Net worth verification
- Quick action navigation
- Logout functionality

---

## 🏦 Account Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| ACC-001 | Verify Accounts page loads successfully | `@smoke @regression` |
| ACC-002 | Verify user account information | `@smoke @regression` |
| ACC-003 | View account details | `@smoke @regression` |
| ACC-004 | Verify account transaction history | `@smoke @regression` |
| ACC-005 | Search account transactions | `@regression` |
| ACC-006 | Search with no matching transaction | `@regression` |
| ACC-007 | Filter account transactions by date | `@regression` |
| ACC-008 | Filter account transactions by type | `@regression` |
| ACC-009 | Sort account transactions | `@regression` |
| ACC-010 | Combine transaction filters | `@regression` |

### Coverage

- Account information
- Account details
- Transaction history
- Transaction search
- Date filtering
- Credit/Debit filtering
- Sorting
- Combined filters
- No-result scenarios

---

## 💸 Transfer Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| TRF-001 | Verify Transfers page loads successfully | `@smoke @regression` |
| TRF-002 | Verify transfer form displays required fields and account options | `@smoke @regression` |
| TRF-003 | Verify successful transfer between eligible accounts | `@smoke @regression` |
| TRF-004 | Verify transfer amount validation | `@regression` |
| TRF-005 | Verify transfer cannot be submitted without selecting required accounts | `@regression` |
| TRF-006 | Verify transfer cannot be made when source and destination accounts are the same | `@regression` |
| TRF-007 | Verify transfer is rejected when amount exceeds available balance | `@regression` |
| TRF-008 | Verify transfer confirmation displays correct transaction details | `@smoke @regression` |
| TRF-009 | Verify completed transfer updates account balances / transaction history | `@regression` |
| TRF-010 | Verify transfer form can be reset/cancelled without creating a transaction | `@regression` |

### Coverage

- Transfer form validation
- Successful transfers
- Required field validation
- Same-account validation
- Insufficient balance
- Confirmation details
- Balance and transaction updates
- Reset/cancel functionality

---

## 💰 Send Money Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| SND-001 | Verify Send Money page loads successfully | `@smoke @regression` |
| SND-002 | Verify Send Money form displays required fields and available options | `@smoke @regression` |
| SND-003 | Verify successful Send Money transaction to an existing payee | `@smoke @regression` |
| SND-004 | Verify Add New Payee validation for invalid routing/account numbers | `@regression` |
| SND-005 | Verify Send Money amount validation | `@regression` |
| SND-006 | Verify Send Money is rejected when amount exceeds available balance | `@regression` |
| SND-007 | Verify new payee is saved when "Save Payee" is selected | `@regression` |
| SND-008 | Verify Send Money transaction review displays the correct payment detail | `@regression` |
| SND-010 | Verify cancelling Send Money does not create a transaction | `@regression` |

### Coverage

- Send Money form
- Existing payees
- New payee validation
- Amount validation
- Insufficient balance
- Save Payee functionality
- Payment review
- Cancel functionality

---

## 💡 Pay Bill Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| BILL-001 | Verify Bill Pay page loads successfully | `@smoke @regression` |
| BILL-002 | Verify Bill Pay form displays account, biller, amount, payment date and memo fields | `@smoke @regression` |
| BILL-003 | Verify user can search and select an existing biller | `@smoke @regression` |
| BILL-004 | Verify user can add a new biller successfully | `@regression` |
| BILL-005 | Verify successful bill payment to an existing biller | `@smoke @regression` |
| BILL-006 | Verify bill payment amount validation | `@regression` |
| BILL-007 | Verify bill payment is rejected when amount exceeds available balance | `@regression` |
| BILL-008 | Verify future payment date can be scheduled successfully | `@regression` |
| BILL-009 | Verify payment review displays correct payment details before confirmation | `@regression` |

### Coverage

- Bill Pay page
- Biller search and selection
- New biller
- Successful bill payment
- Amount validation
- Insufficient balance
- Future payment scheduling
- Payment review

---

## 📊 Transactions Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| TXN-001 | Verify Transactions page loads successfully and displays recent transactions | `@smoke @regression` |
| TXN-002 | Verify transactions can be filtered by account | `@smoke @regression` |
| TXN-003 | Verify transactions can be filtered by type — Credit and Debit | `@regression` |
| TXN-004 | Verify transactions can be searched by description | `@regression` |
| TXN-005 | Verify transactions can be sorted by date | `@regression` |
| TXN-006 | Verify transactions can be sorted by amount | `@regression` |
| TXN-007 | Verify multiple transaction filters work together | `@regression` |
| TXN-008 | Verify transaction list displays correct details for a completed transaction | `@smoke @regression` |
| TXN-009 | Verify no transactions message is displayed when filters return no results | `@regression` |

### Coverage

- Transaction list
- Account filtering
- Credit/Debit filtering
- Search
- Date sorting
- Amount sorting
- Combined filters
- Transaction details
- No-result state

---

## 🏠 Loans Module

| Test Case ID | Test Case | Tag |
|---|---|---|
| LOAN-001 | Verify Apply Loan form opens with all required fields | `@smoke @regression` |
| LOAN-002 | Verify successful loan application with valid details | `@smoke @regression` |
| LOAN-003 | Verify loan amount validation for amount exceeding $250,000 | `@regression` |
| LOAN-004 | Verify newly submitted loan appears in loan history with correct details | `@regression` |
| LOAN-005 | Verify loan history pagination displays correct records | `@regression` |
| LOAN-006 | Verify loan history can be filtered by loan type | `@regression` |
| LOAN-007 | Verify loan history can be searched by reference or purpose | `@regression` |
| LOAN-008 | Verify loan history can be filtered by date range | `@regression` |
| LOAN-009 | Verify loan history sorting by date and amount | `@regression` |

### Coverage

- Apply Loan form
- Successful loan application
- Loan amount validation
- Loan history
- Pagination
- Loan type filtering
- Search
- Date range filtering
- Sorting by date and amount

---

# 🧱 Framework Design

## Page Object Model

The project follows the **Page Object Model (POM)** design pattern.

Each application page has a dedicated Page Object containing:

- Locators
- Page-specific actions
- Reusable methods
- Page-specific validations where required

Example:

```text
tests/
    03_AccountPageTest.spec.ts

pageobject/
    AccountPage.ts
```

This keeps test cases readable and separates test logic from UI interaction logic.

---

## 🧩 Playwright Fixtures

Reusable test setup is handled using Playwright fixtures.

The fixture layer helps provide reusable dependencies such as:

- Page Objects
- POManager
- Common test setup

Example:

```text
fixtures/
└── testFixtures.ts
```

Tests can consume the required fixture instead of repeatedly creating the same Page Object dependencies.

---

## 🗂️ Page Object Manager

`POManager.ts` is used to manage and create Page Object instances.

This provides a centralized way to access objects such as:

- LoginPage
- Dashboard
- AccountPage
- TransferPage
- SendMoneyPage
- PayBillPage
- TransactionPage
- LoanPage

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone https://github.com/aritrax/banking-app-playwright-automation.git
```

## 2. Navigate to the project

```bash
cd banking-app-playwright-automation
```

## 3. Install dependencies

```bash
npm install
```

## 4. Install Playwright browsers

```bash
npx playwright install
```

---

# ▶️ Running Tests

## Run all tests

```bash
npx playwright test
```

## Run a specific test file

```bash
npx playwright test tests/08_LoanPageTest.spec.ts
```

## Run tests in headed mode

```bash
npx playwright test --headed
```

## Run a specific test in headed mode

```bash
npx playwright test tests/08_LoanPageTest.spec.ts --headed
```

## Run tests in debug mode

```bash
npx playwright test --debug
```

---

# 🏷️ Running Tests by Tags

## Run Smoke tests

```bash
npx playwright test --grep "@smoke"
```

## Run Regression tests

```bash
npx playwright test --grep "@regression"
```

## Run a specific tagged test

```bash
npx playwright test --grep "LOGIN-001"
```

---

# 📋 Test Reports

## Playwright HTML Report

The project is configured to generate the Playwright HTML report.

Run:

```bash
npx playwright show-report
```

The report provides:

- Test execution status
- Test duration
- Error details
- Screenshots
- Traces where available
- Test execution details

---

## 📊 Allure Report

Allure reporting is also included in the project.

Run the tests with Allure results enabled:

```bash
npx playwright test
```

Generate and open the Allure report:

```bash
allure generate allure-results --clean
allure open
```

If Allure is installed locally through the project, the corresponding npm script can also be used if configured in `package.json`.

The Allure report provides a detailed view of:

- Passed tests
- Failed tests
- Test duration
- Test suites
- Steps
- Attachments
- Execution details

---

# 🔎 Useful Playwright Commands

| Purpose | Command |
|---|---|
| Run all tests | `npx playwright test` |
| Run headed | `npx playwright test --headed` |
| Debug test | `npx playwright test --debug` |
| Run specific file | `npx playwright test <file>` |
| Run smoke tests | `npx playwright test --grep "@smoke"` |
| Run regression tests | `npx playwright test --grep "@regression"` |
| Open HTML report | `npx playwright show-report` |

---

# 🌿 Git Workflow

The project uses feature branches for module-level development.

Example:

```bash
git checkout -b feature/apply-loan
```

After implementing changes:

```bash
git add .
git commit -m "feat: add apply loan module tests"
git push -u origin feature/apply-loan
```

A Pull Request can then be created on GitHub to merge the feature branch into `main`.

---

# 📌 Test Automation Approach

The framework focuses on realistic banking workflows rather than isolated UI checks.

Examples include:

- Successful money transfers
- Balance validation
- Transaction history verification
- Filtering and sorting
- Loan application workflows
- Bill payments
- Payee management
- Negative and validation scenarios
- Confirmation and review flows

This approach helps validate both **functional behavior** and important **business scenarios** of the banking application.

---

# 📈 Project Summary

| Module | Test Cases |
|---|---:|
| Login | 8 |
| Dashboard | 7 |
| Account | 10 |
| Transfer | 10 |
| Send Money | 9 |
| Pay Bill | 9 |
| Transactions | 9 |
| Loans | 9 |
| **Total** | **71** |

---

## 👨‍💻 Author

**Aritra Paul**

Playwright Automation | TypeScript | SDET
