# Installation and Setup

**Step 1**    
First get the files to your machine.

**Using git:**  

```shell
  git clone git@github.com:strues/boldr.git <DIR_NAME>
  cd <DIR_NAME>
  yarn
```  

This will install **all** of the packages using [Lerna](https://github.com/lerna/lerna/). Lerna symlinks dependencies together from the packages directory as well as the project directory.

The main application currently lives in `project`.   
The frontend and the react server entrypoint are located in `project/src`.    
The actual server resides in `project/server`.
        

### Copy the environment file sample. 
Use the command  `cd project && cp .env_example .env`
      
Example file
```yaml
# .env_example defaults
  DEV_GRAPHQL_ENDPOINT = http://localhost:2121/api/v1/graphql
  GRAPHQL_ENDPOINT = http://localhost:2121/api/v1/graphql
  PUBLIC_PATH = /static/
  API_URL = http://localhost:2121
  DEV_API_URL = http://localhost:2121
  API_PREFIX = /api/v1
  DEV_PORT = 3000
  DATABASE_URL=postgres://boldr:password@localhost:5432/boldr
```  
       
### Configuration File(s)
Configuration settings can be found in `project/.boldr/config/default.js`.     

This file allows control over the Express server, its middleware, and the build tools.   
One important thing to note, at the bottom of `config/default.js` resides the vendor dependencies. Populating the array with package names tells Webpack to bundle them in the development DLL bundle.     


See the [Config Docs](/docs/pkgs/config.md) for detailed information on its usage.    

### Setup Postgres and Redis    

Boldr requires a Postgres database and a Redis service. Using the docker-compose.yml file included in the repo is the recommended method (at least for development).
      

**Create the persistent data containers**:    
        
Redis: `docker volume create --name=redis_data`      
Postgres: `docker volume create --name=postgres_data`       
      
Start with `docker-compose up -d`    
        
##### Connection Info     
        
```
Redis: 0.0.0.0:6379
Postgres: 0.0.0.0:5432
```

The default Postgres user is boldr and the password is password `postgres://boldr:password@localhost:5432/boldr`    


**NOTE:** If you are not using the docker-compose setup, make sure to modify the DATABASE_URL in the `.env` file **AND** `.boldr/config/default.js` (located at db.url) accordingly. 
     

### Migrate and Seed database
Migration and seed files live in their respective `.boldr/db/{seed,migrations}` directory.    
      
Run the command `yarn migrate` to execute the database migrations. This creates your database table structure.     
After migrating, use `yarn seed` to populate the tables with data.


### Up and Running

Start the client dev with `yarn dev`, then in a second terminal `yarn dev:server`.

The `yarn dev` command starts bundling with Webpack (from `@boldr/tools` package). A server is launched to when the bundling is complete to serve during development. The dev server is **completely** separate from the actual server. The reason for using a separate dev server is so that changes on the server do not require the bundling to restart. We're also able to run or debug the server without building the app.

We are able to easily serve the bundled React application during production because the server entry (SSR) is essentially just middleware Express can pipe in.   


After Boldr has started visit <http://localhost:3000>.    
GraphiQL is accessible at <http://localhost:2121/graphiql>.        
GraphQL's endpoint is <http://localhost:2121/api/v1/graphql> and can be modified by changing the server prefix in `.boldr/config/default.js`. If you change the server prefix, be sure to change the `.env` variables listed below. This is important because Webpack inlines these values during the build process.

```yaml
DEV_GRAPHQL_ENDPOINT = http://localhost:2121/api/v1/graphql
GRAPHQL_ENDPOINT = http://localhost:2121/api/v1/graphql
API_URL = http://localhost:2121
DEV_API_URL = http://localhost:2121
API_PREFIX = /api/v1
```

A admin account is already created and you may login using these credentials:

> Email - admin@boldr.io
> Password - password




