import pgtools from 'pgtools';
import config from '../../config';

require('dotenv').config();

const cfg = {
  user: config.postgres.user,
  password: config.postgres.password,
  port: 5432,
  host: config.postgres.host,
};

pgtools.createdb(cfg, 'boldr', (err, res) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log(res);
});
