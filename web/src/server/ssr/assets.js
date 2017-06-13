/* @flow */

import fs from 'mz/fs';
const isDev = process.env.NODE_ENV === 'development';

let resultCache;
export default function assets() {
  if (!isDev && resultCache) {
    return resultCache;
  }
  // $FlowIssue
  if (!fs.existsSync(__ASSETS_MANIFEST__)) {
    throw new Error(
      `We could not find the "${__ASSETS_MANIFEST__}" file, which contains a list of the assets of the client bundle.  Please ensure that the client bundle has been built.`,
    );
  }
  const readAssetsJSONFile = () => JSON.parse(fs.readFileSync(__ASSETS_MANIFEST__, 'utf8'));
  const assetsJSONCache = readAssetsJSONFile();
  resultCache = assetsJSONCache;
  return resultCache;
}
