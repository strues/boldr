# `@boldr/tools`

Contains Webpack configuration, and development server.

## Usage
Install `@boldr/tools` and `@boldr/cli` as dev-dependencies.   

Add the following to your `package.json`:    
```json
{
  "dev": "NODE_ENV=development boldr dev",
  "build": "NODE_ENV=production boldr build",
  "clean": "boldr clean",
}
```

Ensure your project root contains the directory `.boldr` if not, create it `mkdir .boldr`. Create another folder called config inside `.boldr` along with a file called `default.js`.    
    
`mkdir config && touch config/default.js`   
   

Copy the configuration at the bottom of this README into `default.js`. 
    
If you are not using Boldr, you may forgo putting your config directory inside `.boldr`. Specify `CFG_DIR=some/path` in your `.env` file or as an environment variable from your terminal. The directory is resolved based off of the root of your project. 
    

#### Defined
`@boldr/tools` will throw an error if `process.env.GRAPHQL_ENDPOINT`, `process.env.API_URL` and `process.env.API_PREFIX` are not set in a `.env` file (recommended) or added to your runtime command.   
   

The following are inlined at build time via Webpack:    
- `__DEV__`
- `__SERVER__`
- `process.env.GRAPHQL_ENDPOINT`
- `process.env.API_URL`
- `process.env.API_PREFIX`


#### Vendor Files
There is a section of the `default.js` where dependencies are added to the development DLLs. Adding files here allows Webpack to place them into the DLLs for development. If you don't care about dev build times, this vendor section isnt that important.   

The most important vendor file is located in `src/vendor.js`. Simply add a dependency to the file by importing it, `import 'react';`. Whatever is listed in the file is added to a separate chunk for improved caching.


#### Example Config
Feel free to include something like dotenv in this file and set portions of the config based off of your `.env`. 



```javascript

// .boldr/config/default.js
// example w/ dotenv
// require('dotenv').config();
// then define say, publicPath as process.env.PUBLIC_PATH
// it will be parsed as a string and passed along.
module.exports = {
  tools: {
    profile: false,
    paths: {
      publicPath: '/static/',
      entry: {
        server: 'src/serverEntry.js',
        client: 'src/clientEntry.js',
      },
      output: {
        server: 'build/server',
        client: 'build/client',
      },
      vendor: 'src/vendor.js',
    },
    // the list of dependencies to include in a DLL bundle for speedier development rebuilds.
    vendor: [
      'react-dom',
      'react-helmet',
      'react-redux',
      'react-router-dom',
      'react',
      'recompact',
      'reselect',
      'redux-form',
      'redux-thunk',
      'redux',
      'serialize-javascript',
      'react-universal-component',
    ],
  },
}

```
