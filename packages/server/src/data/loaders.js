import DataLoader from 'dataloader';
import { db } from '../services/db';
import Menu from '../models/Menu';
import MenuDetail from '../models/MenuDetail';

// Appends type information to an object, e.g. { id: 1 } => { __type: 'User', id: 1 };
function assignType(obj) {
  obj.__type = type;
  return obj;
}

function mapTo(ids, keyFn, type, rows) {
  if (!rows) {
    return mapTo.bind(null, ids, keyFn, type);
  }
  const group = new Map(ids.map(key => [key, null]));
  rows.forEach(row => group.set(keyFn(row), assignType(row, type)));
  return Array.from(group.values());
}

export default {
  create: () => ({
    users: new DataLoader(ids =>
      db
        .table('user')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'User')),
    ),
    roles: new DataLoader(ids =>
      db
        .table('roles')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Role')),
    ),
    articles: new DataLoader(ids =>
      db
        .table('articles')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Article')),
    ),
    tags: new DataLoader(ids =>
      db
        .table('tags')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Tag')),
    ),
    media: new DataLoader(ids =>
      db
        .table('media')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Media')),
    ),
    settings: new DataLoader(ids =>
      db
        .table('setting')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Setting')),
    ),
    pages: new DataLoader(ids =>
      db
        .table('page')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Page')),
    ),
    menus: new DataLoader(ids => Promise.all(ids.map(id => Menu.getById(id)))),
    details: new DataLoader(ids => ids.map(id => MenuDetail.query().findById(id))),
  }),
};
