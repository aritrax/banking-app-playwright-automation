import { test } from "../fixtures/testFixtures";
import { expect } from '@playwright/test';

import datset from '../logindata/logindata.json' ;
import { POManager } from "../pageobject/POManager";
const validUser : any = datset.find(data=> data.expectedResult === "success")

test.beforeEach(async ({ page, poManager }) =>
{
    const loginPage = await poManager.getLoginPage();
    const dashBoard = await poManager.getDashBoard();

    await loginPage.goto();
    await loginPage.Login(validUser.Username, validUser.Password);
    await dashBoard.gotoApplyLoan();
});

test("LOAN-001 Verify Apply Loan form opens with all required fields @smoke @regression", async ({ poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.verifyApplyLoanPage() ;

});

test("LOAN-002 Verify successful loan application with valid details @smoke @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.succesfullLoanValidation() ;
    await expect(page.getByText("Application Submitted")).toBeVisible();

});

test("LOAN-003 Verify loan amount validation for amount exceeding $250,000 @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.loanAmountValidation() ;

});

test("LOAN-004 Verify newly submitted loan appears in loan history with correct details @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.verifySubmittedLoanInHistory() ;

});

test("LOAN-005 Verify loan history pagination displays correct records @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.verifyLoanHistoryPagination() ;

});

test("LOAN-006 Verify loan history can be filtered by loan type @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.verifyLoanHistoryFilterByType() ;

});

test("LOAN-007 Verify loan history can be searched by reference or purpose @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.verifyLoanHistorySearchByReferenceOrPurpose() ;

});

test("LOAN-008 Verify loan history can be filtered by date range @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.verifyLoanHistoryFilterByDateRange() ;

});

test("LOAN-009 Verify loan history sorting by date and amount @regression", async ({ page ,poManager }) =>
{
    const loanPage = await poManager.getloanPage();
    await loanPage.verifyLoanHistorySortingByDateAndAmount() ;

});