import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import Html from '../../../src/shared/components/Html';

module.exports = function generate(context) {
  const {config} = context.htmlWebpackPlugin.options.custom;
  const {ClientConfig} = context.htmlWebpackPlugin.options.custom;
  const html = renderToStaticMarkup(
    <Html
      title={ config('htmlPage.defaultTitle') }
      description={ config('htmlPage.description') }
      bodyElements={ <ClientConfig nonce="OFFLINE_PAGE_NONCE_PLACEHOLDER" /> }
    />,
  );
  return `<!DOCTYPE html>${html}`;
};
