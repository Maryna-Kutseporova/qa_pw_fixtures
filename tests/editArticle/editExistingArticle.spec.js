import { test } from '../_fixtures/fixtures';
import {
  TITLE_CANNOT_BE_EMPTY,
  DESCRIPTION_CANNOT_BE_EMPTY,
  BODY_CANNOT_BE_EMPTY,
} from '../../src/ui/constants/articleErrorMessages';

test('Edit the article title for the existing article', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  const newTitle = 'Changed title';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleTitle(newTitle);
  await viewArticlePage.waitForURLAndRefreshPage();
  await viewArticlePage.assertArticleTitleIsVisible(newTitle);
});

test('Edit the article description for the existing article', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  const newDesc = 'Changed description';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleDescription(newDesc);
  await viewArticlePage.clickEditArticle();
  await editArticlePage.assertArticleDescriptionContainsNewDesc(newDesc);
});

test('Edit the article text for the existing article', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  const newText = 'Changed text';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleText(newText);
  await viewArticlePage.clickEditArticle();
  await editArticlePage.assertArticleTextContainsNewText(newText);
});

test('Add the tag for the existing article without tags', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  const newTag = 'New tag';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.addArticleTag(newTag);
  await editArticlePage.assertNewArticleTagVisible();
});

test('Add the tag for the existing article with tags', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  const newTag = 'New tag';

  await viewArticlePage.clickEditArticle();
  await editArticlePage.addArticleTag(newTag);
  await editArticlePage.assertNewArticleTagVisible();
});

test('Remove article tag for existing article with tag', async ({
  viewArticlePage,
  editArticlePage,
  createArticlePage,
}) => {
  void createArticlePage;
  const { responseBody } = createArticlePage;
  const existingTag = responseBody.article.tagList[0];
  await viewArticlePage.clickEditArticle();
  await editArticlePage.removeArticleTag(existingTag);
  await viewArticlePage.clickEditArticle();
  await editArticlePage.assertArticleTagNotVisible(existingTag);
});

test('Remove the article title for the existing article', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleTitle('');
  await editArticlePage.assertErrorMessageContainsText(TITLE_CANNOT_BE_EMPTY);
});

test('Remove the article desc for the existing article', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleDescription('');
  await editArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});

test('Remove the article body for the existing article', async ({
  createArticlePage,
  viewArticlePage,
  editArticlePage,
}) => {
  void createArticlePage;
  await viewArticlePage.clickEditArticle();
  await editArticlePage.editArticleText('');
  await editArticlePage.assertErrorMessageContainsText(BODY_CANNOT_BE_EMPTY);
});
