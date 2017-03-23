import uuid from 'uuid/v4';
import slugIt from '../../../utils/slugIt';
import { InternalServer, BadRequest, responseHandler } from '../../../core/index';
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
    const navigation = await MenuDetail.query().findById(req.params.id);
    return responseHandler(res, 200, navigation);
  } catch (error) {
    return next(error);
  }
}

export async function createDetail(req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      safe_name: slugIt(req.body.name),
      href: req.body.href,
      mobile_href: req.body.mobile_href,
      css_classname: req.body.css_classname,
      has_dropdown: JSON.parse(req.body.has_dropdown),
      icon: req.body.icon,
      order: req.body.order,
      children: req.body.children,
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
      type: 'create',
      activity_menu_detail: newLink.id,
    });

    return responseHandler(res, 201, newLink);
  } catch (error) {
    return next(error);
  }
}

export async function updateDetail(req, res, next) {
  try {
    const detail = await MenuDetail.query().findById(req.params.id);

    if (!detail) return res.status(404).json('Unable to find a menu detail with that id.');

    const updatedDetail = await MenuDetail.query().updateAndFetchById(req.params.id, req.body);

    return res.status(202).json(updatedDetail);
  } catch (err) {
    return next(new BadRequest(err));
  }
}

export async function deleteDetail(req, res, next) {
  try {
    const menuD = await MenuDetail.query().findById(req.params.id);
    if (!menuD) {
      return res.status(404).json('Unable to find a matching menu detail');
    }
    await menuD.$relatedQuery('menu').unrelate().where('menu_detail_id', req.params.id);
    await MenuDetail.query().deleteById(req.params.id);
    return responseHandler(res, 204);
  } catch (error) {
    return next(error);
  }
}
