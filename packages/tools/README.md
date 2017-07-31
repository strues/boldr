# `@boldr/tools`

Contains Webpack configuration, and development server.

## Usage
Install `@boldr/tools` and `@boldr/cli` as dependencies.
Add the following to your `package.json`:    
```json
{
  "dev": "NODE_ENV=development boldr dev",
  "build": "NODE_ENV=production boldr build",
  "clean": "boldr clean",
}
```


#### Defined
The following are inlined at build time via Webpack:    

- `__SERVER__`
- `process.env.TARGET`
- `process.env.GRAPHQL_ENDPOINT`
- `process.env.API_URL`
- `process.env.API_PREFIX`
