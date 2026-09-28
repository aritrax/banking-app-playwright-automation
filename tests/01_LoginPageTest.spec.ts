import { test } from "../fixtures/testFixtures";
import { expect } from '@playwright/test';
import datset from '../logindata/logindata.json' ;

for (const data of datset)
{
    test(`${data.TestCase} Login Test ${data.Username} ${data.tag}`, async({page, poManager})=>
    {
        const loginPage = await poManager.getLoginPage();
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
