import { test } from '../_fixtures/fixtures';

test('Create article with required fields', async ({
  viewArticlePage,
  createdArticle,
}) => {
  await test.step('Assert article title is visible', async () => {
    await viewArticlePage.assertArticleTitleIsVisible(
      createdArticle.article.title,
    );
  });
});
