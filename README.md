![boldr logo](https://boldr.io/boldr.png)

[![Build Status][circle-img]][circle-link] [![Code Climate][cc-img]][cc-link]  [![codecov](https://codecov.io/gh/strues/boldr/branch/master/graph/badge.svg)](https://codecov.io/gh/strues/boldr) [![Gitter][gitter-img]][gitter-link] [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# What's Boldr?

Boldr is a modern content management framework. Think of Boldr as the solid foundation for building your next great web application. Unlike many CMS platforms, Boldr is entirely JavaScript. It features Universal / Isomorphic rendering for improved performance and Search Engine Optimization. Boldr uses Postgres as its database. Express serves the standalone API and the server-side rendering application. Redis provides the store for user sessions and query caching.

**Table of Contents**
- [Boldr](#boldr)
- [Core Technologies](#core-technologies)
- [API](https://github.com/strues/boldrAPI)
- [Getting Started / Installation](#getting-started-installation)
- [Editor](#editor)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Demo](#demo)


## Core Technologies

- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [React](https://github.com/facebook/react)
- [Postgres](https://github.com/postgres/postgres) ([Knex](http://knexjs.org/) & [Objection](https://github.com/Vincit/objection.js/))
- [Redis](http://redis.io/)
- [Docker](https://github.com/docker/docker)
- [Webpack v2](https://github.com/webpack/webpack)

## Getting Started / Installation

**IMPORTANT**:  
Please make sure you have boldrAPI downloaded before running Boldr. You can get it by running `git clone https://github.com/strues/boldrAPI.git` or with the command `make api`.

**A word of caution:** At the moment, Boldr is in active development. Meaning there can and most likely will, be the occasional breaking changes, and architectural adjustments.

That being said, I'm fairly confident the majority of large breaking changes is behind us.

1. `git clone https://github.com/strues/boldr.git`
2. `cd boldr && yarn install / npm install`
3. `cp env.example .env` and open it up in your preferred editor.
4. The .env file contains important paths for the bundling process.

## Usage

Quick notes:

- Ports

  - **Frontend**: 3000 - _this is also the ssr server_  
  - **Webpack**: 3001 - _dev only_  
  - **API**: 2121  

- Hot reloading doesn't work everywhere due to async/dynamic routes.

### Development

**Starting it up** -- Run `npm run dev`  

After Boldr has started visit <http://localhost:3000>. The admin account is already created and you may login using these credentials:

> Email - admin@boldr.io<br>
> Password - password

### Production

> I wouldn't recommend it for a serious website. Not yet. However if you feel like building the application as if it were production execute the following.

Running Boldr in production is fairly simple. We'll go over the steps right now in order to get you up and running as soon as possible. Please bear with us, as the process for automation continues to evolve.

Please [`See the documentation`](docs/production.md) for a detailed explaination.


## Contributing

Looking for an open source project to contribute to? All types of contributions are welcome here. In fact, I'd love some assistance. Take a look at some of the [current issues](https://github.com/strues/boldr/issues) and see if you find something you'd like to help out with. Feel free to submit pull requests to the develop branch.

**Contribution Area Ideas**

- Documentation
- Designs
- React
- Node
- Build / Installation
- Play a major role in a community driven project, have some fun, and work on improving your skills.

## Documentation

- [`Roadmap`](ROADMAP.md)
- [`API`](docs/apidoc.md)
- [`Theming`](docs/theming.md)
- [`Docker`](docs/docker.md)
- [`Production`](docs/production.md)
- [`Nginx`](docs/nginx.md)
- [`Troubleshooting`](docs/troubleshooting.md)

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
