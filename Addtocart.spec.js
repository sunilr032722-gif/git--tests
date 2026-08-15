const {test,expect}=require('@playwright/test');

test('add items to the cart', async({page}) =>{

   const email= "sunilreddybyreddy@gmail.com"; 
   const productName='ZARA COAT 3';
   const products=page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill(email);
   await page.locator("#userPassword").fill("Jashvith@032722");
   await page.locator("[name='login']").click();
   await page.locator(".card-body b").first().textContent();
   await page.locator(".card-body b").first().waitFor();
   const count= await products.count();
   for(let i=0; i<count; i++)
   {
    if(await products.nth(i).locator("b").textContent()=== productName)
    {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
   }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool= await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=checkout").click();
    await page.getByRole('textbox').nth(1).fill("234");
    await page.getByRole('textbox').nth(2).fill("sunil kumar Reddy");
    //await page.getByRole('textbox').nth(3).fill("ABT567E");
    await page.getByPlaceholder('Select Country').pressSequentially("ind");
    const dropdowns = page.locator(".ta-results");
    await dropdowns.waitFor();
    const optionsCount= await dropdowns.locator("button").count();
    for(let i=0;i<optionsCount;i++)
    {
     const text = await dropdowns.locator("button").nth(i).textContent();    
        if(text ===" India")
        {
          await dropdowns.locator("button").nth(i).click();
          break;
        }

    }    
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID= await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log("OrderID is:",orderID);
    await page.locator("button[routerlink*=myorders]").click();
    await page.locator("tbody").waitFor();
    const rows= await page.locator("tbody tr");
    
    for(let i=0; i<await rows.count(); i++)
{
    const rowOrderId= await rows.nth(i).locator("th").textContent();
    if(orderID.includes(rowOrderId))
    {
        await rows.nth(i).locator("button").first().click();
        break;
    }
}

const orderIdDetails = await page.locator(".col-text").textContent();
expect(orderID.includes(orderIdDetails)).toBeTruthy();

});