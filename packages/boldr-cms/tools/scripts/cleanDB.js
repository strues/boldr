/* eslint-disable */
const pg = require('pg');

const client = new pg.Client(process.env.POSTGRES_CONN_URI);
client.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  const queryStr = ``;

  client.query(queryStr, (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result);
    client.end();
  });
});
