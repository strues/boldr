import { responseHandler, InternalServer, NotFound } from '../../core/index';
import { slugIt } from '../../utils';
// Model
import Menu from '../../models/menu';

export async function listMenu(req, res, next) {
  try {
    const menus = await Menu.query().eager('details').returning('*');

    if (!menus) {
      return next(new NotFound('Unable to find any navigations. Try creating one.'));
    }

    return res.status(200).json(menus);
  } catch (error) {
    return next(new InternalServer());
  }
}

export async function showMenu(req, res, next) {
  try {
    const menu = await Menu.query().eager('[details]').findById(req.params.id);

    return responseHandler(res, 200, menu);
  } catch (error) {
    return next(new InternalServer(error));
  }
}

export async function createMenu(req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      safe_name: slugIt(req.body.name),
      attributes: req.body.attributes,
      restricted: req.body.restricted,
    };
    const newMenu = await Menu.query().insert(payload);
    return responseHandler(res, 201, newMenu);
  } catch (err) {
    return next(new InternalServer(err));
  }
}

export async function updateMainMenu(req, res, next) {
  try {
    const updatedNav = await Menu.query().patchAndFetchById(req.params.id, req.body);

    return res.status(202).json(updatedNav);
  } catch (error) {
    return next(new InternalServer(error));
  }
}
