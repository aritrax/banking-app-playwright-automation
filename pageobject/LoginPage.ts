import {Page ,test , expect, Locator} from '@playwright/test'

export class LoginPage 
{   
    page : Page ;
    userName : Locator ;
    passWord : Locator ;
    signinButton : Locator ;

    constructor(page: Page)
    {
        this.page = page ;
        this.userName = page.locator("#login-username") ;
        this.passWord = page.locator("#login-password") ; 
        this.signinButton = page.getByRole('button' , {name : "Sign In"})
    }

    async goto()
    {
        await this.page.goto("https://qaplayground.com/bank/login") ;
    }
    
    async Login(Username : string , Password: string)
    {
        await this.userName.fill(Username) ;
        await this.passWord.fill(Password) ;
        await this.signinButton.click() ;
    }
}