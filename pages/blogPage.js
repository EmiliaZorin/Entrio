const { expect } = require('@playwright/test');

exports.Blog = class Blog {
  constructor(page) {
    this.page = page;
    this.mainHeadline = page.locator('h1[class="heading-1-titles"]', { hasText: 'Blog' });
    this.blocksContainer = page.locator('div[class="collection-list w-dyn-items"]');
  }

  async assertBlogLoaded() {
    await expect(this.mainHeadline).toBeVisible();
    const blogItem = await this.blocksContainer.getByRole('list');
    const blogItems = await blogItem.count();
    for (let i = 0; i < blogItems.length; i++) {
      await expect(blogItems.nth(i)).toBeVisible();
    }
  }
};
