import { Page, Locator, expect } from '@playwright/test'

export class LoanPage
{
    page: Page;
    loanHistory : Locator ;
    applyLoanButton : Locator ;
    loanType : Locator ;
    loanAmount : Locator ;
    loanTerm  : Locator ;
    loanInterest: Locator ;
    loanAccount: Locator ;
    reviewLoanButton : Locator ;
    loanPurpose : Locator ;
    submitLoanButton : Locator ;
    loanSuccessMsg : Locator ;
    loanErrorMsg : Locator ;
    loanHistoryRows : Locator ;
    loanSearchInput : Locator ;
    loanDateFromInput : Locator ;
    loanDateToInput : Locator ;
    loanSortDateHeader : Locator ;
    loanSortAmountHeader : Locator ;


    constructor(page: Page)
    {
        this.page = page ;
        this.loanHistory = page.getByTestId("loan-history-table") ;
        this.applyLoanButton = page.getByTestId("open-apply-loan-btn") ;
        this.loanType = page.getByText("Select loan type") ;
        this.loanAmount = page.getByTestId("loan-amount-input") ;
        this.loanTerm = page.getByTestId("loan-term-select") ;
        this.loanInterest = page.getByTestId("loan-interest-rate-input");
        this.loanAccount = page.getByTestId("loan-account-select") ;
        this.loanPurpose = page.getByPlaceholder("What will this loan be used for?") ;
        this.reviewLoanButton = page.getByTestId("review-loan-btn") ;
        this.submitLoanButton = page.getByTestId("confirm-loan-btn");
        this.loanSuccessMsg = page.getByText("Application Submitted") ;
        this.loanErrorMsg = page.getByTestId("apply-loan-error-message") ;
        this.loanHistoryRows = page.locator("table tbody tr") ;
        this.loanSearchInput = page.getByTestId("loan-search-input") ;
        this.loanDateFromInput = page.getByTestId("loan-date-from-input") ;
        this.loanDateToInput = page.getByTestId("loan-date-to-input") ;
        this.loanSortDateHeader = page.getByTestId("loan-sort-date-header") ;
        this.loanSortAmountHeader = page.getByTestId("loan-sort-amount-header") ;

    }

    async verifyApplyLoanPage() 
    {
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/apply-loan");
        await expect(this.loanHistory).toBeVisible() ;
        await expect(this.applyLoanButton).toBeEnabled();
    }

    async succesfullLoanValidation()
    {
        await this.applyLoanButton.click() ;
        await this.loanType.click() ;
        await this.page.getByRole("option", { name: "Personal" }).click();
        await this.loanAmount.fill("100") ;
        await this.loanTerm.click() ;
        await this.page.getByRole("option", { name: "12" }).click();
        await this.loanInterest.fill("5") ;
        await this.loanAccount.click() ;
        await this.page.getByRole("option", { name: "Everyday Checking" }).click();
        await this.loanPurpose.fill("Loan Wanted") ;
        await this.reviewLoanButton.click() ;
        await this.submitLoanButton.click() ;
    }

    async loanAmountValidation() 
    {
        await this.applyLoanButton.click() ;
        await this.loanType.click() ;
        await this.page.getByRole("option", { name: "Personal" }).click();
        await this.loanAmount.fill("250001") ;
        await this.loanTerm.click() ;
        await this.page.getByRole("option", { name: "12" }).click();
        await this.loanInterest.fill("5") ;
        await this.loanAccount.click() ;
        await this.page.getByRole("option", { name: "Everyday Checking" }).click();
        await this.loanPurpose.fill("Loan Wanted") ;
        await this.reviewLoanButton.click() ;
        await expect (this.loanErrorMsg).toContainText("Loan amount cannot exceed $250,000.") ;
    }

    async verifySubmittedLoanInHistory()
    {
        await this.applyLoanButton.click() ;
        await this.loanType.click() ;
        await this.page.getByRole("option", { name: "Personal" }).click();
        await this.loanAmount.fill("100") ;
        await this.loanTerm.click() ;
        await this.page.getByRole("option", { name: "12" }).click();
        await this.loanInterest.fill("5") ;
        await this.loanAccount.click() ;
        await this.page.getByRole("option", { name: "Everyday Checking" }).click();
        await this.loanPurpose.fill("Loan Wanted") ;
        await this.reviewLoanButton.click() ;
        await this.submitLoanButton.click() ;
        await expect(this.loanSuccessMsg).toBeVisible() ;
        await this.page.getByRole("button", { name: "Apply for Another Loan" }).click() ;
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/apply-loan") ;
        const newestLoan = this.loanHistoryRows.first() ;
        await expect(newestLoan).toContainText("Personal") ;
        await expect(newestLoan).toContainText("12 mo") ;
        await expect(newestLoan).toContainText("5%") ;
        await expect(newestLoan).toContainText("$100.00") ;
        await expect(newestLoan).toContainText("pending") ;
        await expect(newestLoan).toContainText(/LOAN-\d{8}-\d+/) ;
    }

