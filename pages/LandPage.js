const { expect } = require('@playwright/test');

exports.LandPage = class LandPage {
  constructor(page) {
    this.page = page;
    this.topBar = page.locator('div[class="container"]');
    this.platformButton = page.locator('#w-dropdown-toggle-0');
    this.resourcesButton = page.locator('#w-dropdown-toggle-1');
    this.companyButton = page.locator('#w-dropdown-toggle-2');
    this.demoButton = page.locator('a[class="button-primary dropdown w-button"]', { hasText: 'Get a Demo' });
    this.mainArea = page.locator('div[class="hero-wrapper-2"]');
  }

  async assertLandPageLoaded() {
    await expect(this.topBar).toBeVisible();
    await expect(this.platformButton).toBeVisible();
    await expect(this.resourcesButton).toBeVisible();
    await expect(this.companyButton).toBeVisible();
    await expect(this.demoButton).toBeVisible();
    await expect(this.mainArea).toBeVisible();
  }

  async ClickOnResource(resourcePageName) {
    await this.resourcesButton.hover();
    await expect(this.page.locator('#w-dropdown-list-1')).toBeVisible();
    await this.page.locator('#w-dropdown-list-1').locator('a', { hasText: resourcePageName }).click();
  }
};
