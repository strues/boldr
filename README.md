
<p align="center"><img src="/docs/assets/boldr-text-logo.png" width="200"></p>

[![CircleCI](https://circleci.com/gh/strues/boldr.svg?style=svg)](https://circleci.com/gh/strues/boldr)

[![Code Climate](https://codeclimate.com/github/strues/boldr/badges/gpa.svg)](https://codeclimate.com/github/strues/boldr)   [![codecov](https://codecov.io/gh/strues/boldr/branch/master/graph/badge.svg)](https://codecov.io/gh/strues/boldr)  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)  


-------    

**Boldr** is a modern content management framework.

Think of Boldr as the solid foundation for building your next great web application. Unlike most other CMS platforms, Boldr is entirely JavaScript. Boldr features Universal / Isomorphic rendering for improved performance and Search Engine Optimization.


**Have questions or want to help with development?**
Come visit with us
[![Join the chat at https://gitter.im/boldr](https://badges.gitter.im/boldr.svg)](https://gitter.im/boldr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Table of Contents
- [Current Features](#current-features)
- [Technology Stack](#core-technologies)
- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [Documentation](https://docs.boldr.io)
- [Demo](#demo)
- [Contributing](#contributing)
- [Screenshots](#screenshots)


## Current Features

* GraphQL API
* Rich Text Editor / WYSIWYG
* Server side rendering
* Authentication with JSON Web Tokens
* Content tagging - Easily relate content to similar topics
* Drag and drop file uploading
* User management with basic role based access control (major expansion of capabilities planned for a later date)
* Basic user and author profiles.
* Redis caching
* Command line interface - Quick and easy project bootstrapping


## Technology Stack

- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [React](https://github.com/facebook/react)
- [Postgres](https://github.com/postgres/postgres) ([Knex](http://knexjs.org/) & [Objection](https://github.com/Vincit/objection.js/))
- [Redis](http://redis.io/)
- [Docker](https://github.com/docker/docker)
- [Webpack](https://github.com/webpack/webpack)

## Packages
| Package      | Documentation |
|:-------------|:---------------------------------------------|
| [CLI](/packages/cli) | [CLI Docs](/docs/pkgs/cli.md)    |
| [Config](/packages/config) | [Config Docs](/docs/pkgs/config.md)    |
| [Core](/packages/core) | [Core Docs](/docs/pkgs/core.md)    |
| [Frontend](/packages/frontend) |   |
| [Server](/packages/server) |    |
| [Tools](/packages/tools) | [Tool Docs](/docs/pkgs/tools.md)    |
| [Utils](/packages/utils) |  |

## Getting Started

**Development Disclaimer:** At the moment, Boldr is in active development. Meaning there might be the occasional breaking change or architectural adjustments. 

**Step 1**
First get the files to your machine.

**Using git:**  

```shell
  git clone git@github.com:strues/boldr.git <DIR_NAME>
  cd <DIR_NAME>
  yarn
```  

This will install **all** of the packages using lerna.

The main application is located in `project`.   
The frontend and the react server entrypoint are located in `project/src`.    
The actual server resides in `project/server`.
    



## Usage
 
1. Copy the environment sample: `cd project && cp .env_example .env`.   
2. Checkout `project/.boldr/config/default.js` for different server configuration options. [Config Docs](/docs/pkgs/config.md)  
3. Setup Postgres and Redis    

Boldr requires a Postgres database and a Redis service. Using the docker-compose.yml file included in the repo is the quickest way.

`docker-compose up --build -d` starts Postgres on port 5432 and Redis on port 6379.


If you are not using the docker-compose setup, make sure to modify the `.env` file accordingly. 

4. Run the database migrations and seed it `yarn migrate && yarn seed`.     

5. Start the client dev with `yarn dev`, then in a second terminal `yarn dev:server`.


After Boldr has started visit <http://localhost:3000>. 

A admin account is already created and you may login using these credentials:

> Email - admin@boldr.io
> Password - password


The GraphQL server runs on port 2121 by default.

### Production

See the [production docs](docs/production.md)


## Demo
Up again soon..

> Email - admin@boldr.io<br>
> Password - password

## Contributing

Looking for an open source project to contribute to? All types of contributions are welcome here. Take a look at some of the [current issues](https://github.com/strues/boldr/issues) and see if you find something you'd like to help out with. Feel free to submit pull requests to the develop branch.

**Contribution Area Ideas**

- Documentation
- Designs
- React
- Node
- Build / Installation
- Play a major role in a community driven project, have some fun, and work on improving your skills.


## Screenshots  



[cc-img]: https://codeclimate.com/github/strues/boldr/badges/gpa.svg
[cc-link]: https://codeclimate.com/github/strues/boldr

[coverage-link]: https://codeclimate.com/github/strues/boldr/coverage
[coverage-img]: https://codeclimate.com/github/strues/boldr/badges/coverage.svg
