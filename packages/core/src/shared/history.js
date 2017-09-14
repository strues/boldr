/* eslint-disable import/no-commonjs */
const createHistory =
  process.env.TARGET === 'web'
    ? require('history/createBrowserHistory').default
    : require('history/createMemoryHistory').default;
export default createHistory;
