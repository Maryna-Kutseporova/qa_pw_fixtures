import { test } from '../_fixtures/fixtures';

test('Create article with required fields', async ({ createArticlePage }) => {
  console.log(createArticlePage.article.title);
});
