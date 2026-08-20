import {test , expect , Page , Locator} from "@playwright/test"

export class DashBoard
{
    page: Page;
    netWorthDisplay : Locator ;
    transferMoneyButton : Locator ;
    sendMoneyButton : Locator ;
    payBillAction : Locator ;
    transcationAction : Locator ; 
    logout : Locator ;

    constructor(page: Page)
    {
        this.page = page;
        this.netWorthDisplay = page.getByTestId("stat-card-net-worth-value") ;
        this.transferMoneyButton = page.getByTestId("quick-action-transfer")
        this.sendMoneyButton = page.getByTestId("quick-action-send-money") ;
        this.payBillAction = page.getByTestId("quick-action-bill-pay") ;
        this.transcationAction = page.getByTestId("quick-action-transactions") ;
        this.logout = page.getByLabel("Logout") ;
    }

    async verifyDashboard()
    {
       await expect(this.page).toHaveURL("https://qaplayground.com/bank/dashboard") ;
    }

    async verifyNetWorthDisplay()
    {
        await expect(this.netWorthDisplay).toBeVisible() ;
    }
    
    async verifyTransferMoneyAction()
    {
        await this.transferMoneyButton.click() ;
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/transfer")
    }
    
    async verifySendMoneyAction()
    {
        await this.sendMoneyButton.click() ;
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/send-money") ;
    }

    async verifyPayBillAction()
    {
        await this.payBillAction.click() ;
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/bill-pay") ;
    }

    async verifyTranscationAction() 
    {
        await this.transcationAction.click() ;
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/transactions") ;
    }

    async verifyLogOut()
    {
        await this.logout.click() ;
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/login")
    }
}