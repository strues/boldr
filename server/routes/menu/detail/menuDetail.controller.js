import uuid from 'uuid';
import slugIt from '../../../utils/slugIt';
import { InternalServer, responseHandler } from '../../../core/index';
import { Activity, Menu, MenuDetail, MenuMenuDetail } from '../../../models';

const debug = require('debug')('boldr:menuDetail-controller');

export async function getDetails(req, res, next) {
  try {
    const links = await MenuDetail.query();

    if (!links) {
      return res.status(404).json({ message: 'Unable to find any links. Try creating one.' });
    }

    return responseHandler(res, 200, links);
  } catch (error) {
    return next(error);
  }
}

export async function showDetail(req, res, next) {
  try {
    const navigation = await MenuDetail
      .query()
      .findById(req.params.id);
    return responseHandler(res, 200, navigation);
  } catch (error) {
    return next(error);
  }
}

export async function createDetail(req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      link: req.body.link,
      icon: req.body.icon,
      label: slugIt(req.body.name),
      attribute: req.body.attribute,
      position: req.body.position,
    };
    const newLink = await MenuDetail.query().insert(payload);

    const menuId = req.body.menu_id || 1;
    const existingMenu = await Menu.query().where('id', menuId).first();
    if (!existingMenu) {
      throw new InternalServer();
    }
    debug(existingMenu, 'existing menu found');
    const associateMenuDetail = await MenuMenuDetail.query().insert({
      menu_id: existingMenu.id,
      menu_detail_id: newLink.id,
    });
    debug(associateMenuDetail);
    await Activity.query().insert({
      user_id: req.user.id,
      action_type_id: 1,
      activity_menu_detail: newLink.id,
    });

    return responseHandler(res, 201, newLink);
  } catch (error) {
    return next(error);
  }
}

export function updateDetail(req, res) {
  return MenuDetail.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(navigation => responseHandler(res, 202, navigation));
}

export function deleteDetail(req, res) {
  return MenuDetail.query()
    .deleteById(req.params.id)
    .then(() => responseHandler(res, 204));
}
