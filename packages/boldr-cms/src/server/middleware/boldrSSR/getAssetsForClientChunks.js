/* @flow */

// This file resolves the assets available from our client bundle.

import fs from 'fs';
import { resolve as pathResolve } from 'path';
import appRootDir from 'app-root-dir';
import config from '../../../../config';

const assetsFilePath = pathResolve(
  appRootDir.get(),
  config.bundles.client.outputPath,
  `./${config.bundleAssetsFileName}`,
);

if (!fs.existsSync(assetsFilePath)) {
  throw new Error(
    `We could not find the "${assetsFilePath}" file, which contains a list of the assets of the client bundle.  Please ensure that the client bundle has been built.`,
  );
}

const readAssetsJSONFile = () => JSON.parse(fs.readFileSync(assetsFilePath, 'utf8'));
const assetsJSON = readAssetsJSONFile();
const assetsJSONResolver = () => (
  process.env.NODE_ENV === 'development'
    // In development mode we always read the assets json file from disk to avoid
    // any cases where an older version gets cached.
    ? readAssetsJSONFile()
    // Otherwise we return the initially parsed JSON file.
    : assetsJSON
);

function getAssetsForClientChunks(chunks: Array<string>) {
  return chunks.reduce((acc, chunkName) => {
    const chunkAssets = assetsJSONResolver()[chunkName];
    if (chunkAssets) {
      if (chunkAssets.js) {
        acc.js.push(chunkAssets.js);
      }
      if (chunkAssets.css) {
        acc.css.push(chunkAssets.css);
      }
    }
    return acc;
  }, { js: [], css: [] });
}

export default getAssetsForClientChunks;
