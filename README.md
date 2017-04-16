# What's Boldr?

<img src="https://boldr.io/boldr.png" width="179" />

[![Build Status](https://travis-ci.org/strues/boldr.svg?branch=master)](https://travis-ci.org/strues/boldr) [![Code Climate][cc-img]][cc-link]  [![codecov](https://codecov.io/gh/strues/boldr/branch/master/graph/badge.svg)](https://codecov.io/gh/strues/boldr)  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)


Boldr is a modern content management framework. Think of Boldr as the solid foundation for building your next great web application. Unlike other CMS platforms, Boldr is entirely JavaScript. Boldr features Universal / Isomorphic rendering for improved performance and Search Engine Optimization.

**Big release coming soon with a [CLI](https://github.com/boldr/getBoldr/tree/master/packages/boldr-cli), generators, and more modularity!**  
> In the mean time, a barebones version of the CLI is available. Install with `npm install -g boldr-cli` and run `boldr-cli init` to get setup with both the API and the CMS packages. After running the command you'll have a boldr folder containing both the api and cms. The folder location at the moment is your current working directory.


Have questions or want to help with development? Join us on <a href="https://slack.boldr.io" target="blank"><img src="/docs/assets/slack-logo.png" height="25" /></a>

**Table of Contents**
- [Boldr](#boldr)
- [Current Features](#current-features)
- [Core Technologies](#core-technologies)
- [Getting Started / Installation](#getting-started-installation)
- [Editor](#editor)
- [Usage](#usage)
  - [Development](#development)
  - [Production](#production)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Demo](#demo)


## Current Features

* Full REST API - Giving you the freedom to do whatever you'd like without looking at an interface.
* Rich text editor / WYSIWYG
* Server side rendering
* Authentication with JSON Web Tokens
* Content tagging - Easily relate content to similar topics
* Drag and drop file uploading
* User management with basic role based access control (major expansion of capabilities planned for a later date)
* Commenting system
* Basic user and author profiles.
* Redis caching

## Screenshots  
|         |            |   |
| ------------- |:-------------:| -----:|
![blog][blogImg] | ![blog2][editProfileImg]  | ![single][blogSingle]
![dash][dashboardImg] | ![files][adminPostListImg]  | ![members][editPostImg]
![post][postEditorImg]  | ![prof][profileImg]  | ![settings][settingsImg]
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

Boldr is configured by default to serve api documentation from `http://localhost:3000/apidocs/`. The docs are mostly complete and are kept up to date. You can also find them in [the docs folder](docs/apidoc.md) as markdown or view them live at https://staging.boldr.io/apidocs/.


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

See the [production docs](docs/production.md)

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

- [`Roadmap`](ROADMAP.md)
- [`API Markdown`](docs/apidoc.md)
- [`API Live`](https://staging.boldr.io/apidocs/)
- [`Editing the Nav`](docs/navigation.md)
- [`Theming`](docs/theming.md)
- [`Docker`](docs/docker.md)
- [`Production`](docs/production.md)
- [`Nginx`](docs/nginx.md)
- [`Troubleshooting`](docs/troubleshooting.md)

## Demo

View an **early** demo at <https://staging.boldr.io>

> Email - admin@boldr.io<br>
> Password - password


[cc-img]: https://codeclimate.com/github/strues/boldr/badges/gpa.svg
[cc-link]: https://codeclimate.com/github/strues/boldr

[coverage-link]: https://codeclimate.com/github/strues/boldr/coverage
[coverage-img]: https://codeclimate.com/github/strues/boldr/badges/coverage.svg

[blogImg]: /docs/assets/blog.png
[editProfileImg]: /docs/assets/editProfile.png
[blogSingle]: /docs/assets/blogSingle.png
[dashboardImg]: /docs/assets/dashboard.png
[adminPostListImg]: /docs/assets/adminPostList.png
[editPostImg]: /docs/assets/editPost.png
[postEditorImg]: /docs/assets/postEditor.png
[profileImg]: /docs/assets/profile.png
[settingsImg]: /docs/assets/settings.png
[tagsImg]: /docs/assets/tags.png
