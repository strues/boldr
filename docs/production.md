#Production

Running Boldr in production is fairly simple. We'll go over the steps right now in order to get you up and running as soon as possible. Please bear with us, as the process for automation continues to evolve.

## Steps
- Build BoldrCMS by running `make build`.
- Upload the contents of the `dist` folder to one directory above your web root.
- Upload the contents of `public` to your web root.
- Upload `public` folder and ensure it is set to be served as your web root.
- Install the production dependencies on your server with `npm install --production`.
- Upload BoldrAPI to the same folder where you have `public` and `boldrCMS`.
- Install the necessary files.
- Configure the connections for Postgres and Redis.
- Migrate and seed the database.
- Start the API.
- Start the CMS with `npm run start`.

The start commands expect [PM2](http://pm2.keymetrics.io/) to be installed globally on your server. The API start command expects your `postgres__uri` env variable to be modified so that it matches your actual postgres connection.

### Help

**Directory Structure**
An example of how your directory containing Boldr should look is as follows:
