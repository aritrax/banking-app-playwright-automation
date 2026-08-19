import {Page ,test , expect, Locator} from '@playwright/test' ;
import { LoginPage } from './LoginPage'; 

export class POManager
{
    page : Page ;
    loginPage: LoginPage ; 

    constructor(page: Page)
    {
        this.page = page ; 
        this.loginPage = new LoginPage(this.page) 
    }

    async getLoginPage()
    {
        return this.loginPage ;
    }

}
