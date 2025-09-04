import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitle = page.getByPlaceholder('Article Title');
    this.articleDescription = page.getByPlaceholder(
      `What's this article about?`,
    );
    this.articleText = page.getByPlaceholder('Write your article (in');
    this.articleTag = page.getByPlaceholder('Enter tags');
    this.updateArticleBtn = page.getByRole('button', {
      name: 'Update Article',
    });
    this.articleTitleHeader = page.getByRole('heading');
    this.newArticleTag = page.getByText('New tag');
    this.articleTagCross = page.locator('.ion-close-round');
    this.errorMessage = page.locator(
      'xpath = /html/body/div/div/div/div/div/ul/li/ul/li',
    );
  }

  async assertArticleTitle(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
  async editArticleTitle(title) {
    await test.step(`Edit the article title'`, async () => {
      await this.articleTitle.fill(title);
      await this.updateArticleBtn.click();
    });
  }

  async editArticleText(text) {
    await test.step(`Edit the article text'`, async () => {
      await this.articleText.fill(text);
      await this.updateArticleBtn.click();
    });
  }

  async editArticleDescription(desc) {
    await test.step(`Edit the article description'`, async () => {
      await this.articleDescription.fill(desc);
      await this.updateArticleBtn.click();
    });
  }

  async addArticleTag(tag) {
    await test.step(`Add the article tag`, async () => {
      await this.articleTag.fill(tag);
      await this.updateArticleBtn.click();
    });
  }

  async assertArticleDescriptionContainsNewDesc(text) {
    await test.step(`Assert article has new desc after changes`, async () => {
      await expect(this.articleDescription).toHaveValue(text);
    });
  }

  async assertArticleTextContainsNewText(text) {
    await test.step(`Assert article has new text after changes`, async () => {
      await expect(this.articleText).toHaveValue(text);
    });
  }

  async assertNewArticleTagVisible() {
    await test.step(`Assert new article tag is visible`, async () => {
      await expect(this.newArticleTag).toBeVisible();
    });
  }

  async removeArticleTag(tag) {
    await test.step(`Remove the article tag "${tag}`, async () => {
      await this.articleTagCross.first().click();
      await this.updateArticleBtn.click();
    });
  }

  async assertArticleTagNotVisible(tag) {
    await test.step(`Assert tag "${tag}" is not visible`, async () => {
      await expect(this.page.getByText(tag)).toBeHidden();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
