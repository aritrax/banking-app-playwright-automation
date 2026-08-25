import {test , Page , Locator , Expect, expect} from "@playwright/test" 

export class AccountPage
{
    page : Page;
    accountTable : Locator ;
    accountName : Locator ;
    accountType : Locator ;
    accountStatus : Locator ;
    accountBalance : Locator ;
    accountNumber : Locator ;
    viewButton: Locator ;
    accountNameDetails: Locator ;
    accountNumberDetails: Locator ;
    accountBalanceDetails : Locator ;
    transcationTable : Locator ;
    transcationDesp : Locator ;
    transactionDate : Locator ;
    transactionCategory : Locator ;
    transactionAmout : Locator ;
    runningBalance : Locator ;

    constructor(page:Page)
    {
        this.page = page ;
        this.accountTable = page.getByTestId("accounts-table") ;
        this.accountName = page.getByTestId("account-row-name") ;
        this.accountType = page.getByTestId("account-row-type-badge")
        this.accountStatus = page.getByText("Active") ;
        this.accountBalance = page.getByTestId("account-row-balance") ;
        this.accountNumber = page.locator("p.font-mono.text-xs.text-slate-500") ;
        this.viewButton = page.getByTestId("view-account-btn").first() ;
        this.accountNameDetails = page.getByTestId("account-detail-name");
        this.accountNumberDetails = page.locator(".mt-1.font-mono.text-sm.text-slate-500") ;
        this.accountBalanceDetails = page.getByTestId("account-detail-balance") ;
        this.transcationTable = page.getByTestId("transactions-table-wrapper") ;
        this.transcationDesp = page.getByTestId("txn-description") ;
        this.transactionDate = page.locator("time");
        this.transactionCategory= page.getByTestId("txn-category-badge");
        this.transactionAmout = page.getByTestId("txn-amount");
        this.runningBalance = page.getByTestId("transaction-row").first().locator("td").last();
    }

    async verifyAccountPage()
    {
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/accounts") ;
        await expect(this.accountTable).toBeVisible() ;
    }

    async verifyAccountInformation(accountName: string, index: number , accountType: string,) 
    {   
        await expect(this.accountName.nth(index)).toHaveText(accountName);
        await expect(this.accountType.nth(index)).toHaveText(accountType);
        await expect(this.accountStatus.nth(index)).toHaveText("Active") ;
        await expect(this.accountNumber.nth(index)).toHaveText(/^\*{4}\d{4}$/);
        await expect(this.accountBalance.nth(index)).toBeVisible() ;
    }

    async verifyAccountDetails()
    {
        await this.viewButton.click() ;
        await expect(this.accountNameDetails).toHaveText("Everyday Checking") ;
        await expect(this.accountNumberDetails).toHaveText("****4321") ;
        await expect(this.accountBalanceDetails).toBeVisible() ;
        await expect(this.transcationTable).toBeVisible() ;
    }
    
    async verifyTransaction()
    {
        await this.viewButton.click() ;
        await expect(this.transcationDesp.first()).toHaveText("Direct Deposit — ACME Corp");
        //await expect(this.transactionDate.first()).toHaveText("Jun 22, 2026") ;
        await expect(this.transactionDate.first()).toContainText("Jun 22, 2026");
        await expect(this.transactionCategory.first()).toHaveText("Income") ;
        await expect(this.transactionAmout.first()).toHaveText("+$3,200.00") ;
        await expect(this.runningBalance.first()).toBeVisible() ;

    }
}