/* @flow */
import 'isomorphic-fetch';
import React from 'react';
import type { $Response, $Request } from 'express';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import createHistory from 'history/createMemoryHistory';
import StaticRouter from 'react-router-dom/StaticRouter';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styleSheet from 'styled-components/lib/models/StyleSheet';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { serverClient } from '../../shared/core/apollo';
import configureStore from '../../shared/state/store';
import App from '../../shared/components/App';
import muiTheme from '../../shared/templates/muiTheme';
import renderRoutes from '../../shared/core/addRoutes';
import routes from '../../shared/routes';
import CreateHtml from './CreateHtml';

const debug = require('debug')('boldr:ssrMW');

async function ssrMiddleware(req: $Request, res: $Response) {
  if (typeof res.locals.nonce !== 'string') {
    throw new Error('A "nonce" value is missing from the response.');
  }

  global.navigator = { userAgent: req.headers['user-agent'] };

  // Create a new server Apollo client for this request
  const client = serverClient();
  const history = createHistory({ initialEntries: [req.url] });
  const store = configureStore(client, {}, history);

  // Create context for React Router
  const routerContext = {};
  // Generate the HTML from our React tree.  We're wrapping the result
  // in `react-router`'s <StaticRouter> which will pull out URL info and
  // store it in our empty `route` object
  const appComponent = (
    <StaticRouter location={req.url} context={routerContext}>
      <ApolloProvider store={store} client={client}>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
          {renderRoutes(routes)}
        </MuiThemeProvider>
      </ApolloProvider>
    </StaticRouter>
  );
  await getDataFromTree(appComponent)
    .then(() => {
      // Checking is page is 404
      const status = routerContext.status === '404' ? 404 : 200;
      // Render our application to a string for the first time
      const reactAppString = renderToString(appComponent);
      const helmet = Helmet.renderStatic();
      const preloadedState = store.getState();
      const styledStyles = styleSheet
        .rules()
        .map(rule => rule.cssText)
        .join('\n');

      // render styled-components styleSheets to string.
      // Render the application to static HTML markup
      const html = renderToStaticMarkup(
        // $FlowIssue
        <CreateHtml
          reactAppString={reactAppString}
          nonce={res.locals.nonce}
          helmet={helmet}
          styles={styledStyles}
          preloadedState={preloadedState}
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
export default ssrMiddleware;
