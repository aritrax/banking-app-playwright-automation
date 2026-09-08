import {test , expect , Page , Locator} from "@playwright/test"

export class TransferPage
{
    page: Page ;
    transferPage : Locator ;
    transferFrom : Locator ;
    transferfromOption : Locator ;
    transferTo : Locator ;
    transfertoOption : Locator ; 
    transferAmount : Locator ;
    transferDate : Locator ;
    reviewTransfer : Locator ;
    avilableBalance : Locator ;
    confirmTransfer : Locator ;
    transferSucessfullMsg : Locator ;
    transferErrorMessage: Locator;
    transferConfirmDialog : Locator ;
    canceltransferconfirmation : Locator ;

    constructor(page: Page)
    {
        this.page = page ;
        this.transferPage = page.getByTestId("sidebar-link-transfer") ;
        this.transferFrom = page.getByTestId("transfer-from-select") ;
        this.transferfromOption = page.getByTestId("transfer-from-option") ;
        this.transferTo = page.getByTestId("transfer-to-select") ;
        this.transfertoOption = page.getByTestId("transfer-to-option") ;
        this.transferAmount = page.getByTestId("transfer-amount-input") ;
        this.transferDate = page.getByRole("radio", { name: "Today" });
        this.reviewTransfer = page.getByTestId("review-transfer-btn") ;
        this.avilableBalance = page.getByTestId("transfer-available-balance") ;
        this.confirmTransfer = page.getByTestId("confirm-transfer-btn") ;
        this.transferSucessfullMsg = page.getByText("Transfer Successful");
        this.transferErrorMessage = page.getByTestId("transfer-error-message");
        this.transferConfirmDialog = page.getByTestId("transfer-confirm-dialog");
        this.canceltransferconfirmation = page.getByTestId("cancel-confirm-transfer-btn") ;
    }

    async verifyTransferPage()
    {   
        await this.transferPage.click() ;
        await this.page.waitForLoadState('networkidle');
        expect(this.page).toHaveURL("https://qaplayground.com/bank/transfer")
    }

    async verifyTransferForm()
    {
        await this.transferPage.click() ;
        await this.transferFrom.click();
        await this.transferfromOption.first().click() ;
        await this.transferTo.click() ;
        await this.transfertoOption.first().click() ;
        await this.transferAmount.fill("100") ;
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await expect(this.confirmTransfer).toBeVisible() ;
    }

    async verifySuccesfulTransfer()
    {
        await this.transferPage.click() ;
        await this.transferFrom.click();
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        await this.transfertoOption.first().click() ;
        let availableBalanceText : any = await this.avilableBalance.textContent()
        const availableBalance = Number(availableBalanceText?.replace(/[$,]/g, ""))
        if (availableBalance >= 100) 
        {
            await this.transferAmount.fill("100") ;
        } 
        else if (availableBalance > 1)
        {
            const toBeTransferAmount = availableBalance - 1 
            await this.transferAmount.fill(toBeTransferAmount.toString()) ;
        }
        else
        {
            throw new Error("Insufficient balance for a successful transfer test");
        }
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await this.confirmTransfer.click() ;
        await expect(this.transferSucessfullMsg).toBeVisible() ;
    }

    async verifyTransferAmountValidation()
    {
        await this.transferPage.click() ;
        await this.transferFrom.click();
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        await this.transfertoOption.first().click() ;
        
        // Zero Value
        await this.transferAmount.fill("0") ;
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await expect (this.confirmTransfer).not.toBeVisible() ;
        await expect(this.transferErrorMessage).toHaveText("Please enter a valid amount.");

        // Negetive Value 
        await this.transferAmount.fill("-100") ;
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await expect (this.confirmTransfer).not.toBeVisible() ;
        await expect(this.transferErrorMessage).toHaveText("Please enter a valid amount.");
    }

    async verifyTransferRequiredAccountsValidation()
    {   
        // From Account & To Account Missing 
        await this.transferPage.click() ;
        await expect(this.transferTo).toBeDisabled(); 
        await this.transferAmount.fill("100") ;
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await expect (this.confirmTransfer).not.toBeVisible() ;
        await expect(this.transferErrorMessage).toHaveText("Please select a From account.");
        // 
    }

    async verifySourceAccountNotAvailableAsDestination()
    {
        await this.transferPage.click() ;
        await this.transferFrom.click();
        await this.transferfromOption.getByText("Everyday Checking").click()
        await this.transferTo.click() ;
        await expect(this.transfertoOption.filter({ hasText: "Everyday Checking" })).toHaveCount(0);
    }

