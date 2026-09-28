import { test } from "../fixtures/testFixtures";

import datset from '../logindata/logindata.json' ;
const validUser : any = datset.find(data=> data.expectedResult === "success")

test.beforeEach(async({poManager})=>
{
    const loginPage = await poManager.getLoginPage();
    const dashBoard = await poManager.getDashboard();
    await loginPage.goto() ;
    await loginPage.Login(validUser.Username, validUser.Password) ;
    await dashBoard.gotoTransfer() ;
})

test("TRF-001 Verify Transfers page loads successfully @smoke @regession",async({poManager})=>
{
    const transferPage = await poManager.getTransferPage() ;
    await transferPage.verifyTransferPage() ;
})

test("TRF-002 Verify transfer form displays required fields and account options @smoke @regression", async ({ poManager }) => {
    const transferPage = await poManager.getTransferPage(); 
    await transferPage.verifyTransferForm();
})

test("TRF-003 Verify successful transfer between eligible accounts  @smoke @regression", async ({ poManager }) => {
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifySuccesfulTransfer() ;
})

test("TRF-004 Verify transfer amount validation @regression", async ({ poManager }) => {
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifyTransferAmountValidation() ;
})

test("TRF-005 Verify transfer cannot be submitted without selecting required accounts" , async({poManager})=>
{
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifyTransferRequiredAccountsValidation() ;
})

test("TRF-006 Verify transfer cannot be made when source and destination accounts are the same" , async({poManager})=>
{
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifySourceAccountNotAvailableAsDestination() ;
})

test("TRF-007 Verify transfer is rejected when amount exceeds available balance" , async({poManager})=>
{
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifyTransferExceedsAvailableBalance() ;
})

test("TRF-008 Verify transfer confirmation displays correct transaction details" , async({poManager})=>
{
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifyTransferConfirmationDetails() ;
})

test("TRF-009 Verify completed transfer updates account balances / transaction history" , async({poManager})=>
{
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifyTransferUpdatesAccountBalances() ;
})

test("TRF-010 Verify transfer form can be reset/cancelled without creating a transaction" , async({poManager})=>
{
    const transferPage = await poManager.getTransferPage();
    await transferPage.verifyTransferCanBeCancelledWithoutCreatingTransaction() ;
})

