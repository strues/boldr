import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import StaticRouter from 'react-router-dom/StaticRouter';

import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import renderHtml from './renderHtml';

/**
 * Express middleware to render HTML
 * @param  {object}     stats Webpack stats output
 * @return {function}   middleware function
 */
export default function ssrHandler({ Application, clientStats, engine, req, res }) {
  console.log('[BOLDR] Getting current state from store...');
  const state = engine.store.getState();

  const routerContext = {};
  // Here is where our data loading begins
  const status = 200;

  let markup = '';
  try {
    // render the applicaation to a string and let styled-components
    // create stylesheet tags
    markup = ReactDOM.renderToString(Application);
  } catch (err) {
    console.error('Unable to render server side React:', err);
  }

  console.log('[BOLDR] Flushing chunks...');
  const chunkNames = flushChunkNames();

  console.log('[BOLDR] Rendered Chunk Names:', chunkNames.join(', '));
  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames,
  });

  console.log(`[BOLDR] Flushed Script Tags:\n${js.toString()}\n`);
  console.log(`[BOLDR] Flushed CSS Tags:\n${styles.toString()}\n`);

  // get the stylesheet tags from what styled-components created during
  // render to string
  // const styleTags = sheet.getStyleTags();
  if (routerContext.url) {
    res.status(301).setHeader('Location', routerContext.url);
    res.redirect(routerContext.url);
    return;
  }

  console.log('Rendering Page...');
  const preloadedState = state;
  // creates the HTML we send back down to the browser.
  const pageHtml = renderHtml({
    preloadedState,
    markup,

    styles: styles.toString(),
    scripts: cssHash + js.toString(),
  });
  // Dont cache dynamic content.
  res.setHeader('Cache-Control', 'no-cache');

  console.log('Sending Page...');
  res.status(status).send(pageHtml);
}
