import { test as base } from '@playwright/test';
import { generateNewUserData } from '../../src/common/testData/generateNewUserData';
import { generateNewArticleData } from '../../src/common/testData/generateNewArticleData';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { ViewArticlePage } from '../../src/ui/pages/article/ViewArticlePage';
import { EditArticlePage } from '../../src/ui/pages/article/EditArticlePage';

export const test = base.extend<{
  createArticlePage: { article: any; responseBody: any };
  viewArticlePage: ViewArticlePage;
  editArticlePage: EditArticlePage;
  articleWithoutTags: { article: any };
  articleWithOneTag: { article: any };
  articleWithTwoTags: { article: any };
  logger: any;
}>({
  createArticlePage: async ({ page, logger }, use) => {
    const user = generateNewUserData(logger);
    const article = generateNewArticleData(logger, 2);

    await signUpUser(page, user);

    const [response] = await Promise.all([
      page.waitForResponse(
        res =>
          res.url().includes('/articles') && res.request().method() === 'POST',
      ),
      createNewArticle(page, article),
    ]);

    const responseBody = await response.json();

    await use({ article, responseBody });
  },

  articleWithoutTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 0);
    await use({ article });
  },

  articleWithOneTag: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 1);
    await use({ article });
  },

  articleWithTwoTags: async ({ logger }, use) => {
    const article = generateNewArticleData(logger, 2);
    await use({ article });
  },

  viewArticlePage: async ({ page }, use) => {
    const viewArticlePage = new ViewArticlePage(page);

    await use(viewArticlePage);
  },

  editArticlePage: async ({ page }, use) => {
    const editArticlePage = new EditArticlePage(page);

    await use(editArticlePage);
  },
});
