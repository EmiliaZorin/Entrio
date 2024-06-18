const { expect } = require('@playwright/test');

exports.Calculator = class Calculator {
  constructor(page) {
    this.page = page;
    this.mainHeadline = page.locator('h1[class="heading-1-titles"]', { hasText: 'ROI Calculator' });
    this.iframeCalc = page.frameLocator('[frameborder="0"]');
    this.mainCalcContainer = this.iframeCalc.locator('div[class="container main-container"]');
    this.slider = this.iframeCalc.locator('mat-slider[role="slider"]');
    this.titleBox = this.iframeCalc.locator('div[class="roi-slider-title-box"]');
    this.result = this.iframeCalc.locator('div[class="roi-result"]');
  }

  async assertCalculatorLoaded() {
    await this.mainHeadline.click();
    await expect(this.mainCalcContainer).toBeVisible();
  }

  async editEmployeeAmount(action, amount) {
    const currentEmployeeAmount = await this.titleBox.first().locator('input').inputValue();
    const currentSavingsAmount = await this.result.locator('div[class="total-value"]').first().innerText();
    const currentSavingAmountNumber = currentSavingsAmount.slice(1, currentSavingsAmount.length - 1);
    if (action == 'increase') {
      await this.titleBox
        .first()
        .locator('input')
        .fill(currentEmployeeAmount + amount);
      await this.titleBox.first().locator('input').press('Enter');
    }
    const newSavingsAmount = await this.result.locator('div[class="total-value"]').first().innerText();
    const newSavingsAmountNumber = newSavingsAmount.slice(1, currentSavingsAmount.length - 1);
    await expect(parseInt(newSavingsAmountNumber)).toBeGreaterThan(parseInt(currentSavingAmountNumber));
    await this.page.pause();
  }
};
