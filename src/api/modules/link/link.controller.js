import findQuery from 'objection-find';
import slugify from 'slugify';
import uuid from 'node-uuid';

import { InternalServer, responseHandler } from '../../core';
import Activity from '../activity/activity.model';
import Navigation from '../navigation/navigation.model';
import NavigationLink from '../navigation/navigationLink.model';
import Link from './link.model';

const debug = require('debug')('boldr:link-controller');

async function getLinks(req, res) {
  const navigations = await Link.query();

  if (!navigations) {
    responseHandler(null, res, 500);
  }

  return res.status(200).json(navigations);
}

async function showLink(req, res) {
  const navigation = await Link
    .query()
    .findById(req.params.id);
  return responseHandler(null, res, 200, navigation);
}

async function createLink(req, res, next) {
  const payload = {
    name: req.body.name,
    href: req.body.href,
    icon: req.body.icon,
    label: slugify(req.body.name),
    position: req.body.position,
    uuid: uuid.v4(),
  };
  const newLink = await Link.query().insert(payload);
  debug('----------newLink ', newLink);
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
    id: uuid.v4(),
    name: payload.name,
    label: newLink.label,
    user_id: req.user.id,
    action: 'New link',
    type: 'create',
    data: { payload },
    entry_uuid: newLink.uuid,
    entry_table: 'link',
  });

  return res.status(201).json(newLink);
}

function updateLink(req, res) {
  return Link.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(navigation => res.status(202).json(navigation));
}

export { getLinks, updateLink, showLink, createLink };
