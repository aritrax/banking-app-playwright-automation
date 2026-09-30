import { Page, Locator, expect } from '@playwright/test'

export class TransactionPage
{
    page: Page;
    transactionsTableWrapper: Locator;
    transactionRows: Locator;
    transactionDescriptions: Locator;
    accountFilter: Locator;
    searchInput: Locator;
    typeFilter: Locator;
    dateSortHeader: Locator;
    amountSortHeader: Locator;
    transactionDates: Locator;
    transactionAmounts: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.transactionsTableWrapper = page.getByTestId("all-transactions-table-wrapper");
        this.transactionRows = page.getByTestId("all-txn-row");
        this.transactionDescriptions = page.getByTestId("all-txn-description");
        this.accountFilter = page.getByTestId("all-txn-account-select");
        this.searchInput = page.getByTestId("all-txn-search-input");
        this.typeFilter = page.getByTestId("all-txn-type-filter");
        this.dateSortHeader = page.getByTestId("all-txn-sort-date-header");
        this.amountSortHeader = page.getByTestId("all-txn-sort-amount-header");
        this.transactionDates = page.getByTestId("all-txn-date");
        this.transactionAmounts = page.getByTestId("all-txn-amount");
    }

    async verifyTransactionPage()
    {
        await expect(this.page).toHaveURL("https://qaplayground.com/bank/transactions");
        await expect(this.transactionsTableWrapper).toBeVisible();
        await expect(this.transactionRows.first()).toBeVisible();
    }
    async verifyTransactionsByAccount()
    {
        await this.accountFilter.click();
        await this.page.getByRole("option", { name: "Everyday Checking" }).click();

        const rows = this.transactionRows;
        await expect(rows.first()).toBeVisible();
        const totalRows = await rows.count();
        expect(totalRows).toBeGreaterThan(0);
    }

    async verifyTransactionsByType()
    {
        await this.page.getByRole("button", { name: "Credits" }).click();

        let totalRows = await this.transactionRows.count();
        expect(totalRows).toBeGreaterThan(0);

        await this.page.getByRole("button", { name: "Debits" }).click();

        totalRows = await this.transactionRows.count();
        expect(totalRows).toBeGreaterThan(0);

        await this.page.getByRole("button", { name: "All" }).click();
    }

    async verifyTransactionsByDescriptionSearch()
    {
        await this.searchInput.fill("Whole Foods Market");
        await expect(this.transactionDescriptions.first()).toContainText("Whole Foods Market");
    }

    async verifyTransactionsSortedByDate()
    {
        await this.dateSortHeader.click();
        await expect(this.dateSortHeader).toHaveAttribute("aria-sort", "ascending");

        await this.dateSortHeader.click();
        await expect(this.dateSortHeader).toHaveAttribute("aria-sort", "descending");
    }

    async verifyTransactionsSortedByAmount()
    {
        await this.amountSortHeader.click();
        await expect(this.amountSortHeader).toHaveAttribute("aria-sort", "descending");

        await this.amountSortHeader.click();
        await expect(this.amountSortHeader).toHaveAttribute("aria-sort", "ascending");
    }

    async verifyMultipleTransactionFilters()
    {
        await this.searchInput.fill("Netflix");
        await this.accountFilter.click();
        await this.page.getByRole("option", { name: "Everyday Checking" }).click();
        await this.page.getByRole("button", { name: "Debits" }).click();

        const rows = await this.transactionRows.count();
        expect(rows).toBeGreaterThan(0);

        const allDescriptions = await this.transactionDescriptions.allTextContents();
        for (const description of allDescriptions)
        {
            expect(description.toLowerCase()).toContain("netflix");
        }
    }

    async verifyTransactionDetailRowDisplay()
    {
        const firstRow = this.transactionRows.first();
        await expect(firstRow).toBeVisible();

        await expect(firstRow.getByTestId("all-txn-date")).toBeVisible();
        await expect(firstRow.getByTestId("all-txn-description")).toContainText("Direct Deposit");
        await expect(firstRow.getByTestId("all-txn-category-badge")).toBeVisible();
        await expect(firstRow.getByTestId("all-txn-amount")).toBeVisible();
    }

    async verifyNoTransactionsMessageForEmptyResults()
    {
        await this.searchInput.fill("No Real Match Value 123456");
        await expect(this.page.getByText("No transactions match your filters.")).toBeVisible();
    }
}
