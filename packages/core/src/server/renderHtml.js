import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Generates a full HTML page containing the render output of the given react element.
 *
 * @param config {Object} Configuration.
 * @param config.preloadedState {Object} [{}] The initial state for the redux store which will be used by the
 *   client to mount the redux store into the desired state.
 * @param config.markup {string} The rendered application markup
 * @param config.styles {string} [""] Styles to inject into the page.
 * @param config.scripts {string} [""] Scripts to inject into the page.
 * @param config.styleTags {string} StyledComponents style tags
 * @returns The full HTML page in the form of a React element.
 */

export default function renderHtml({ preloadedState, markup, styleTags, styles, scripts }) {
  if (typeof preloadedState !== 'object') {
    throw new Error('Rendering requires a preloaded state object!');
  }

  if (typeof markup !== 'string' || markup.length === 0) {
    throw new Error('Rendering requires your application as a string');
  }

  if (typeof styles !== 'string' || styles.length === 0) {
    throw new Error('Rendering requires stylesheet assets string');
  }

  if (typeof scripts !== 'string' || scripts.length === 0) {
    throw new Error('Rendering requires javascript assets string');
  }
  // render Helmet meta tags to static
  // prevents memory leak
  const helmet = Helmet.renderStatic();
  // include our DLL bundle
  const dllString = `<script type="text/javascript" src="/static/boldrDLLs.js"></script>`;
  const empty = '<span></span>';
  const isDev = process.env.NODE_ENV === 'development';
  return `
    <!doctype html>
      <html ${helmet.htmlAttributes.toString()}>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <link rel="stylesheet" href="//cdn.rawgit.com/milligram/milligram/master/dist/milligram.min.css" crossorigin="anonymous">
          ${styleTags}
          ${styles}
        </head>
        <body ${helmet.bodyAttributes.toString()}>
          <div id="app">${markup}</div>
          <script rel="prefetch" src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" type="text/javascript"></script>
          <script type="text/javascript">
            WebFont.load({ google: { families: ['Roboto:300,400,700','Chivo:300,700'] } });
          </script>
          <script type="text/javascript">
            window.__APOLLO_STATE__=${serialize(preloadedState, {
              json: true,
            })}
          </script>
          ${isDev ? dllString : empty}
          ${scripts}
          ${helmet.script.toString()}
        </body>
    </html>`;
}
