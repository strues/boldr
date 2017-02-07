# What's Boldr?

<img src="https://boldr.io/boldr.png" width="179" />

[![Build Status](https://travis-ci.org/strues/boldr.svg?branch=master)](https://travis-ci.org/strues/boldr) [![Code Climate][cc-img]][cc-link]  [![codecov](https://codecov.io/gh/strues/boldr/branch/master/graph/badge.svg)](https://codecov.io/gh/strues/boldr) [![Gitter][gitter-img]][gitter-link] [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Boldr is a modern content management framework. Think of Boldr as the solid foundation for building your next great web application. Unlike other CMS platforms, Boldr is entirely JavaScript. Boldr features Universal / Isomorphic rendering for improved performance and Search Engine Optimization.

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
|         |            |   |
| ------------- |:-------------:| -----:|
![blog][blogImg] | ![blog2][blogImg2]  | ![single][blogSingle]
![dash][dashboardImg] | ![files][filesImg]  | ![members][membersImg]
![post][newPostImg]  | ![prof][profileImg]  | ![settings][settingsImg]
![tag][tagsImg] |  |


## Core Technologies

- [Node](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [React](https://github.com/facebook/react)
- [Postgres](https://github.com/postgres/postgres) ([Knex](http://knexjs.org/) & [Objection](https://github.com/Vincit/objection.js/))
- [Redis](http://redis.io/)
- [Docker](https://github.com/docker/docker)
- [Webpack](https://github.com/webpack/webpack)

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

Boldr is configured by default to serve api documentation from `http://localhost:3000/apidocs/`. The docs are mostly complete and are kept up to date. You can also find them in [the docs folder](docs/apidoc.md) as markdown.


### Development

#### Database


The database does not require an initial migration and seed if ran using the provided Docker setup.  


Running your own Postgres database? No problem. Create a database and add the connection details to the `.env` file and `package.json`. Once you have a fresh database, run the migration command with `npm run migrate` followed by `npm run seed`. Your database is now ready to go!


#### CMS

Run the CMS using `npm run dev`

After Boldr has started visit <http://localhost:3000>. The admin account is already created and you may login using these credentials:

> Email - admin@boldr.io
> Password - password

Settings for the build process are located in `config/values.js`.

### Production

Running Boldr in production is fairly simple. We'll go over the steps right now in order to get you up and running as soon as possible. Please bear with us, as the process for automation continues to evolve.

From the root directory use the command, `make release`.

The `make release` command creates a folder named release in the root of the repository. Then compiles all files and copies them to the release folder.

Upload the contents of the release directory to your preferred host.

Install the production dependencies for `BoldrCMS` packages using `npm install --production`.

Finally using pm2 or your preferred script run Boldr with `npm start`.

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

## Demo

View a **very early** demo at <https://staging.boldr.io>

> Email - admin@boldr.io<br>
> Password - password


[cc-img]: https://codeclimate.com/github/strues/boldr/badges/gpa.svg
[cc-link]: https://codeclimate.com/github/strues/boldr
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/boldr/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[coverage-link]: https://codeclimate.com/github/strues/boldr/coverage
[coverage-img]: https://codeclimate.com/github/strues/boldr/badges/coverage.svg

[blogImg]: docs/assets/blog.png
[blogImg2]: docs/assets/blog2.png
[blogSingle]: docs/assets/blogSingle.png
[dashboardImg]: docs/assets/dashboard.png
[filesImg]: docs/assets/files.png
[membersImg]: docs/assets/members.png
[newPostImg]: docs/assets/newPost.png
[profileImg]: docs/assets/profile.png
[settingsImg]: docs/assets/settings.png
[tagsImg]: docs/assets/tags.png
