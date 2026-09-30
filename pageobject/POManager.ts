import {Page ,test , expect, Locator} from '@playwright/test' ;
import { LoginPage } from './LoginPage'; 
import { DashBoard } from './DashBoard';
import { TransferPage } from './TransferPage';
import { AccountPage } from './AccountPage';
import { SendMoneyPage } from './SendMoneyPage';
import { PayBillPage } from './PayBillPage';
import { TransactionPage } from './TransactionPage';
import { LoanPage } from './LoanPage';

export class POManager
{
    page : Page ;
    loginPage: LoginPage ; 
    dashBoard : DashBoard ;
    transferPage : TransferPage ;
    accountPage : AccountPage ;
    sendmoneyPage : SendMoneyPage;
    payBillPage: PayBillPage;
    transactionPage: TransactionPage;
    loanPage : LoanPage ;

    constructor(page: Page)
    {
        this.page = page ; 
        this.loginPage = new LoginPage(this.page) ;
        this.dashBoard = new DashBoard(this.page) ;
        this.transferPage = new TransferPage(this.page) ;
        this.accountPage = new AccountPage(this.page) ;
        this.sendmoneyPage = new SendMoneyPage(this.page) ;
        this.payBillPage = new PayBillPage(this.page) ;
        this.transactionPage = new TransactionPage(this.page) ;
        this.loanPage = new LoanPage(this.page) ;

    }

    async getLoginPage()
    {
        return this.loginPage ;
    }

    async getDashboard()
    {
        return this.dashBoard ;
    }

    async getDashBoard()
    {
        return this.dashBoard ;
    }
    
    async getTransferPage()
    {
        return this.transferPage ;
    }

    async getAccountPage()
    {
        return this.accountPage ;
    }

    async getSendMoneyPage()
    {
        return this.sendmoneyPage ;
    }

    async sendMoneyPage()
    {
        return this.sendmoneyPage ;
    }

    async getPayBillPage()
    {
        return this.payBillPage ;
    }

    async getTransactionPage()
    {
        return this.transactionPage ;
    }

    async getloanPage()
    {
        return this.loanPage ;
    }

}
