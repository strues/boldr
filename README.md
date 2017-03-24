<p align="center"><img src="/docs/assets/logo-small.png"></p>

<p align="center"><a href="/packages/boldr-api">Boldr-API</a> || <a href="/packages/boldr-cms">Boldr-CMS</a></p>

>
Boldr is a modern content management framework. Think of Boldr as the solid foundation for building your next great web application. Unlike other CMS platforms, Boldr is entirely JavaScript. Boldr features Universal / Isomorphic rendering for improved performance and Search Engine Optimization.

A CLI is in the early development stages. You will be able to scaffold out a complete or partial Boldr project with a single command. Viewable in its repository [here](https://github.com/boldr/getBoldr)

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
2. `yarn && yarn bootstrap`
3. Modify environment variables `cd packages/boldr-api && cp .env_example .env`


## Usage

Quick notes:

- Ports
  - **API**: 2121
  - **Frontend**: 3000 - _React SSR server_  
  - **Webpack**: 3001 - _dev only_  

Boldr is configured by default to serve api documentation from `http://localhost:3000/apidocs/`. The docs are mostly complete and are kept up to date. You can also find them in [the docs folder](docs/apidoc.md) as markdown or view them live at https://staging.boldr.io/apidocs/.


### Development

#### Database
> Located in the [boldr-api package](/packages/boldr-api)

The database does not require an initial migration and seed if ran using the provided Docker setup.  


Running your own Postgres database? No problem. Create a database and add the connection details to the `.env` file and `package.json`. Once you have a fresh database, run the migration command with `npm run migrate` followed by `npm run seed`. Your database is now ready to go!


#### CMS

Run the CMS using `npm run dev`

After Boldr has started visit <http://localhost:3000>. The admin account is already created and you may login using these credentials:

> Email - admin@boldr.io
> Password - password

Settings for the build process are located in `config/values.js`.

### Production

See the [production docs](/docs/production.md)


## Screenshots  
|         |            |   |
| ------------- |:-------------:| -----:|
![blog][blogImg] | ![blog2][editProfileImg]  | ![single][blogSingle]
![dash][dashboardImg] | ![files][adminPostListImg]  | ![members][editPostImg]
![post][postEditorImg]  | ![prof][profileImg]  | ![settings][settingsImg]
![tag][tagsImg] |  |


## Documentation

- [`Roadmap`](ROADMAP.md)
- [`API Markdown`](/docs/apidoc.md)
- [`API Live`](https://staging.boldr.io/apidocs/)
- [`Editing the Nav`](/docs/navigation.md)
- [`Theming`](/docs/theming.md)
- [`Docker`](/docs/docker.md)
- [`Production`](/docs/production.md)
- [`Nginx`](/docs/nginx.md)
- [`Troubleshooting`](/docs/troubleshooting.md)

## Demo

View an **early** demo at <https://staging.boldr.io>

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
