import { schema } from 'normalizr';
import { user } from '../../../../state/modules/users/schema';
import { tag } from '../tags/schema';

const article = new schema.Entity(
  'articles',
  {
    author: user,
    tags: [tag],
  },
  { idAttribute: 'slug' },
);

const arrayOfArticle = new schema.Array(article);

export { article, arrayOfArticle };
