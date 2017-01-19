import { responseHandler, InternalServer } from '../../core/index';
// Model
import Menu from './menu.model';

export async function listMenu(req, res, next) {
  try {
    const menus = await Menu.query().eager('details').returning('*');

    if (!menus) {
      return res.status(404).json({ message: 'Unable to find any navigations. Try creating one.' });
    }

    return res.status(200).json(menus);
  } catch (error) {
    return next(new InternalServer());
  }
}

export async function showMenu(req, res, next) {
  try {
    const menu = await Menu
      .query()
      .eager('[details]')
      .findById(req.params.id);

    return responseHandler(res, 200, menu);
  } catch (error) {
    return next(new InternalServer(error));
  }
}

export async function createMenu(req, res, next) {
  try {
    const payload = req.body;
    const newMenu = await Menu
      .query()
      .insert(payload);
    return responseHandler(res, 201, newMenu);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export async function updateMenu(req, res, next) {
  try {
    const updatedNav = await Menu.query()
      .patchAndFetchById(1, req.body);

    return res.status(201).json(updatedNav);
  } catch (error) {
    return next(new InternalServer(error));
  }
}
