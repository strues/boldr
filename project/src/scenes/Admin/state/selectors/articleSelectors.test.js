import {
  selectArticleForm,
  selectArticleFormValues,
  selectArticleFormSyncErrors,
} from './articleSelectors';

describe('admin selectors', () => {
  test('should select the boldr state', () => {
    const articleState = {};
    const mockedState = {
      form: {
        articleForm: articleState,
      },
    };
    expect(selectArticleForm(mockedState)).toEqual(articleState);
  });
});
