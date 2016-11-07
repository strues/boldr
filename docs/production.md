#Production

Running Boldr in production is fairly simple. We'll go over the steps right now in order to get you up and running as soon as possible. Please bear with us, as the process for automation continues to evolve.

## Steps
- Build BoldrCMS and BoldrAPI by running `make build`.
- Upload the contents of the build folder to one directory above your web root.
- Upload the contents of `public` to your web root.
- Upload `.env`, and `package.json` to the directory containing `boldrAPI`, `public_html` and `boldrCMS`.
- Install the production dependencies on your server with `npm install`.
- Upload `docker-compose.yml` and run `docker-compose up -d`.
- Run `npm run migrate:prod` and `npm run seed:prod`.
- Start the API with `NODE_ENV=production POSTGRES_CONN_URI=postgres://postgres:password@localhost:5432/boldr node boldrAPI/index.js`.
- Start the CMS with `node boldrCMS/server/index.js`.


### Help

**Directory Structure**
An example of how your directory containing Boldr should look is as follows:

![prod_dir](assets/prod_dir.png)
