
import { test, expect } from '@playwright/test';

test('Mainlocators', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.locator('input[name="name"]').first().fill('Sunil');
    //await page.locator('form input[name="name"]').fill('Sunil'); --> parent to child formation
    await page.locator('input[name="email"]').fill("sunilreddybyreddy@gmail.com");
    await page.getByPlaceholder("Password").fill("Jashvith@032722");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Gender").selectOption("Male");
    await page.getByLabel("Employed").check();
    await page.locator('input[name="bday"]').fill("1994-07-02");
    await page.getByRole("button", {name:'Submit'}).click();
    const textValidate = await page.getByText("Success! The Form has been submitted successfully!").isVisible();
    expect(textValidate).toBeTruthy();
    await page.getByRole("link",{name:'shop'}).click();

});