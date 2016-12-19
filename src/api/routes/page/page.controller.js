import uuid from 'uuid';
import slugIt from '../../utils/slugIt';
import Page from './page.model';

export async function listPages(req, res) {
  try {
    const pages = await Page.query();
    return res.status(200).json(pages);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function getPageByUrl(req, res) {
  try {
    const page = await Page
      .query()
      .where({ url: req.params.url })

      .first();

    return res.status(200).json(page);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function createPage(req, res) {
  try {
    const payload = {
      id: uuid(),
      name: req.body.name,
      label: slugIt(req.body.name),
      url: req.body.url,
      layout: req.body.layout
    };

    const newPage = await Page.query().insert(payload);

    return responseHandler(res, 201, newPage);
  } catch (error) {
    return res.status(500).json(error);
  }
}
