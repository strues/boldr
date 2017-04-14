import { schema } from 'normalizr';
import { user } from '../users/schema';

const media = new schema.Entity(
  'media',
  {
    owner: user,
  },
  { idAttribute: 'id' },
);

const arrayOfMedia = new schema.Array(media);

export { media, arrayOfMedia };

/*
id
userId
fileName
safeName
thumbName
safeName
thumbName
 */
