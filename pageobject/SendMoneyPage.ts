import {Page ,test , expect, Locator} from '@playwright/test'

export class SendMoneyPage
{
    page : Page ;
    sendMoneyFrom : Locator ;
    sendMoneyFromOption : Locator ;
    payeeSelect : Locator ;
    payeeSelectOption : Locator ;
    amount : Locator ;
    note : Locator ;
    reviewSendButton : Locator ;
    cancelButton : Locator ; 
    confirmSendButton : Locator ;
    successfulMsg : Locator ;
    addpayeeButton : Locator ; 
    payeeName : Locator ;
    payeeBank : Locator;
    payeeRoutingNumber : Locator ;
    payeeAccountNumber : Locator ;
    savepayeeButton : Locator ;
    addpayeeErrorMsg : Locator ;
    amountErrorMsg : Locator ;
    everyDayCheckingAccount : Locator ;
    confirmNote : Locator ;
    confirmFromAccount : Locator ;
    confirmPayeeAccount : Locator ;
    confirmAmount : Locator ; 

    constructor(page : Page)
    {
        this.page = page ;
        this.sendMoneyFrom = page.getByTestId("send-from-account-select") ;
        this.sendMoneyFromOption = page.getByTestId("send-from-option") ;
        this.payeeSelect = page.getByTestId("payee-select") ;
        this.payeeSelectOption = page.getByTestId("payee-select-option") ;
        this.amount = page.getByTestId("send-amount-input") ;
        this.note = page.getByTestId("send-note-input") ;
        this.reviewSendButton = page.getByTestId("review-send-btn") ;
        this.cancelButton = page.getByTestId("cancel-send-btn") ;
        this.confirmSendButton = page.getByTestId("confirm-send-btn") ;
        this.successfulMsg = page.getByText("Money Sent Successfully") ;
        this.addpayeeButton = page.getByTestId("add-payee-btn") ;
        this.payeeName = page.getByTestId("add-payee-name-input") ;
        this.payeeBank = page.getByTestId("add-payee-bank-input") ;
        this.payeeRoutingNumber = page.getByTestId("add-payee-routing-input") ;
        this.payeeAccountNumber = page.getByTestId("add-payee-account-input") ;
        this.savepayeeButton = page.getByTestId("save-add-payee-btn") ;
        this.addpayeeErrorMsg = page.getByText("Routing number must be exactly 9 digits.") ;
        this.amountErrorMsg = page.getByTestId("send-money-error") ;
        this.everyDayCheckingAccount = page.getByRole("option", {name: /Everyday Checking/});
        this.confirmNote = page.getByTestId("confirm-note") ;
        this.confirmFromAccount = page.getByTestId("confirm-from-account") ;
        this.confirmPayeeAccount = page.getByTestId("confirm-to-payee") ;
        this.confirmAmount = page.getByTestId("confirm-amount") ;
    }

    async verifysendMoneyPage()
    {
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/send-money");
    }

    async verifySendMoneyFrom()
    {
        await this.sendMoneyFrom.click() ;
        await expect(this.sendMoneyFromOption.first()).toBeVisible();
        await this.sendMoneyFromOption.first().click();
        await this.payeeSelect.click();
        await expect(this.payeeSelectOption.first()).toBeVisible();
        await this.payeeSelectOption.first().click();
        await expect(this.amount).toBeVisible();
        await expect(this.note).toBeVisible();
        await expect(this.reviewSendButton).toBeVisible();
        await expect(this.cancelButton).toBeVisible();
    }

    async selectAccountAndPayee() 
    {
        await this.sendMoneyFrom.click();
        await this.sendMoneyFromOption.first().click();
        await this.payeeSelect.click();
        await this.payeeSelectOption.first().click();
    }

    async successfulSendMoney ()
    {
        await this.selectAccountAndPayee();
        await this.amount.fill("5");
        await this.note.fill("Dinner Last Night");
        await this.reviewSendButton.click();
        await this.confirmSendButton.click() ;
        await expect(this.successfulMsg).toBeVisible() ; 
    }

    async verifyAddPayeeValidation()
    { 
        await this.addpayeeButton.click() ;
        await this.payeeName.fill("ABC XYZ");
        await this.payeeBank.fill("SBI") ;
        await this.payeeRoutingNumber.fill("1234567");
        await this.payeeAccountNumber.fill("7654321");
        await this.savepayeeButton.click() ;
        await expect(this.addpayeeErrorMsg).toBeVisible() ;
    }

    async verifySendMoneyAmountValidation()
    {   
        // Zero Amount 
        await this.selectAccountAndPayee();
        await this.amount.fill("0");
        await this.reviewSendButton.click();
        await expect(this.amountErrorMsg).toContainText("Please enter a valid amount") ; 

        // Negetive Ammount 
        await this.amount.fill("-5");
        await this.reviewSendButton.click();
        await expect(this.amountErrorMsg).toContainText("Please enter a valid amount") ;
    }

    async getAvailableBalance()
    {
        await this.sendMoneyFrom.click();
        const balanceText = await this.everyDayCheckingAccount.textContent();
        await this.everyDayCheckingAccount.click();
        return Number(balanceText?.match(/\$[\d,]+(?:\.\d{2})?/)?.[0].replace(/[$,]/g, ""));
    }

    async verifyInsufficientFunds() 
    {
        await this.selectAccountAndPayee();
        const balance = await this.getAvailableBalance();
        await this.amount.fill(String(balance + 1));
        await this.reviewSendButton.click();
        await this.confirmSendButton.click() ;
        await expect(this.amountErrorMsg).toContainText("Insufficient funds");
    }

    async verifysavepayee()
    {
        await this.addpayeeButton.click() ;
        const payeeName = `TestPayee${Math.floor(Math.random() * 1000)}`;
        await this.payeeName.fill(payeeName);
        await this.payeeBank.fill("SBI") ;
        const routingNumber = String(Math.floor(100000000 + Math.random() * 900000000));
        await this.payeeRoutingNumber.fill(routingNumber);
        const AccountNumber = String(Math.floor(100000000 + Math.random() * 900000000));
        await this.payeeAccountNumber.fill(AccountNumber);
        await this.savepayeeButton.click() ;

        await this.payeeSelect.click();
        await expect(this.page.getByRole("option", { name: payeeName })).toBeVisible();
    }

    async verifySendMoneyDetails()
    {
        await this.successfulSendMoney()
        await expect(this.confirmFromAccount).toContainText("Everyday Checking");
        await expect(this.confirmPayeeAccount).toContainText("Rahul") ;
        await expect(this.confirmNote).toContainText("Dinner Last Night") ; 
        await expect(this.confirmAmount).toContainText("$5.00") ;
    }
}