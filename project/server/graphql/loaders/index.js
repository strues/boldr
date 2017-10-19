import DataLoader from 'dataloader';

import Menu from '../../models/Menu';
import MenuDetail from '../../models/MenuDetail';

export default () => {
  return {
    menus: new DataLoader(ids => Promise.all(ids.map(id => Menu.getById(id)))),
    details: new DataLoader(ids =>
      Promise.all(ids.map(id => MenuDetail.query().whereIn('menu_id', id))),
    ),
  };
};
