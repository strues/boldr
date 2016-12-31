/* @flow */

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
    `We could not find the "${assetsFilePath}" file, which contains a list of the assets of the client bundle`,
  );
}

const readAssetsJSONFile = () => JSON.parse(fs.readFileSync(assetsFilePath, 'utf8'));
const assetsJSON = readAssetsJSONFile();
const assetsJSONResolver = () => (
  process.env.NODE_ENV === 'development'
    ? readAssetsJSONFile()
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
