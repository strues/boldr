import uuid from 'uuid';
import slugIt from '../../utils/slugIt';
import { InternalServer, responseHandler } from '../../core/index';
import Activity from '../activity/activity.model';
import Navigation from '../navigation/navigation.model';
import NavigationLink from '../navigation/navigationLink.model';
import Link from './link.model';

const debug = require('debug')('boldrAPI:link-controller');

async function getLinks(req, res, next) {
  try {
    const links = await Link.query();

    if (!links) {
      return res.status(404).json({ message: 'Unable to find any links. Try creating one.' });
    }

    return responseHandler(res, 200, links);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function showLink(req, res) {
  const navigation = await Link
    .query()
    .findById(req.params.id);
  return responseHandler(res, 200, navigation);
}

async function createLink(req, res, next) {
  try {
    const payload = {
      name: req.body.name,
      href: req.body.href,
      icon: req.body.icon,
      label: slugIt(req.body.name),
      position: req.body.position,
      uuid: uuid(),
    };
    const newLink = await Link.query().insert(payload);

    const navId = req.body.nav_id || 1;
    const existingNav = await Navigation.query().where('id', navId).first();
    if (!existingNav) {
      throw new InternalServer();
    }
    debug(existingNav, 'existing navigation found');
    const associateLinkNav = await NavigationLink.query().insert({
      navigation_id: existingNav.id,
      link_id: newLink.id,
    });
    debug(associateLinkNav);
    await Activity.query().insert({
      id: uuid(),
      name: payload.name,
      label: newLink.label,
      user_id: req.user.id,
      action: 'New link',
      type: 'create',
      data: { payload },
      entry_uuid: newLink.uuid,
      entry_table: 'link',
    });

    return responseHandler(res, 201, newLink);
  } catch (error) {
    return res.status(500).json(error);
  }
}

function updateLink(req, res) {
  return Link.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(navigation => responseHandler(res, 202, navigation));
}

export { getLinks, updateLink, showLink, createLink };
