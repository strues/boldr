import DataLoader from 'dataloader';
import { db } from '../services/db';
import Menu from '../models/Menu';
import MenuDetail from '../models/MenuDetail';

export function assignType(obj, type) {
  // eslint-disable-next-line no-param-reassign, no-underscore-dangle
  obj.__type = type;
  return obj;
}

export function mapTo(keys, keyFn, type, rows) {
  if (!rows) {
    return mapTo.bind(null, keys, keyFn, type);
  }
  const group = new Map(keys.map(key => [key, null]));
  rows.forEach(row => group.set(keyFn(row), assignType(row, type)));
  return Array.from(group.values());
}

export function mapToMany(keys, keyFn, type, rows) {
  if (!rows) {
    return mapToMany.bind(null, keys, keyFn, type);
  }
  const group = new Map(keys.map(key => [key, []]));
  rows.forEach(row => group.get(keyFn(row)).push(assignType(row, type)));
  return Array.from(group.values());
}

export function mapToValues(keys, keyFn, valueFn, rows) {
  if (!rows) {
    return mapToValues.bind(null, keys, keyFn, valueFn);
  }
  const group = new Map(keys.map(key => [key, null]));
  rows.forEach(row => group.set(keyFn(row), valueFn(row)));
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
    accounts: new DataLoader(ids =>
      db
        .table('account')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Account')),
    ),
    profiles: new DataLoader(ids =>
      db
        .table('profile')
        .whereIn('id', ids)
        .select('*')
        .then(mapTo(ids, x => x.id, 'Profile')),
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
    details: new DataLoader(ids =>
      Promise.all(ids.map(id => MenuDetail.query().whereIn('menu_id', id))),
    ),
  }),
};
