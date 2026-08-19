import {Page ,test , expect, Locator} from '@playwright/test' ;
import { POManager } from '../pageobject/POManager';
import datset from '../logindata/logindata.json' ;

for (const data of datset)
{
    test(`${data.TestCase} Login Test ${data.Username} ${data.tag}`, async({page})=>
    {
        const poManger = new POManager(page) ;
        const loginPage = await poManger.getLoginPage();
        await loginPage.goto() ;
        await loginPage.Login(data.Username,data.Password) ;
        if (data.expectedResult === 'success')
            {
                await expect(page).toHaveURL("https://qaplayground.com/bank/dashboard") ;
            }    
        else
            {
                await expect(page.getByTestId("login-error-banner")).toBeVisible() ;
                const errorMessage =  await page.getByTestId("login-error-banner").textContent() ;
                console.log(errorMessage) ;
            }
            
    })
}
