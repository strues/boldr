# What's Boldr?

<img src="https://boldr.io/boldr.png" width="400" />

[![Build Status][circle-img]][circle-link] [![Code Climate][cc-img]][cc-link]  [![codecov](https://codecov.io/gh/strues/boldr/branch/master/graph/badge.svg)](https://codecov.io/gh/strues/boldr) [![Gitter][gitter-img]][gitter-link] [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


Boldr is a modern content management framework. Think of Boldr as the solid foundation for building your next great web application. Unlike other CMS platforms, Boldr is entirely JavaScript. It features Universal / Isomorphic rendering for improved performance and Search Engine Optimization. Boldr uses Postgres as its database. Express serves the API and server rendering application. Redis provides the store for user sessions and query caching.


**Table of Contents**
- [Boldr](#boldr)
- [Core Technologies](#core-technologies)
- [Getting Started / Installation](#getting-started-installation)
- [Editor](#editor)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Demo](#demo)


## Screenshots


## Core Technologies

- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [React](https://github.com/facebook/react)
- [Postgres](https://github.com/postgres/postgres) ([Knex](http://knexjs.org/) & [Objection](https://github.com/Vincit/objection.js/))
- [Redis](http://redis.io/)
- [Docker](https://github.com/docker/docker)
- [Webpack v2](https://github.com/webpack/webpack)

## Getting Started / Installation

**Development Disclaimer:** At the moment, Boldr is in active development. Meaning there might be the occasional breaking changes, and architectural adjustments.

That said, I'm confident the majority of large breaking changes is behind us.

1. `git clone https://github.com/strues/boldr.git`
2. `yarn`
3. Modify environment variables `cp .env_example .env`


## Usage

Quick notes:

- Ports

  - **Frontend**: 3000 - _React SSR server_  
  - **Webpack**: 3001 - _dev only_  

### Development

#### Database

To create a new database you may run `npm run createdb`. The configuration for the createdb script is located in `tools/scripts/createDB.js`. Now once you have a fresh database, run the migration command with `npm run migrate` followed by `npm run seed`. Your database is now ready to go!

#### CMS

Run the CMS using `npm run dev`

After Boldr has started visit <http://localhost:3000>. The admin account is already created and you may login using these credentials:

> Email - admin@boldr.io
> Password - password

Settings for the build process as well as misc configurations located within the config directory in the `index.js` file.

### Production

Running Boldr in production is fairly simple. We'll go over the steps right now in order to get you up and running as soon as possible. Please bear with us, as the process for automation continues to evolve.

From the root directory use the command, `make build`.

The `make build` command creates a folder named boldr in the root of the repository. Then compiles all files and copies them to the boldr folder.

Upload the contents of the boldr directory to your preferred host.

Install the production dependencies for `boldrCMS` packages using `npm install --production`.

Finally using pm2 or your preferred script, start the API and CMS.

Please [`See the documentation`](docs/production.md) for a detailed explanation.


## Contributing

Looking for an open source project to contribute to? All types of contributions are welcome here. Take a look at some of the [current issues](https://github.com/strues/boldr/issues) and see if you find something you'd like to help out with. Feel free to submit pull requests to the develop branch.

**Contribution Area Ideas**

- Documentation
- Designs
- React
- Node
- Build / Installation
- Play a major role in a community driven project, have some fun, and work on improving your skills.

## Documentation
- [`Gitbook`](https://strues.gitbooks.io/boldr/content/)
- [`Roadmap`](ROADMAP.md)
- [`API`](docs/apidoc.md)
- [`Theming`](docs/theming.md)
- [`Docker`](docs/docker.md)
- [`Production`](docs/production.md)
- [`Nginx`](docs/nginx.md)
- [`Troubleshooting`](docs/troubleshooting.md)
- [`State Tree`](docs/statetree.md)

## Screenshots

## Demo

View a **very early** demo at <https://staging.boldr.io>

> Email - admin@boldr.io<br>
> Password - password


[cc-img]: https://codeclimate.com/github/strues/boldr/badges/gpa.svg
[cc-link]: https://codeclimate.com/github/strues/boldr
[circle-img]: https://circleci.com/gh/strues/boldr.svg?style=svg
[circle-link]: https://circleci.com/gh/strues/boldr
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/boldr/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[coverage-link]: https://codeclimate.com/github/strues/boldr/coverage
[coverage-img]: https://codeclimate.com/github/strues/boldr/badges/coverage.svg
