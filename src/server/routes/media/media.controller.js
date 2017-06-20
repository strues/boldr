import path from 'path';
import util from 'util';
import url from 'url';
import uuid from 'uuid';
import _debug from 'debug';
import request from 'request';
import fs from 'fs-extra';
import Jimp from 'jimp';
import shortId from 'shortid';
import appRoot from 'boldr-utils/lib/node/appRoot';
import formidable from 'formidable';
import { responseHandler, BadRequest } from '../../core/index';
import Media from '../../models/Media';
import { logger } from '../../services';

const imgRegex = new RegExp('^.*.((j|J)(p|P)(e|E)?(g|G)|(g|G)(i|I)(f|F)|(p|P)(n|N)(g|G))$');
const vidRegex = new RegExp('^.*.((m|M)(p|P)(4)|(m|M)(k|K)(v|V))$');

const debug = _debug('boldr:media');
/**
 * Returns a list of all attachments
 * @method listMedia
 * @param  {Object}        req  the request object
 * @param  {Object}        res  the response object
 * @return {Promise}            the array of attachment objects
 */
export async function listMedia(req, res, next) {
  try {
    const medias = await Media.query().eager('uploader');

    return responseHandler(res, 200, medias);
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

/**
 * Returns a specific media and its data
 * @method getMedia
 * @param  {Object}        req  the request object
 * @param  {Object}        res  the response object
 * @return {Promise}         the media object
 */
export async function getMedia(req, res, next) {
  try {
    const file = await Media.query().findById(req.params.id);
    return responseHandler(res, 200, file);
  } catch (err) {
    /* istanbul ignore next */
    return next(error);
  }
}

export function uploadFromUrl(req, res, next) {
  const download = (uri, filename, callback) => {
    request.head(uri, (err, res, body) => {
      request(uri)
        .pipe(fs.createWriteStream(`${appRoot.get()}/public/uploads/${filename}`))
        .on('close', callback)
        .on('error', err);
    });
  };

  const urlParsed = url.parse(req.body.url);
  if (urlParsed.pathname) {
    const onlyTheFilename = urlParsed.pathname
      ? urlParsed.pathname
          .substring(urlParsed.pathname.lastIndexOf('/') + 1)
          .replace(/((\?|#).*)?$/, '')
      : '';

    const newFilename = shortId() + path.extname(onlyTheFilename);
    download(urlParsed.href, newFilename, async () => {
      const newImage = await Media.query().insert({
        // @TODO: remove mediaType hardcode
        mediaType: 'image',
        fileName: newFilename,
        safeName: newFilename,
        thumbName: newFilename,
        url: `/uploads/${newFilename}`,
        path: `${appRoot.get()}/public/uploads/${newFilename}`,
        userId: req.user.id,
      });

      return res.status(201).json(newImage);
    });
  }
}

/**
 * Update a media file in the database.
 * @method UpdateMedia
 * @param  {Object}        req  the request object
 * @param  {Object}        res  the response object
 * @return {Object}             returns the response
 */
export async function updateMedia(req, res, next) {
  try {
    const updatedMedia = await Media.query().patchAndFetchById(req.params.id, req.body);
    //
    // await Activity.query().insert({
    //   userId: req.user.id,
    //   type: 'update',
    //   activityAttachment: req.params.id,
    // });

    return responseHandler(res, 202, updatedMedia);
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}

/**
 * Delete a media file from the database and file system.
 * @method DeleteMedia
 * @param  {Object}        req  the request object
 * @param  {Object}        res  the response object
 * @param  {Function}       next move to the next middleware
 * @return {Promise}             Promise that the file deleted
 */
export async function deleteMedia(req, res, next) {
  try {
    // query for the requested attachment
    const media = await Media.query().findById(req.params.id);
    // return a bad request if we cannot locate
    if (!media) {
      return next(new BadRequest());
    }
    // unlink the attachment from the activity
    // await Activity.query().delete()
    // .where({ activityAttachment: req.params.id }).first();

    // remove the attachment from the database
    await Media.query().deleteById(req.params.id);
    // remove from the file system.
    fs.removeSync(`./public/uploads/${media.safeName}`);
    // send a 204
    return res.status(204).json('Deleted');
  } catch (error) {
    /* istanbul ignore next */
    return next(error);
  }
}
