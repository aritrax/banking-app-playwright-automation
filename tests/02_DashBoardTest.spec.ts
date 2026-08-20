import {Page ,test , expect, Locator} from '@playwright/test' ;
import { POManager } from '../pageobject/POManager';

import datset from '../logindata/logindata.json' ;
const validUser : any = datset.find(data=> data.expectedResult === "success")

test.beforeEach(async({page})=>
{
    const poManger = new POManager(page) ;
    const loginPage = await poManger.getLoginPage();
    await loginPage.goto() ;
    await loginPage.Login(validUser.Username, validUser.Password) ;
})

test("DASH-001	Verify dashboard loads after successful login @smoke @regression" , async ({page})=>
{
    const poManger = new POManager(page) ;
    const dashBoard = await poManger.getDashBoard();
    await dashBoard.verifyDashboard()
})

test("DASH-002	Verify Total Net Worth is displayed @smoke @regression" , async ({page})=>
{
    const poManger = new POManager(page) ;
    const dashBoard = await poManger.getDashBoard();
    await dashBoard.verifyNetWorthDisplay() ;

})    

test("DASH-003	Verify Transfer Money quick action @smoke @regression" , async ({page})=>
{
    const poManger = new POManager(page) ;
    const dashBoard = await poManger.getDashBoard();
    await dashBoard.verifyTransferMoneyAction() ;
})

test("DASH-004	Verify Send Money quick action @smoke @regression" , async ({page})=>
{
    const poManger = new POManager(page) ;
    const dashBoard = await poManger.getDashBoard();
    await dashBoard.verifySendMoneyAction()

})

test("DASH-005	Verify Pay a Bill quick action @regression" , async ({page})=>
{
    const poManger = new POManager(page) ;
    const dashBoard = await poManger.getDashBoard();
    await dashBoard.verifyPayBillAction()

})

test("DASH-006	Verify Transactions quick action @regression" , async ({page})=>
{
    const poManger = new POManager(page) ;
    const dashBoard = await poManger.getDashBoard();
    await dashBoard.verifyTranscationAction() ;

})

test("DASH-007	Verify Logout" , async({page})=>
{
    const poManger = new POManager(page) ;
    const dashBoard = await poManger.getDashBoard();
    await dashBoard.verifyLogOut() ;
})