    async verifyTransferExceedsAvailableBalance()
    {
        await this.transferPage.click() ;
        await this.transferFrom.click();
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        await this.transfertoOption.first().click() ;
        let availableBalanceText : any = await this.avilableBalance.textContent()
        const availableBalance = Number(availableBalanceText?.replace(/[$,]/g, ""))
        const toBeTransferAmount = availableBalance + 1 ;
        await this.transferAmount.fill(toBeTransferAmount.toString()) ;
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await this.confirmTransfer.click() ;
        await expect(this.transferErrorMessage).toContainText("Insufficient funds") ;
    }

    async verifyTransferConfirmationDetails()
    {
        await this.transferPage.click() ;
        await this.transferFrom.click();
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        await this.transfertoOption.first().click() ;
        let availableBalanceText : any = await this.avilableBalance.textContent()
        const availableBalance = Number(availableBalanceText?.replace(/[$,]/g, ""))
        if (availableBalance >= 100) 
        {
            await this.transferAmount.fill("100") ;
        } 
        else
        {
            throw new Error("Insufficient balance for a successful transfer test");
        }
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        const fromRow = this.transferConfirmDialog.locator("div.flex.justify-between").filter({ hasText: "From" });
        await expect(fromRow).toContainText("High-Yield Savings");
        const toRow = this.transferConfirmDialog.locator("div.flex.justify-between").filter({ hasText: "To" });
        await expect(toRow).toContainText("Everyday Checking");
        const amountRow = this.transferConfirmDialog.locator("div.flex.justify-between").filter({ hasText: "Amount" });
        await expect(amountRow).toContainText("$100.00");
        await expect(this.confirmTransfer).toBeVisible() ; 
    }

    async verifyTransferUpdatesAccountBalances()
    {   
        await this.transferPage.click() ;
        await this.transferFrom.click();
        const source_accountText = await this.transferfromOption.nth(1).textContent();
        const source_balanceBefore = Number(source_accountText?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        const destination_accountText = await this.transfertoOption.first().textContent();
        const destination_balanceBefore = Number(destination_accountText?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        await this.transfertoOption.first().click() ;
        if (source_balanceBefore >= 10) 
        {
            await this.transferAmount.fill("10") ;
        } 
        else
        {
            throw new Error("Insufficient balance for a successful transfer test");
        }
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await this.confirmTransfer.click() ;
        await expect(this.transferSucessfullMsg).toBeVisible() ;

        await this.transferPage.click() ;
        await this.transferFrom.click();
        const source_accountTextAfter = await this.transferfromOption.nth(1).textContent();
        const source_balanceAfter = Number(source_accountTextAfter?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        const destination_accountTextAfter = await this.transfertoOption.first().textContent();
        const destination_balanceAfter = Number(destination_accountTextAfter?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        
        expect(source_balanceAfter).toBe(source_balanceBefore - 10);
        expect(destination_balanceAfter).toBe(destination_balanceBefore + 10);
    }

    async verifyTransferCanBeCancelledWithoutCreatingTransaction()
    {
        await this.transferPage.click() ;
        await this.transferFrom.click();
        const source_accountText = await this.transferfromOption.nth(1).textContent();
        const source_balanceBefore = Number(source_accountText?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        const destination_accountText = await this.transfertoOption.first().textContent();
        const destination_balanceBefore = Number(destination_accountText?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        await this.transfertoOption.first().click() ;
        if (source_balanceBefore >= 10) 
        {
            await this.transferAmount.fill("10") ;
        } 
        else
        {
            throw new Error("Insufficient balance for a successful transfer test");
        }
        await this.transferDate.check();
        await this.reviewTransfer.click() ;
        await this.canceltransferconfirmation.click() ;

        await this.transferPage.click() ;
        await this.transferFrom.click();
        const source_accountTextAfter = await this.transferfromOption.nth(1).textContent();
        const source_balanceAfter = Number(source_accountTextAfter?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        await this.transferfromOption.nth(1).click() ;
        await this.transferTo.click() ;
        const destination_accountTextAfter = await this.transfertoOption.first().textContent();
        const destination_balanceAfter = Number(destination_accountTextAfter?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
        
        expect(source_balanceAfter).toBe(source_balanceBefore);
        expect(destination_balanceAfter).toBe(destination_balanceBefore);

    }
}