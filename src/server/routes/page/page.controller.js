import uuid from 'uuid';
import slugIt from '../../utils/slugIt';
import Page from '../../models/page';

export async function listPages(req, res, next) {
  try {
    const pages = await Page.query().eager('[templates]');
    return res.status(200).json(pages);
  } catch (error) {
    return next(error);
  }
}

export async function getPageByUrl(req, res, next) {
  try {
    const page = await Page.query().where({ url: req.params.url }).first();

    return res.status(200).json(page);
  } catch (error) {
    return next(error);
  }
}

export async function createPage(req, res, next) {
  try {
    const payload = {
      id: uuid(),
      name: req.body.name,
      label: slugIt(req.body.name),
      url: req.body.url,
      layout: req.body.layout,
    };

    const newPage = await Page.query().insert(payload);

    return responseHandler(res, 201, newPage);
  } catch (error) {
    return next(error);
  }
}
