# Boldr

The main application is located in `project`.   
The frontend and the react server entrypoint are located in `project/src`.    
The actual server resides in `project/server`.
    


## Installation and Setup
 
#### Copy the environment file sample. 
Use the command  `cd project && cp .env_example .env`
      
Example file
```yaml
# .env_example defaults
  SERVER_ENTRY = src/serverEntry.js
  CLIENT_ENTRY = src/clientEntry.js
  SERVER_OUTPUT = build/server
  CLIENT_OUTPUT = build/client
  DEV_GRAPHQL_ENDPOINT = http://localhost:2121/api/v1/graphql
  GRAPHQL_ENDPOINT = http://localhost:2121/api/v1/graphql
  PUBLIC_PATH = /static/
  API_URL = http://localhost:2121
  DEV_API_URL = http://localhost:2121
  API_PREFIX = /api/v1
  SERVER_PORT = 3000
  DEV_PORT = 3000
  DATABASE_URL=postgres://boldr:password@localhost:5432/boldr
```  
       
#### Configuration File(s)
Configuration settings are located in `project/.boldr/config/default.js`.     

This file allows control over the Express server, its middleware, and the build tools. 
See the [Config Docs](/docs/pkgs/config.md) for detailed information on its usage.    

#### Setup Postgres and Redis    

> Boldr requires a Postgres database and a Redis service. Using the docker-compose.yml file included in the repo is the quickest way.

**Create the persistent data containers**:    
        
Redis: `docker volume create --name=redis_data`      
Postgres: `docker volume create --name=postgres_data`       
      
Start with `docker-compose up -d`    
        
**Connection Info**     
Redis runs on port `6379`
Postgres runs on port `5432`    
Both are bound to `0.0.0.0` and are accessible to the host.

The default Postgres user is boldr and the password is password `postgres://boldr:password@localhost:5432/boldr`


**NOTE:** If you are not using the docker-compose setup, make sure to modify the DATABASE_URL in the `.env` file accordingly. 

#### Migrate and Seed database
Use `yarn migrate` to run the database migrations.     
After migrating, use `yarn seed` to populate the tables with fake data.

#### Up and Running
Start the client dev with `yarn dev`, then in a second terminal `yarn dev:server`.


After Boldr has started visit <http://localhost:3000>. 

A admin account is already created and you may login using these credentials:

> Email - admin@boldr.io
> Password - password


The GraphQL server runs on port 2121 by default.
