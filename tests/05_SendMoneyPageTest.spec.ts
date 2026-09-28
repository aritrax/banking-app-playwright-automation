import { test } from "../fixtures/testFixtures";

import datset from '../logindata/logindata.json' ;
const validUser : any = datset.find(data=> data.expectedResult === "success")

test.beforeEach(async({poManager})=>
{
    const loginPage = await poManager.getLoginPage();
    const dashBoard = await poManager.getDashboard();
    await loginPage.goto() ;
    await loginPage.Login(validUser.Username, validUser.Password) ;
    await dashBoard.gotoSendMoney();
})

test("SND-001 Verify Send Money page loads successfully @smoke @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.verifysendMoneyPage() ;
})

test("SND-002 Verify Send Money form displays required fields and available options @smoke @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.verifySendMoneyFrom() ;
})

test("SND-003 Verify successful Send Money transaction to an existing payee @smoke @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.successfulSendMoney() ;
})

test("SND-004 Verify Add New Payee validation for invalid routing/account numbers @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.verifyAddPayeeValidation() ;
})

test("SND-005 Verify Send Money amount validation @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.verifySendMoneyAmountValidation() ;
})

test("SND-006 Verify Send Money is rejected when amount exceeds available balance @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.verifyInsufficientFunds() ;
})

test("SND-007 Verify new payee is saved when Save Payee is selected @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.verifysavepayee() ;
})

test("SND-008 Verify Send Money transaction review displays the correct payment detail @regression",async({poManager})=>
{
    const sendMoneyPage = await poManager.getSendMoneyPage() ;
    await sendMoneyPage.verifySendMoneyDetails() ;
})

