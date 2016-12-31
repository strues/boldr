/* @flow */

// This module is responsible for generating the HTML page response for
// the react application middleware.

import type { Head } from 'react-helmet';
import serialize from 'serialize-javascript';
import config, { clientConfig } from '../../../../config';
import getAssetsForClientChunks from './getAssetsForClientChunks';

function styleTags(styles: Array<string>) {
  return styles
    .map(style =>
      `<link href="${style}" media="screen, projection" rel="stylesheet" type="text/css" />`,
    )
    .join('\n');
}

function scriptTag(jsFilePath: string) {
  return `<script type="text/javascript" src="${jsFilePath}"></script>`;
}

function scriptTags(jsFilePaths: Array<string>) {
  return jsFilePaths.map(scriptTag).join('\n');
}

type Args = {
  reactAppString?: string,
  preloadedState?: Object,
  nonce: string,
  helmet?: Head,
};

export default function generateHTML(args: Args) {
  const { reactAppString, preloadedState, nonce, helmet } = args;
  const chunksForRender = [
    // We always manually add the main entry chunk for our client bundle. It
    // must always be the first item in the collection.
    'index',
  ];
  // Now we get the assets (js/css) for the chunks.
  const assetsForRender = getAssetsForClientChunks(chunksForRender);

  // Creates an inline script definition that is protected by the nonce.
  const inlineScript = body =>
    `<script nonce="${nonce}" type='text/javascript'>
       ${body}
     </script>`;

  return `<!DOCTYPE html>
    <html ${helmet ? helmet.htmlAttributes.toString() : ''}>
      <head>
        ${helmet ? helmet.title.toString() : ''}
        ${helmet ? helmet.meta.toString() : ''}
        ${helmet ? helmet.link.toString() : ''}
        ${styleTags(assetsForRender.css)}
        ${helmet ? helmet.style.toString() : ''}
      </head>
      <body>
        <div id='app'>${reactAppString || ''}</div>
        ${
          inlineScript(`window.__CLIENT_CONFIG__=${serialize(clientConfig)}`)
        }
        ${
          preloadedState
            ? inlineScript(`window.PRELOADED_STATE=${serialize(preloadedState)};`)
            : ''
        }

        ${
          config.polyfillIO.enabled
            ? scriptTag(config.polyfillIO.url)
            : ''
        }
        ${
            process.env.NODE_ENV === 'development'
            && config.bundles.client.devVendorDLL.enabled
            ? scriptTag(`${config.bundles.client.webPath}${config.bundles.client.devVendorDLL.name}.js?t=${Date.now()}`)
            : ''

        }
        ${scriptTags(assetsForRender.js)}
        ${helmet ? helmet.script.toString() : ''}
      </body>
    </html>`;
}
