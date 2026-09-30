# Banking Application – Playwright Automation

## 📌 Project Overview

This project is an end-to-end test automation framework built using **Playwright with TypeScript** for a banking web application.

The framework follows the **Page Object Model (POM)** design pattern and covers functional, positive, negative, validation, filtering, sorting, pagination, and business-flow scenarios across multiple banking modules.

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
└── package-lock.json
```

---

# 🏗️ Framework Architecture

The framework follows the **Page Object Model (POM)** architecture.

## Page Objects

Each major application module has a dedicated Page Object class containing:

- Locators
- Page-specific actions
- Reusable methods
- Business-flow methods

Examples:

```text
LoginPage.ts
AccountPage.ts
TransferPage.ts
SendMoneyPage.ts
PayBillPage.ts
TransactionPage.ts
LoanPage.ts
```

## Test Files

The test files contain the actual test scenarios and assertions.

```text
01_LoginPageTest.spec.ts
02_DashBoardTest.spec.ts
03_AccountPageTest.spec.ts
04_TransferPageTest.spec.ts
05_SendMoneyPageTest.spec.ts
06_PayBillPageTest.spec.ts
07_TransactionPageTest.spec.ts
08_LoanPageTest.spec.ts
```

## POManager

`POManager.ts` provides centralized access to different Page Objects, helping reduce repeated Page Object initialization inside tests.

## Fixtures

`testFixtures.ts` contains reusable Playwright fixture configuration used across the test suite.

---

# 🧪 Test Coverage

## 1. Login Module

**Test Cases: LOGIN-001 to LOGIN-008**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| LOGIN-001 | Login with valid standard user | User successfully logs in and is redirected to the Dashboard | `@smoke @regression` |
| LOGIN-002 | Login with invalid username | Appropriate error message is displayed and user remains on Login page | `@regression` |
| LOGIN-003 | Login with invalid password | Appropriate error message is displayed and user remains on Login page | `@regression` |
| LOGIN-004 | Login with locked user | Login is prevented and locked-user error/message is displayed | `@smoke @regression` |
| LOGIN-005 | Login with frozen user | Login is prevented and frozen-user error/message is displayed | `@regression` |
| LOGIN-006 | Login with admin user | Admin user successfully logs in and is redirected to the appropriate page/dashboard | `@regression` |
| LOGIN-007 | Login with empty username | Username validation message is displayed | `@regression` |
| LOGIN-008 | Login with empty password | Password validation message is displayed | `@regression` |

---

## 2. Dashboard Module

**Test Cases: DASH-001 to DASH-007**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| DASH-001 | Verify dashboard loads after successful login | Dashboard loads successfully after valid login | `@smoke @regression` |
| DASH-002 | Verify Total Net Worth is displayed | Total Net Worth value is visible and displayed correctly | `@smoke @regression` |
| DASH-003 | Verify Transfer Money quick action | Transfer Money action is visible and navigates to Transfer page | `@smoke @regression` |
| DASH-004 | Verify Send Money quick action | Send Money action is visible and navigates to Send Money page | `@smoke @regression` |
| DASH-005 | Verify Pay a Bill quick action | Pay a Bill action is visible and navigates to Bill Pay page | `@regression` |
| DASH-006 | Verify Transactions quick action | Transactions action is visible and navigates to Transactions page | `@regression` |
| DASH-007 | Verify Logout | User can successfully log out and is returned to Login page | `@smoke @regression` |

---

## 3. Accounts Module

**Test Cases: ACC-001 to ACC-010**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| ACC-001 | Verify Accounts page loads successfully | Accounts page opens successfully and the account list/summary is displayed | `@smoke @regression` |
| ACC-002 | Verify user account information | Each account displays the correct account name, account type, masked account number, balance and status | `@smoke @regression` |
| ACC-003 | View account details | Clicking View Account opens the correct account and displays its account information and transaction history | `@smoke @regression` |
| ACC-004 | Verify account transaction history | Account details display transaction date, description, category, amount and running balance correctly | `@smoke @regression` |
| ACC-005 | Search account transactions | Searching by transaction description returns the relevant transactions | `@regression` |
| ACC-006 | Search with no matching transaction | Search with a non-existing description displays an appropriate empty/no-results state | `@regression` |
| ACC-007 | Filter account transactions by date | From date, To date and date-range filters return transactions within the selected period | `@regression` |
| ACC-008 | Filter account transactions by type | Credit, Debit and All transaction filters display the appropriate transactions | `@regression` |
| ACC-009 | Sort account transactions | Transactions can be sorted correctly by date and amount | `@regression` |
| ACC-010 | Combine transaction filters | User can combine search/date/type filters and receive the expected transaction results | `@regression` |

---

## 4. Transfer Module

**Test Cases: TRF-001 to TRF-010**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| TRF-001 | Verify Transfers page loads successfully | Transfers page loads successfully | `@smoke @regression` |
| TRF-002 | Verify transfer form displays required fields and account options | Required fields and eligible account options are displayed | `@smoke @regression` |
| TRF-003 | Verify successful transfer between eligible accounts | Transfer is successfully completed between eligible accounts | `@smoke @regression` |
| TRF-004 | Verify transfer amount validation | Invalid transfer amount is rejected with appropriate validation | `@regression` |
| TRF-005 | Verify transfer cannot be submitted without selecting required accounts | Transfer cannot be submitted when required accounts are not selected | `@regression` |
| TRF-006 | Verify transfer cannot be made when source and destination accounts are the same | Transfer is prevented when source and destination accounts are identical | `@regression` |
| TRF-007 | Verify transfer is rejected when amount exceeds available balance | Transfer is rejected when the amount exceeds available balance | `@regression` |
| TRF-008 | Verify transfer confirmation displays correct transaction details | Confirmation displays the correct transfer details | `@smoke @regression` |
| TRF-009 | Verify completed transfer updates account balances / transaction history | Account balances and transaction history are updated after transfer | `@regression` |
| TRF-010 | Verify transfer form can be reset/cancelled without creating a transaction | Reset/cancel does not create a transaction | `@regression` |

---

## 5. Send Money Module

**Test Cases: SND-001 to SND-010**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| SND-001 | Verify Send Money page loads successfully | Send Money page loads successfully | `@smoke @regression` |
| SND-002 | Verify Send Money form displays required fields and available options | Required fields and available options are displayed | `@smoke @regression` |
| SND-003 | Verify successful Send Money transaction to an existing payee | Money is successfully sent to an existing payee | `@smoke @regression` |
| SND-004 | Verify Add New Payee validation for invalid routing/account numbers | Invalid routing/account numbers are rejected | `@regression` |
| SND-005 | Verify Send Money amount validation | Invalid Send Money amount is rejected | `@regression` |
| SND-006 | Verify Send Money is rejected when amount exceeds available balance | Transaction is rejected when amount exceeds available balance | `@regression` |
| SND-007 | Verify new payee is saved when "Save Payee" is selected | New payee is saved when Save Payee is selected | `@regression` |
| SND-008 | Verify Send Money transaction review displays the correct payment detail | Review page displays correct payment details | `@regression` |
| SND-010 | Verify cancelling Send Money does not create a transaction | Cancelling Send Money does not create a transaction | `@regression` |

---

## 6. Pay Bill Module

**Test Cases: BILL-001 to BILL-009**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| BILL-001 | Verify Bill Pay page loads successfully | Bill Pay page loads successfully | `@smoke @regression` |
| BILL-002 | Verify Bill Pay form displays account, biller, amount, payment date and memo fields | Required Bill Pay fields are displayed | `@smoke @regression` |
| BILL-003 | Verify user can search and select an existing biller | Existing biller can be searched and selected | `@smoke @regression` |
| BILL-004 | Verify user can add a new biller successfully | New biller can be added successfully | `@regression` |
| BILL-005 | Verify successful bill payment to an existing biller | Bill payment is successfully completed | `@smoke @regression` |
| BILL-006 | Verify bill payment amount validation | Invalid bill payment amount is rejected | `@regression` |
| BILL-007 | Verify bill payment is rejected when amount exceeds available balance | Payment is rejected when amount exceeds available balance | `@regression` |
| BILL-008 | Verify future payment date can be scheduled successfully | Future bill payment can be scheduled successfully | `@regression` |
| BILL-009 | Verify payment review displays correct payment details before confirmation | Payment review displays correct payment details | `@regression` |

---

## 7. Transactions Module

**Test Cases: TXN-001 to TXN-009**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| TXN-001 | Verify Transactions page loads successfully and displays recent transactions | Transactions page loads and recent transactions are displayed | `@smoke @regression` |
| TXN-002 | Verify transactions can be filtered by account | Transactions are filtered according to selected account | `@smoke @regression` |
| TXN-003 | Verify transactions can be filtered by type — Credit and Debit | Credit and Debit filters display appropriate transactions | `@regression` |
| TXN-004 | Verify transactions can be searched by description | Searching by description returns relevant transactions | `@regression` |
| TXN-005 | Verify transactions can be sorted by date | Transactions are sorted correctly by date | `@regression` |
| TXN-006 | Verify transactions can be sorted by amount | Transactions are sorted correctly by amount | `@regression` |
| TXN-007 | Verify multiple transaction filters work together | Multiple filters work together and return expected results | `@regression` |
| TXN-008 | Verify transaction list displays correct details for a completed transaction | Completed transaction displays correct details | `@smoke @regression` |
| TXN-009 | Verify no transactions message is displayed when filters return no results | Appropriate no-results message is displayed | `@regression` |

---

## 8. Loans Module

**Test Cases: LOAN-001 to LOAN-009**

| Test Case ID | Test Case Name | What to Verify | Tag |
|---|---|---|---|
| LOAN-001 | Verify Apply Loan form opens with all required fields | Apply Loan form opens with all required fields | `@smoke @regression` |
| LOAN-002 | Verify successful loan application with valid details | Loan application is successfully submitted with valid details | `@smoke @regression` |
| LOAN-003 | Verify loan amount validation for amount exceeding $250,000 | Loan amount exceeding $250,000 is rejected | `@regression` |
| LOAN-004 | Verify newly submitted loan appears in loan history with correct details | Newly submitted loan appears with correct details | `@regression` |
| LOAN-005 | Verify loan history pagination displays correct records | Pagination displays the correct loan history records | `@regression` |
| LOAN-006 | Verify loan history can be filtered by loan type | Loan history can be filtered by loan type | `@regression` |
| LOAN-007 | Verify loan history can be searched by reference or purpose | Loan history can be searched by reference or purpose | `@regression` |
| LOAN-008 | Verify loan history can be filtered by date range | Loan history can be filtered using a date range | `@regression` |
| LOAN-009 | Verify loan history sorting by date and amount | Loan history can be sorted by date and amount | `@regression` |

---

# 🧩 Key Framework Features

## Page Object Model

Application locators and actions are maintained separately from test cases.

This provides:

- Better code organization
- Reusable methods
- Easier maintenance
- Improved test readability

## Playwright Fixtures

Common test setup and reusable Playwright functionality are handled through fixtures.

```text
fixtures/
└── testFixtures.ts
```

## Page Object Manager

`POManager.ts` provides centralized access to different Page Objects.

This avoids repeatedly creating Page Object instances inside test cases.

## Business-Oriented Test Scenarios

The framework focuses on realistic banking business scenarios rather than testing only individual UI elements.

Examples include:

- Successful money transfer
- Successful Send Money transaction
- Successful bill payment
- Successful loan application
- Insufficient balance validation
- Transaction filtering
- Transaction sorting
- Loan history pagination
- Loan history filtering
- Transaction history validation

## Test Tags

Tests are categorized using Playwright tags:

```text
@smoke
@regression
```

### Smoke Tests

Used for critical business flows and core application functionality.

### Regression Tests

Used for broader functional coverage across the application.

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/aritrax/banking-app-playwright-automation.git
```

