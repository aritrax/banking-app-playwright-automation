import {Page ,test , expect, Locator} from '@playwright/test' ;
import { LoginPage } from './LoginPage'; 
import { DashBoard } from './DashBoard';
import { TransferPage } from './TransferPage';
import { AccountPage } from './AccountPage';

export class POManager
{
    page : Page ;
    loginPage: LoginPage ; 
    dashBoard : DashBoard ;
    transferPage : TransferPage ;
    accountPage : AccountPage ;

    constructor(page: Page)
    {
        this.page = page ; 
        this.loginPage = new LoginPage(this.page) ;
        this.dashBoard = new DashBoard(this.page) ;
        this.transferPage = new TransferPage(this.page) ;
        this.accountPage = new AccountPage(this.page) ;
    }

    async getLoginPage()
    {
        return this.loginPage ;
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

}
