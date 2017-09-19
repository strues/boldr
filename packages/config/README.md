# `@boldr/config`

Configuration helper for Node environments. `@boldr/config` combines multiple configuration files
by recursively merging their properties. 

It also allows you to use referenced values from your config.

## Load Precedence

Files are loaded in the following order: 
  
 - `/config/default.(js|json)`
 - `/config/*.(js|json)` (all files in config folder excluding local configs)
 - `/config/env/$NODE_ENV.(js|json)`
 - `/config/env/$NODE_ENV.local.(js|json)`
 - `/config/local.(js|json)`

When there is no `NODE_ENV` set, it defaults to `development`. 

You can adjust configuration directory with `CFG_DIR` environment variable.  

## Installation

`$ npm install @boldr/config` or `$ yarn add @boldr/config`
 

## Default Config

`@boldr/config` uses plain JS objects as configuration. 

`/.boldr/config/default.js`

```javascript
module.exports = {
  websiteUrl: 'http://localhost:3000',
  server: {
    port: 2121,
    protocol: 'http',
    host: '0.0.0.0',
    prefix: '/api/v1',
    uploadDir: 'public/uploads/tmp'
  },
  logging: {
    level: 'debug',
    file: false,
  },
  token: {
    secret: 'b0ldrk3kwi11s15',
    expiration: 604800000,
  },
  mail: {
    host: 'smtp.example.com',
    user: 'user@user.com',
    password: 'password',
    port: 465,
    ssl: true,
    from: 'hello@boldr.io',
  },
  db: {
    url: 'postgres://postgres:password@localhost:5432/boldr',
  },
  redis: {
    url: 'redis://127.0.0.1:6379/0',
  },
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
  vendor: [],
  tools: {
    profile: false,
  },
}

```

`/.boldr/config/default.json`

```json
{
  "objectProperty": {
    "path": "/etc/files",
    "anotherProperty": {
      "size": 10
    }
  },
 
  "cache": {
    "expiration": 300
  },
 
  "server": {
    "port": 12345,
    "host": "localhost",
    "version": "1.2.3"
  },
 
  "boolProperty": true,
  "stringProperty": "lol"
 
}
```

## Usage
Load the module into your app, `import config from '@boldr/config';`.
Directly access property on config object. 

Alternatively, you may use `get`/`has` methods.  

```javascript
const config = require('@boldr/config');
console.log(config.cache.expiration);
```

### `config.get(key: string, defaultValue: any): any`

```javascript
const config = require('@boldr/config');
console.log(config.get('cache.expiration')); // prints 300
console.log(config.get('cache.another')); // prints undefined
console.log(config.get('cache.another', 123)); // prints 123
```

### `config.has(key: string): bool`

```javascript
const config = require('@boldr/config');
console.log(config.has('cache.expiration')); // prints true
```

### `config.addOptions(options: object|string, optional: bool)`

This method is used for adding configuration on the fly. You can pass an object with additional 
configuration, or a string path to JS/JSON file, that exports the configuration. 

```javascript
const config = require('@boldr/config');
console.log(config.newKey); // prints undefined
config.addOptions({newKey: 123});
console.log(config.newKey); // prints 123 
```

```javascript
const config = require('@boldr/config');
config.addOptions(__dirname + '/routes'); // load routes.js file exporting routes object
console.log(config.routes); // prints routes object 
```

## Merging configuration

When multiple configuration files has same keys, their values are merged instead of replacement. 

```javascript
const config = require('@boldr/config');
config.addOptions({
  log: {level: 'error', path: 'error.log'}
});
config.addOptions({
  log: {level: 'trace'}
});
console.log(config.log.level); // prints 'trace' 
console.log(config.log.path); // prints 'error.log' 
```