    async verifyLoanHistoryPagination()
    {
        await expect(this.loanHistory).toBeVisible();
        const firstPageRows = await this.loanHistoryRows.count();
        expect(firstPageRows).toBe(5);
        await expect(this.page.getByText("Showing 1–5 of 6")).toBeVisible();
        await this.page.getByRole("button", { name: "2" }).click();
        await expect(this.page.getByText("Showing 6–6 of 6")).toBeVisible();
        const secondPageRows = await this.loanHistoryRows.count();
        expect(secondPageRows).toBe(1);
        await this.page.getByRole("button", { name: "1" }).click();
        await expect(this.page.getByText("Showing 1–5 of 6")).toBeVisible();
    }

    async verifyLoanHistoryFilterByType()
    {
        await expect(this.loanHistory).toBeVisible();
        await this.page.getByText("all").click();
        await this.page.getByRole("option", { name: "Personal" }).click();
        await expect(this.page.getByTestId("loan-type-filter-select")).toHaveText(/Personal/i);
        await expect(this.page.getByText("Showing 1–2 of 2")).toBeVisible();
        const filteredRows = await this.loanHistoryRows.count();
        expect(filteredRows).toBe(2);
        const rowTexts = await this.loanHistoryRows.allTextContents();
        for (const rowText of rowTexts)
        {
            expect(rowText.toLowerCase()).toContain("personal");
        }
        await this.page.getByText("Clear").click();
        await expect(this.page.getByText("Showing 1–5 of 6")).toBeVisible();
    }

    async verifyLoanHistorySearchByReferenceOrPurpose()
    {
        await expect(this.loanHistory).toBeVisible();
        await this.loanSearchInput.fill("LOAN-20260507-1002");
        await expect(this.loanHistory).toBeVisible() ;
        const filteredRows = await this.loanHistoryRows.count();
        expect(filteredRows).toBe(1);
        await expect(this.loanHistoryRows.first()).toContainText("LOAN-20260507-1002");
        await this.loanSearchInput.fill("");
        await expect(this.page.getByText("Showing 1–5 of 6")).toBeVisible();
    }

    async verifyLoanHistoryFilterByDateRange()
    {
        await expect(this.loanHistory).toBeVisible();
        await this.loanDateFromInput.fill("2026-03-11");
        await this.loanDateToInput.fill("2026-05-15");
        await expect(this.page.getByText("Showing 1–4 of 4")).toBeVisible();
        const filteredRows = await this.loanHistoryRows.allTextContents();
        expect(filteredRows.length).toBe(4);
        expect(filteredRows[0]).toContain("May 7, 2026");
        expect(filteredRows[3]).toContain("Mar 11, 2026");
        await this.loanDateFromInput.fill("");
        await this.loanDateToInput.fill("");
        await expect(this.page.getByText("Showing 1–5 of 6")).toBeVisible();
    }

    async verifyLoanHistorySortingByDateAndAmount()
    {
        await expect(this.loanHistory).toBeVisible();

         // Sort by Date - Ascending
        await this.loanSortDateHeader.click();

        await expect(this.loanSortDateHeader).toHaveAttribute("aria-sort", "ascending");

        const dateRows = await this.loanHistoryRows.allTextContents();

        const expectedDates = [
            "Mar 11, 2026",
            "Apr 2, 2026",
            "Apr 19, 2026",
            "May 7, 2026",
            "May 28, 2026"
        ];

        for (let i = 0; i < expectedDates.length; i++)
        {
            expect(dateRows[i]).toContain(expectedDates[i]);
        }

         // Sort by Amount - Descending
        await this.loanSortAmountHeader.click();

        await expect(this.loanSortAmountHeader).toHaveAttribute("aria-sort", "descending");

        const amountRows = await this.loanHistoryRows.allTextContents();

        const expectedAmounts = [
            "$45,000.00",
            "$15,000.00",
            "$12,000.00"
        ];

        for (let i = 0; i < expectedAmounts.length; i++)
        {
            expect(amountRows[i]).toContain(expectedAmounts[i]);
        }
    }


}
