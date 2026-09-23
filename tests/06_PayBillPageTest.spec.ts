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
    await dashBoard.gotoPayBill();
});

test("BILL-001 Verify Bill Pay page loads successfully @smoke @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.verifyPayBillPage() ;
})

test("BILL-002 Verify Bill Pay form displays account, biller, amount, payment date and memo fields @smoke @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.verifyPayBillForm() ;
})

test("BILL-003 Verify user can search and select an existing biller @smoke @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.verifyExistingBiller() ;
})

test("BILL-004 Verify user can add a new biller successfully @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.addNewBiller() ;
})

test("BILL-005 Verify successful bill payment to an existing biller @smoke @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.successfulBillPayment() ;
})

test("BILL-006 Verify bill payment amount validation @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.amountValidation();
})

test("BILL-007 Verify bill payment is rejected when amount exceeds available balance @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.verifyInsufficientFunds() ;
})

test("BILL-008 Verify future payment date can be scheduled successfully @regression",async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.futurepayment() ;
})

test("BILL-009 Verify payment review displays correct payment details before confirmation @regression", async({page})=>
{
    const poManger = new POManager(page) ;
    const payBillPage = await poManger.getPayBillPage() ;
    await payBillPage.paymentReviewConfirmation() ;
})