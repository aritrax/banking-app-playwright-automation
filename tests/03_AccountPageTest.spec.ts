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
    await dashBoard.gotoAccount() ;
})

test("ACC-001 Verify Accounts page loads successfully @smoke @regession",async({page})=>
{
    const poManger = new POManager(page) ;
    const accountPage = await poManger.getAccountPage() ;
    await accountPage.verifyAccountPage() ;
})

test("ACC-002 Verify user account information @smoke @regession", async({page})=>
{
    const poManger = new POManager(page) ;
    const accountPage = await poManger.getAccountPage() ;
    //await accountPage.verifyAccountPage() ;
    await accountPage.verifyAccountInformation("Everyday Checking", 0 ,"Checking") ;
    await accountPage.verifyAccountInformation("High-Yield Savings", 1 ,"Savings") ;
})

test("ACC-003 View account details @smoke @regession", async({page})=>
{
    const poManger = new POManager(page) ;
    const accountPage = await poManger.getAccountPage() ;
    //await accountPage.verifyAccountPage() ;
    await accountPage.verifyAccountDetails() ;
})

test("ACC-004 Verify account transaction history @smoke @regession", async({page})=>
{
    const poManger = new POManager(page) ;
    const accountPage = await poManger.getAccountPage() ;
    
    await accountPage.verifyTransaction() ;
})