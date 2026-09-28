import { test } from "../fixtures/testFixtures";

import datset from '../logindata/logindata.json' ;
const validUser : any = datset.find(data=> data.expectedResult === "success")

test.beforeEach(async({poManager})=>
{
    const loginPage = await poManager.getLoginPage();
    const dashBoard = await poManager.getDashboard() ;
    await loginPage.goto() ;
    await loginPage.Login(validUser.Username, validUser.Password) ;
    await dashBoard.gotoAccount() ;
})

test("ACC-001 Verify Accounts page loads successfully @smoke @regession",async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyAccountPage() ;
})

test("ACC-002 Verify user account information @smoke @regession", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyAccountInformation("Everyday Checking", 0 ,"Checking") ;
    await accountPage.verifyAccountInformation("High-Yield Savings", 1 ,"Savings") ;
})

test("ACC-003 View account details @smoke @regession", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyAccountDetails() ;
})

test("ACC-004 Verify account transaction history @smoke @regession", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyTransaction() ;
})

test("ACC-005 Search account transactions @regession", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyTransactionSearch() ;
})

test("ACC-006 Search with no matching transaction @regression", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyTransactionSearchNoMatch() ;
})

test("ACC-007 Filter account transactions by date @regression", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyTransactionSearchByDate() ;
})

test("ACC-008 Credit, Debit and All transaction filters display the appropriate transactions @regression", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyTransactionFilterByType() ;
})

test("ACC-009 Credit, Transactions can be sorted correctly by date and amount @regression", async({poManager})=>
{
    const accountPage = await poManager.getAccountPage() ;
    await accountPage.verifyTransactiondSorting() ;
})

test("ACC-010 Combine transaction filters @regression", async({poManager}) =>
{
    const accountPage = await poManager.getAccountPage();
    await accountPage.verifyCombinedTransactionFilters();
});