Navigate to the project:

```bash
cd banking-app-playwright-automation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# ▶️ Running Tests

## Run the Complete Test Suite

```bash
npx playwright test
```

## Run Tests in Headed Mode

```bash
npx playwright test --headed
```

## Run a Specific Test File

```bash
npx playwright test tests/08_LoanPageTest.spec.ts
```

## Run Smoke Tests

```bash
npx playwright test --grep @smoke
```

## Run Regression Tests

```bash
npx playwright test --grep @regression
```

## Run a Specific Test by Name

```bash
npx playwright test -g "Login with valid standard user"
```

## Debug Tests

```bash
npx playwright test --debug
```

---

# 📊 Test Reporting

The framework supports both **Playwright HTML Reports** and **Allure Reports**.

## Playwright HTML Report

After test execution, open the Playwright HTML report using:

```bash
npx playwright show-report
```

The report provides:

- Test execution status
- Passed/failed tests
- Test duration
- Error details
- Screenshots and traces when available

## Allure Report

Allure is used to generate detailed and interactive test execution reports.

Run the test suite:

```bash
npx playwright test
```

Generate the Allure report:

```bash
allure generate allure-results --clean -o allure-report
```

Open the generated Allure report:

```bash
allure open allure-report
```

Alternatively, generate and open the report directly:

```bash
allure serve allure-results
```

The Allure report provides:

- Test execution status
- Test duration
- Passed, failed and skipped tests
- Test suites
- Test steps
- Error details
- Execution history
- Detailed test execution information

---

# 🎯 Project Goals

This project demonstrates practical experience with:

- Playwright automation
- TypeScript
- Page Object Model
- Playwright Fixtures
- Page Object Manager
- Functional testing
- Positive and negative testing
- Validation testing
- Business-flow automation
- Smoke testing
- Regression testing
- Filtering and sorting
- Pagination
- Test reporting
- Allure reporting
- Git and GitHub

---

# 👨‍💻 Author

**Aritra Paul**

Playwright | TypeScript | SDET | Test Automation
```