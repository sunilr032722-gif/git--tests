import {test, expect} from '@playwright/test';

test("Handle Child windows", async({browser})=>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("a[href*='documents-request']");

    const [newPage]= await Promise.all(  // it has 3 states Pending,Rejected and Fulfilled. used to run asynchronous operations simultaniously
       [context.waitForEvent("page"),
        documentLink.click(),
       ])
const msg1 = await newPage.locator(".red").innerText();
let arrayText = msg1.split("@")[1].split(" ")[0];
//console.log(arrayText);
await page.locator("#username").fill(arrayText);
//await page.pause();
console.log(await page.locator("#username").inputValue());

});
