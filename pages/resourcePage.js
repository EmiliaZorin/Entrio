const { expect } = require('@playwright/test');

exports.ResourceCenter = class ResourceCenter {
  constructor(page) {
    this.page = page;
    this.mainHeadline = page.locator('h1[class="heading-1-titles"]', { hasText: 'Resource Center' });
    this.blocksContainer = page.locator('div[class="w-layout-blockcontainer container w-container"]').last();
    this.blogsHeadline = page.locator('h2', { hasText: 'Blog' });
    this.blogsContainer = page.locator('div[class="collection-list w-dyn-items"]');
    this.arrowButton = page.locator('svg[class="bi bi-arrow-right-circle-fill"]');
    this.summeryContainer = page.locator('div[class="w-layout-layout quick-stack-6 wf-layout-layout"]');
    this.form = page.locator('div[class="w-layout-cell cell-6"]');
    this.iframeForm = page.frameLocator('#hs-form-iframe-0');
    this.firstNameField = this.iframeForm.locator('input[name="firstname"]');
    this.lastNameField = this.iframeForm.locator('input[name="lastname"]');
    this.companyField = this.iframeForm.locator('input[name="company"]');
    this.mailField = this.iframeForm.locator('input[name="email"]');
    this.submitButton = this.iframeForm.locator('input[class="hs-button primary large"]');
    this.iframePlayer = page.frameLocator('#player');
    this.mainPlayerArea = this.iframePlayer.locator('div[class="w-vulcan-overlays-table w-css-reset"]');
    this.mediaPlayerLowerBar = this.iframePlayer.locator('div[class="w-bottom-bar-lower w-css-reset"]');
    this.mediaPlayerSummery = this.page.locator('div[class="w-richtext"]');
    this.playButton = this.iframePlayer.locator('button[aria-label="Play Video"]');
  }

  async assertResourceCenterLoaded() {
    await expect(this.mainHeadline).toBeVisible();
    await expect(this.blocksContainer).toBeVisible();
    await expect(this.blogsHeadline).toBeVisible();
    await expect(this.blogsContainer).toBeVisible();
  }

  async fillForm(firstName, lastName, companyName, email) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.companyField.fill(companyName);
    await this.mailField.fill(email);
    await expect(this.iframeForm.getByText('Email must be formatted correctly.')).toBeVisible();
  }

  async demoPageLoaded() {
    await expect(this.page.locator('h1', { hasText: 'A Responsible Tech Adoption Overview' })).toBeVisible();
    await expect(this.mediaPlayerSummery).toBeVisible();
  }
};
