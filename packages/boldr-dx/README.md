# Boldr-DX

Boldr Developer Experience is a build toolkit. If you happen to find Webpack configuration tedious, BoldrDX is for you. BoldrDX uses Webpack in a tailored environment specifically for Boldr. However, you can use it in any project without any troubles.


### Quick Setup

Everything is already setup for you if you created a Boldr project with the CLI. Want all the power without BoldrCMS?

Don't fret it's easy. The steps below will also work in an existing project after a few additional tweaks.

1. `npm init -y`

Add Boldr-DX to your dependencies.  

2. `yarn add --dev boldr-dx`  

Create the **SMALL** configuration files. You won't need to configure very much. Promise.

**Minimal configuration:**   

Create a `.env` file with the two variables defined inside.  

```
BOLDR__SERVER_PORT=3000
BOLDR__DEV_PORT=30001
```

Create the `boldr.dx.js` file inside `.boldr` folder of your project root.   

```javascript
/// .boldr/boldr.dx.js
const path = require('path');
const dotenv = require('dotenv');
dotenv.load();
  module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    BOLDR__SERVER_PORT: process.env.BOLDR__SERVER_PORT,
    BOLDR__DEV_PORT: process.env.BOLDR__DEV_PORT,
  },
  bundle: {
    verbose: true,
    debug: false,
    cssModules: true,
    wpProfile: false,
    babelrc: null,
    webPath: '/assets/',
    publicDir: path.resolve(__dirname, '../public'),
    assetsDir:  path.resolve(__dirname, '../public/assets'),
    srcDir: path.resolve(__dirname, '../src'),
    client: {
      entry: path.resolve(__dirname, '../src/client/index.js'),
      bundleDir: path.resolve(__dirname, '../public/assets'),
    },
    server: {
      entry: path.resolve(__dirname, '../src/server/index.js'),
      bundleDir: path.resolve(__dirname, '../lib'),
    },
    vendor: [
      'prop-types',
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'react',
      'redux',
      'serialize-javascript',
    ],
  },
  }
  ```

Add vendor libraries to the vendor section of the config. These are included in the dev process as DLLs. A production build compiles the vendor files into a vendor bundle as well as a common chunk bundle. Only include client side dependencies, **not node**, like Express.

3. `mkdir .boldr && touch boldr.dx.js`   

Insert the config from above into the boldr.dx.js file. The configuration is meant for an entire Boldr project, however you're more than able to use boldr-dx as your go-to webpack runner. Simply remove everything below the bundle key and go about your business.

**OR** use the provided `boldr-project-template` which is a standalone universal React application.


4. `package.json`  
Add the commands to your `package.json`.   

```json
  "scripts": {
    "build": "NODE_ENV=production boldr-dx build",
    "start": "NODE_ENV=production node server/app.js",
    "dev": "NODE_ENV=development boldr-dx dev",
  }
```

### Commands

`boldr-dx dev`: Fire up the development process. Compile client and server bundles. Runs the main Express server on port 3000 and the development server on port 3001 for hot reloading.  

Runtime env options
  - `process.env.BOLDR__SERVER_PORT`
  - `process.env.BOLDR__DEV_PORT`

`boldr-dx build`: Compile server and client bundles for production.
  - Set `NODE_ENV=production`.

`boldr-dx clean`: Remove compiled files as well as any compiler caches.
  - Use `-d` along with a path (starting from your CWD) to remove additional directories.


### Assets Information

Assets are made available to the server by requiring `const assets = require(__ASSETS_MANIFEST__);` and `const chunks = require(__CHUNK_MANIFEST__)`. Then you will have access to:   

- `assets.app.js` and `assets.app.css`: All the time
- `assets.common.js` and `assets.common.css`: During production only.  
- `assets.vendor.js`: During production only because during development we dont compile vendor assets.  
- During development, vendorDLLs are created to speed up build time. They must be served during development only from `/assets/__vendor_dlls_.js`

Order of inclusion during production **is important**.  
The order is:   
    1. common  
    2. vendor  
    3. app  


### Additional Information

The configuration allows you to customize the output directories, the entry files and ports. By default, it is separated into
src/(client|shared|server). Client and Server contain the entrypoint of index.js in each.

CSS modules can be **disabled** in the `boldr.dx.js` file by setting `cssModules` to **false**.

Scss is included.


#### Helpers

Feel free to modify any of the values within the bundle portion of the config. There are a few "inlined-at-compile" helpers you have access to. They are:
```
- __IS_CLIENT__
- __IS_SERVER__
- __IS_DEV__
- __ASSETS_MANIFEST__
- __CHUNK_MANIFEST__
```

The two manifest helpers are important. They turn into requires for your assets once Wepback builds the bundle. The remaining helpers allow you to exclude code. For example:

```javascript
if (__IS_DEV__) {
  // this code will be included during development and not production
}

if (__IS_SERVER__) {
  // will only run on the server
}
```

#### Babel
Boldr-DX by default uses its own Babel preset with the following included:   

- babel-preset-env  
- babel-preset-react  
- babel-plugin-syntax-dynamic-import  
- babel-plugin-syntax-flow  
- babel-plugin-transform-class-properties  
- babel-plugin-transform-decorators-legacy  
- babel-plugin-transform-runtime
- babel-plugin-transform-regenerator  
- babel-plugin-transform-object-rest-spread  
- babel-plugin-transform-react-jsx  

- babel-plugin-dynamic-import-node
- babel-plugin-dynamic-import-webpack
- react-loadable/babel  
- babel-plugin-transform-flow-strip-types  
React Production:  
- babel-plugin-transform-react-constant-elements  
- babel-plugin-transform-react-inline-elements  
- babel-plugin-transform-react-strip-prop-types   
React Development:  
- react-hot-loader/babel  
- babel-plugin-transform-react-jsx-self  
- babel-plugin-transform-react-jsx-source  

You can use your own Babel configuration by adding a `.babelrc` and setting babelrc to **true** in the config (`.boldr/boldr.dx.js`).  

**Note**   
  > Using scripts that might require babel processing, or running tests, outside of boldr-dx you will want to have a babelrc file anyways so that babel processes it. The babelrc will not be read by Webpack.   
