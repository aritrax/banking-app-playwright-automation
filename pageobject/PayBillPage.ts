import {Page ,test , expect, Locator} from '@playwright/test'

export class PayBillPage
{
    fromAccount : Locator ;
    fromAccountOption : Locator ;
    billerSearch : Locator             ;                       
    billerSearchResults  : Locator ;
    amount : Locator ;
    paymentDate : Locator ;
    memo : Locator ;
    reviewPayment : Locator ;
    confirmPayment : Locator ;
    paymentSuccessMsg : Locator ; 
    addBiller : Locator ;
    addBillerName : Locator ;
    billerReference : Locator ;
    billerSelectedSummary : Locator ;
    addBillerButton : Locator ;
    billpayError  : Locator ;
    billConfirmationSummary : Locator ;

    constructor(public page: Page)
    {
        this.page = page ;
        this.fromAccount = page.getByTestId("bill-pay-from-select") ;
        this.fromAccountOption = page.getByTestId("bill-pay-from-option") ;
        this.billerSearch = page.getByTestId("biller-search-input") ;
        this.billerSearchResults = page.getByTestId("biller-search-results") ;
        this.amount = page.getByTestId("bill-amount-input") ;
        this.paymentDate = page.getByTestId("bill-payment-date-input");
        this.memo = page.getByRole("textbox", { name: "Memo (optional)" });
        this.reviewPayment = page.getByTestId("review-bill-btn") ;
        this.confirmPayment = page.getByTestId("confirm-bill-btn") ;
        this.paymentSuccessMsg = page.getByTestId("bill-pay-confirmation-page");
        this.addBiller = page.getByTestId("add-biller-btn");
        this.addBillerName = page.getByTestId("add-biller-name-input");
        this.billerReference = page.getByPlaceholder("e.g. ACC-0042");
        this.addBillerButton = page.getByTestId("save-add-biller-btn") ;
        this.billerSelectedSummary = page.getByTestId("biller-selected-summary") ;
        this.billpayError = page.getByTestId("bill-pay-error") ;
        this.billConfirmationSummary = page.getByTestId("bill-confirm-summary") ;

    }

    async verifyPayBillPage()
    {
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/bill-pay") ;
    }

    async verifyPayBillForm()
    {
        await expect(this.fromAccount).toBeVisible();
        await expect(this.billerSearch).toBeVisible();
        await expect(this.amount).toBeVisible();
        await expect(this.paymentDate).toBeVisible();
        await expect(this.memo).toBeVisible();
    }

    async verifyExistingBiller()
    {
        await this.billerSearch.fill("City Electric Co.");
        await expect(this.billerSearchResults).toBeVisible();
        const biller = this.billerSearchResults.getByRole("option", {name: /City Electric Co./});
        await expect(biller).toBeVisible();
        await biller.click();
    }

    async addNewBiller()
    {
        await this.addBiller.click();
        const billerName = `TestPayee${Math.floor(Math.random() * 1000)}`;
        await this.addBillerName.fill(billerName) ;
        const accountNumber = `ACC-${Math.floor(1000 + Math.random() * 9000)}`;
        await this.billerReference.fill(accountNumber) ;
        await this.addBillerButton.click() ;
        await expect(this.billerSelectedSummary).toContainText(billerName);
        await expect(this.billerSelectedSummary).toContainText(accountNumber);
    }

    async successfulBillPayment()
    {
        await this.fromAccount.click();
        await this.fromAccountOption.first().click();
        await this.amount.fill("5");
        await this.memo.fill("Test Payment");
        await this.verifyExistingBiller();
        await this.reviewPayment.click();
        await this.confirmPayment.click();
        await expect(this.paymentSuccessMsg).toContainText("Payment Scheduled");
    }
    
    async amountValidation()
    {   
        // Zero Value Validation
        await this.fromAccount.click();
        await this.fromAccountOption.first().click();
        await this.amount.fill("0");
        await this.verifyExistingBiller();
        await this.reviewPayment.click();
        await expect(this.billpayError).toContainText("Please enter a valid amount.") ;

        // Negetive Value Validation 
        await this.amount.fill("-5");
        await this.reviewPayment.click();
        await expect(this.billpayError).toContainText("Please enter a valid amount.") ;

    }

    async getAvailableBalance()
    {
        await this.fromAccount.click();
        const balanceText = await this.fromAccountOption.first().textContent();
        await this.fromAccountOption.first().click();
        return Number(balanceText?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
    }

    async verifyInsufficientFunds() 
    {
        await this.fromAccount.click();
        await this.fromAccountOption.first().click();
        const balance = await this.getAvailableBalance();
        await this.amount.fill(String(balance + 1));
        await this.verifyExistingBiller();
        await this.reviewPayment.click();
        await this.confirmPayment.click();
        await expect(this.billpayError).toContainText("Insufficient funds") ;
    }

    async futurepayment()
    {
        await this.fromAccount.click();
        await this.fromAccountOption.first().click();
        await this.amount.fill("5");
        await this.verifyExistingBiller();
        await this.paymentDate.pressSequentially("10262026")
        await this.reviewPayment.click();
        await this.confirmPayment.click();
        await expect(this.paymentSuccessMsg).toContainText("Payment Scheduled") ;

    }

    async paymentReviewConfirmation()
    {
        await this.fromAccount.click();
        await this.fromAccountOption.first().click();
        await this.amount.fill("5");
        await this.memo.fill("Test Payment");
        await this.verifyExistingBiller();
        await this.reviewPayment.click();
        await expect(this.billConfirmationSummary).toContainText("Everyday Checking");
        await expect(this.billConfirmationSummary).toContainText("City Electric Co.");
        await expect(this.billConfirmationSummary).toContainText("ACC-0042");
        await expect(this.billConfirmationSummary).toContainText("$5.00");

    }

}