/* @flow */
import React from 'react';
import type { $Response, $Request } from 'express';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
// $FlowIssue
import styleSheet from 'styled-components/lib/models/StyleSheet';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { configureStore } from '../../shared/state';
import renderRoutes from '../../shared/core/addRoutes';
import routes from '../../shared/routes';
import muiTheme from '../../shared/templates/muiTheme';
import CreateHtml from './CreateHtml';

const debug = require('debug')('boldr:ssrMW');

function renderAppToString(
  store: Object,
  routerContext: Object,
  req: $Request,
) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={routerContext}>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          {renderRoutes(routes)}
        </MuiThemeProvider>
      </StaticRouter>
    </Provider>,
  );
}

async function boldrSSR(req: $Request, res: $Response) {
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value has not been attached to the response');
  }

  const { nonce } = res.locals;
  global.navigator = { userAgent: req.headers['user-agent'] };

  // take our array of route objects and match them to the
  // request.
  const routeIsMatched = matchRoutes(routes, req.url);

  const history = createHistory({ initialEntries: [req.url] });
  const store = configureStore(history, {
    boldr: { settings: { meta: { initialPageLoad: true } } },
  });

  const routerContext = {};
  // Load data on server-side
  const loadComponentData = () => {
    const promises = routeIsMatched.map(({ route, match }) => {
      // Dispatch the action(s) through the loadData method of "./routes.js"
      if (route.loadData) {
        return route.loadData(store.dispatch, match.params);
      }

      return Promise.resolve(null);
    });
    return Promise.all(promises);
  };
  // Send response after all the action(s) are dispathed
  await loadComponentData()
    .then(() => {
      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200;
      // render the application wrapped with provider, static router and the
      // store.
      const reactAppString = renderAppToString(store, routerContext, req);

      const helmet = Helmet.rewind();
      // render styled-components styleSheets to string.
      const styles = styleSheet.rules().map(rule => rule.cssText).join('\n');

      const html = renderToStaticMarkup(
        <CreateHtml
          reactAppString={reactAppString}
          nonce={nonce}
          helmet={helmet}
          styles={styles}
          preloadedState={store.getState()}
        />,
      );

      // Check if the render result contains a redirect, if so we need to set
      // the specific status and redirect header and end the response
      if (routerContext.url) {
        res.writeHead(301, {
          Location: routerContext.url,
        });
        res.end();

        return;
      }

      // Pass the route and initial state into html template
      return res.status(status).send(`<!DOCTYPE html>${html}`);
    })
    .catch(err => {
      debug(`💩  Ran into issues rendering routes: ${err}`);
      return res.status(500).send(`Ran into a few issues: ${err}`);
    });
}
export default boldrSSR;
