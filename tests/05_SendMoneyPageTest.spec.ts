import {Page ,test , expect, Locator} from '@playwright/test' ;
import { POManager } from '../pageobject/POManager';

import datset from '../logindata/logindata.json' ;
const validUser : any = datset.find(data=> data.expectedResult === "success")

test.beforeEach(async({page})=>
{
    const poManger = new POManager(page) ;
    const loginPage = await poManger.getLoginPage();
    const dashBoard = await poManger.getDashBoard() ;
    await loginPage.goto() ;
    await loginPage.Login(validUser.Username, validUser.Password) ;
    await dashBoard.gotoSendMoney();
})

test("SND-001 Verify Send Money page loads successfully @smoke @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.verifysendMoneyPage() ;
})

test("SND-002 Verify Send Money form displays required fields and available options @smoke @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.verifySendMoneyFrom() ;
})

test("SND-003 Verify successful Send Money transaction to an existing payee @smoke @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.successfulSendMoney() ;
})

test("SND-004 Verify Add New Payee validation for invalid routing/account numbers @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.verifyAddPayeeValidation() ;
})

test("SND-005 Verify Send Money amount validation @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.verifySendMoneyAmountValidation() ;
})

test("SND-006 Verify Send Money is rejected when amount exceeds available balance @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.verifyInsufficientFunds() ;
})

test("SND-007 Verify new payee is saved when Save Payee is selected @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.verifysavepayee() ;
})

test("SND-008 Verify Send Money transaction review displays the correct payment detail @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const sendMoneyPage = await poManger.sendMoneyPage() ;
    await sendMoneyPage.verifySendMoneyDetails() ;
})

