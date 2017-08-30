# `@boldr/cli`


#### Commands
> Usage: boldr + Command

| Command      | Description |
|:-------------|:---------------------------------------------|
| dev          | Start development server                     |
| build        | Build production appliction                  |
| build:client | Build client part of production appliction   |
| build:server | Build server part of production appliction   |
| start:ssr    | Start production render server               |
| clean        | Clean up all generated files                 |
| migrate      | Run the database migrations                 |
| migration    | Create a new migration file                 |

#### Clean

Args: [all, server, client, cache]

Usage: `boldr clean <arg>` 

#### Migrate

Usage: `boldr migrate`   

| Option      | Description |  Example |
|:-------------|:-------------|:-------------------------------|
| `-u`, `--url` | Database connection string | `boldr migrate -u postgres://postgres:password@localhost:5432/boldr` |

#### Migration

Usage: `boldr migration`   

| Option      | Description |  Example |
|:-------------|:-------------|:-------------------------------|
| `-n`, `--name` | Name of the migration file | `boldr migration -n something` |

