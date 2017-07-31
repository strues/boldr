import DataLoader from 'dataloader';
import logger from './services/logger';
import { db } from './services/db';

// Appends type information to an object, e.g. { id: 1 } => { __type: 'User', id: 1 };
function assignType(obj, typ) {
  obj.__type = type;
  return obj;
}

function mapTo(keys, keyFn, type, rows) {
  if (!rows) {
    return mapTo.bind(null, keys, keyFn, type);
  }
  const group = new Map(keys.map(key => [key, null]));
  rows.forEach(row => group.set(keyFn(row), assignType(row, type)));
  return Array.from(group.values());
}

function mapToMany(keys, keyFn, type, rows) {
  if (!rows) {
    return mapToMany.bind(null, keys, keyFn, type);
  }
  const group = new Map(keys.map(key => [key, []]));
  rows.forEach(row => group.get(keyFn(row)).push(assignType(row, type)));
  return Array.from(group.values());
}

export default {
  create: () => ({
    users: new DataLoader(keys =>
      db.table('user').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'User')),
    ),
    roles: new DataLoader(keys =>
      db.table('roles').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'Role')),
    ),
    articles: new DataLoader(keys =>
      db.table('articles').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'Article')),
    ),
    tags: new DataLoader(keys =>
      db.table('tags').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'Tag')),
    ),
    media: new DataLoader(keys =>
      db.table('media').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'Media')),
    ),
    settings: new DataLoader(keys =>
      db.table('setting').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'Setting')),
    ),
    pages: new DataLoader(keys =>
      db.table('page').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'Page')),
    ),
    menus: new DataLoader(keys =>
      db.table('menu').whereIn('id', keys).select('*').then(mapTo(keys, x => x.id, 'Menu')),
    ),
    details: new DataLoader(keys =>
      db
        .table('menu_detail')
        .whereIn('id', keys)
        .select('*')
        .then(mapTo(keys, x => x.id, 'MenuDetail')),
    ),
    // commentsByStory: new DataLoader(keys =>
    //   db
    //     .table('comments')
    //     .whereIn('story_id', keys)
    //     .select('*')
    //     .then(mapToMany(keys, x => x.story_id, 'Comment')),
    // ),
    //
    // commentsByParent: new DataLoader(keys =>
    //   db
    //     .table('comments')
    //     .whereIn('parent_id', keys)
    //     .select('*')
    //     .then(mapToMany(keys, x => x.story_id, 'Comment')),
    // ),
  }),
};
