const { test, expect } = require('@playwright/test');
const { LandPage } = require('../pages/LandPage');
const { ResourceCenter } = require('../pages/resourcePage');
const { values } = require('../support/values');
const { selectors } = require('../support/selectors');
const { Calculator } = require('../pages/calculatorPage');
const { Blog } = require('../pages/blogPage');

test.describe('Scenarios', () => {
  let landPage;
  let resourceCenter;
  let calcPage;
  let blogPage;

  test.beforeEach(async ({ page }) => {
    landPage = new LandPage(page);
    resourceCenter = new ResourceCenter(page);
    calcPage = new Calculator(page);
    blogPage = new Blog(page);
    await page.goto(values.url);
    await landPage.assertLandPageLoaded();
    await page.waitForTimeout(2000);
    if (await page.locator(selectors.cookiesPopup).isVisible()) {
      await page.locator(selectors.accpetAllCookieButton).first().click();
    }
  });

  test('Resource Center - Step 1', async ({ page }) => {
    await landPage.ClickOnResource(values.resourceCenterButton);
  });

  test('Resource Center - Step 2.1', async ({ page }) => {
    await landPage.ClickOnResource(values.resourceCenterButton);
    await page.waitForTimeout(1500);
    await landPage.ClickOnResource(values.resourceCenterButton);
    await resourceCenter.assertResourceCenterLoaded();
    await page.locator(selectors.resourceDivOne).locator(selectors.blueArrow).click();
    await expect(resourceCenter.summeryContainer).toBeVisible();
    await expect(resourceCenter.form).toBeVisible();
    //step 2.1.1
    await resourceCenter.fillForm(values.firstName, values.lastName, values.companyName, values.emailAddress);
  });

  test('Resource Center - Step 2.2', async ({ page }) => {
    await landPage.ClickOnResource(values.resourceCenterButton);
    await page.waitForTimeout(1500);
    await landPage.ClickOnResource(values.resourceCenterButton);
    await resourceCenter.assertResourceCenterLoaded();
    await page.locator(selectors.resourceWideDivOne).locator(selectors.resourceImageWide).click();
    await resourceCenter.demoPageLoaded();
  });

  test('Blog - Step 2', async ({ page }) => {
    await landPage.ClickOnResource(values.blogButton);
    await page.waitForTimeout(1500);
    await landPage.ClickOnResource(values.blogButton);
    await blogPage.assertBlogLoaded();
  });

  test('ROI Calculator - Step 2', async ({ page }) => {
    await landPage.ClickOnResource(values.roiCalculatorButton);
    await page.waitForTimeout(1500);
    await landPage.ClickOnResource(values.roiCalculatorButton);
    await calcPage.assertCalculatorLoaded();
    await calcPage.editEmployeeAmount(values.increaseAction, values.employeeAmount);
  });
});
