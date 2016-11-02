import Page from './page.model';

export async function listPages(req, res) {
  const pages = await Page.query();
  return res.status(200).json(pages);
}

export async function getPageByUrl(req, res) {
  const page = await Page
    .query()
    .where({ url: req.params.url })

    .first();

  return res.status(200).json(page);
}
