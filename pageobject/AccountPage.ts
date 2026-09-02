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
    transactionSearch : Locator ;
    transactionSearchNoMatch : Locator ;
    txnDatefrom : Locator ;
    txnDateto : Locator ;
    transactionTypeAll: Locator;
    transactionTypeCredit: Locator;
    transactionTypeDebit: Locator;
    transactionRow: Locator;
    dateSortHeader: Locator;
    amountSortHeader: Locator;
    transactionDatesort: Locator;
    transactionAmount: Locator;

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
        this.transactionSearch = page.getByTestId("txn-search-input") ;
        this.transactionSearchNoMatch = page.getByText("No transactions match your filters.") ;
        this.txnDatefrom = page.getByTestId("txn-date-from-input") ;
        this.txnDateto = page.getByTestId("txn-date-to-input")
        this.transactionTypeAll = page.getByRole("button", { name: "All" });    
        this.transactionTypeCredit = page.getByRole("button", { name: "Credits" });
        this.transactionTypeDebit = page.getByRole("button", { name: "Debits" });
        this.transactionRow = page.getByTestId("transaction-row");
        this.dateSortHeader = page.getByTestId("sort-date-header");
        this.amountSortHeader = page.getByTestId("sort-amount-header");
        this.transactionDatesort = page.getByTestId("txn-date");
        this.transactionAmount = page.getByTestId("txn-amount");
        

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

    async verifyTransactionSearch()
    {
        await this.viewButton.click() ;
        await this.transactionSearch.fill("Whole Foods Market");
        await expect(this.transcationDesp.first()).toHaveText("Whole Foods Market");
    }

    async verifyTransactionSearchNoMatch()
    {
        await this.viewButton.click() ;
        await this.transactionSearch.fill("Direct Foods Market");
        await expect(this.transactionSearchNoMatch).toBeVisible() ;
    }

    async verifyTransactionSearchByDate()
    {
        await this.viewButton.click() ;
        await this.txnDatefrom.pressSequentially("06182026") ;
        await this.txnDateto.pressSequentially("06202026") ;
        await expect(this.transcationDesp.first()).toHaveText("City Electric Co.");
        await expect(this.transcationDesp.nth(1)).toHaveText("Amazon.com");
        await expect(this.transcationDesp.nth(2)).toHaveText("Uber");
    }

    async verifyTransactionFilterByType()
    {   
        await this.viewButton.click() ;
        // Credits
        await this.transactionTypeCredit.click();

        const creditTransactions =
            this.page.locator('[data-testid="transaction-row"][data-type="credit"]');

        await expect(this.transactionRow.first()).toBeVisible();

        const totalCreditRows = await this.transactionRow.count();
        const actualCreditRows = await creditTransactions.count();

        expect(actualCreditRows).toBe(totalCreditRows);

        //Debit 

        await this.transactionTypeDebit.click() ;

        const debitTransaction = 
            this.page.locator('[data-testid="transaction-row"][data-type="debit"]');

        const totalDebitRows = await this.transactionRow.count();
        const actualDebitRows = await debitTransaction.count();

        expect(actualDebitRows).toBe(totalDebitRows);    

        // All

        await this.transactionTypeAll.click();
        const allTransactions = this.transactionRow;
        const totalRows = await this.transactionRow.count();
        await expect(allTransactions.first()).toBeVisible();
    }

    async verifyTransactiondSorting()
    {   
        await this.viewButton.click() ;
        // Sort by Date - Ascending

        await this.dateSortHeader.click();

        await expect(this.dateSortHeader)
            .toHaveAttribute("aria-sort", "ascending");

        const dates = await this.transactionDatesort
            .locator("time")
            .evaluateAll(elements =>
            elements.map(element => element.getAttribute("datetime"))
            );

        const sortedDatesAscending = [...dates].sort();

        expect(dates).toEqual(sortedDatesAscending);


        // Sort by Date - Descending

        await this.dateSortHeader.click();

        await expect(this.dateSortHeader)
            .toHaveAttribute("aria-sort", "descending");

        const datesDescending = await this.transactionDatesort
            .locator("time")
            .evaluateAll(elements =>
            elements.map(element => element.getAttribute("datetime"))
            );

        const sortedDatesDescending = [...datesDescending].sort().reverse();

        expect(datesDescending).toEqual(sortedDatesDescending);

        // Sort by Amount - Descending

         await this.amountSortHeader.click();

        await expect(this.amountSortHeader)
        .toHaveAttribute("aria-sort", "descending");

        const amountsDescending = await this.transactionAmount.evaluateAll(elements =>
            elements.map(element =>
            Number(element.getAttribute("data-amount"))
        )
        );

        const sortedAmountsDescending = [...amountsDescending].sort((a, b) => b - a);

        expect(amountsDescending).toEqual(sortedAmountsDescending);
    }


    async verifyCombinedTransactionFilters()
    {
     await this.viewButton.click();

        // Search by description
        await this.transactionSearch.fill("Netflix");

        // Apply date range
        await this.txnDatefrom.pressSequentially("06012026");
        await this.txnDateto.pressSequentially("06302026");

        // Filter by Debit
        await this.transactionTypeDebit.click();

        // Verify at least one transaction is displayed
        const totalTransactions = await this.transactionRow.count();

        expect(totalTransactions).toBeGreaterThan(0);

        // Verify every displayed transaction matches all filters
        for(let i = 0; i < totalTransactions; i++)
        {
            const transaction = this.transactionRow.nth(i);

            // Verify transaction is Debit
            await expect(transaction).toHaveAttribute("data-type", "debit");

            // Verify description contains Netflix
            await expect(
                transaction.getByTestId("txn-description")
                ).toContainText("Netflix");

            // Verify date is within selected range
            const date = transaction
                .getByTestId("txn-date")
                .locator("time");

            const transactionDate =
                await date.getAttribute("datetime");

            expect(transactionDate).not.toBeNull();

            expect(transactionDate! >= "2026-06-01").toBeTruthy();
            expect(transactionDate! <= "2026-06-30").toBeTruthy();
        }
    }
}