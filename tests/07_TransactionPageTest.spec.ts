import { test } from "../fixtures/testFixtures";
import { expect } from '@playwright/test';

import datset from '../logindata/logindata.json' ;
const validUser : any = datset.find(data=> data.expectedResult === "success")

test.beforeEach(async({poManager})=>
{
    const loginPage = await poManager.getLoginPage();
    const dashBoard = await poManager.getDashBoard();

    await loginPage.goto() ;
    await loginPage.Login(validUser.Username, validUser.Password) ;
    await dashBoard.verifyTranscationAction() ;
})

test("TXN-001 Verify Transactions page loads successfully and displays recent transactions @smoke @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyTransactionPage();
})

test("TXN-002 Verify transactions can be filtered by account @smoke @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyTransactionsByAccount();
})

test("TXN-003 Verify transactions can be filtered by type - Credit and Debit @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyTransactionsByType();
})

test("TXN-004 Verify transactions can be searched by description @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyTransactionsByDescriptionSearch();
})

test("TXN-005 Verify transactions can be sorted by date @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyTransactionsSortedByDate();
})

test("TXN-006 Verify transactions can be sorted by amount @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyTransactionsSortedByAmount();
})

test("TXN-007 Verify multiple transaction filters work together @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyMultipleTransactionFilters();
})

test("TXN-008 Verify transaction list displays correct details for a completed transaction @smoke @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyTransactionDetailRowDisplay();
})

test("TXN-009 Verify no transactions message is displayed when filters return no results @regression", async ({ poManager }) =>
{
    const transactionPage = await poManager.getTransactionPage();
    await transactionPage.verifyNoTransactionsMessageForEmptyResults();
})
