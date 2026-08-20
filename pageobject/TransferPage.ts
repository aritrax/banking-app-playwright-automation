import {test , expect , Page , Locator} from "@playwright/test"

export class TransferPage
{
    page: Page ;

    constructor(page: Page)
    {
        this.page = page ;
    }

    async verifyTransferPage()
    {
        await this.page.waitForLoadState('networkidle');
        expect(this.page).toHaveURL("https://qaplayground.com/bank/transfer")
        
    }
}