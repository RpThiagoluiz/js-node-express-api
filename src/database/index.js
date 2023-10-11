const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  post: 5432,
  user: 'root',
  password: 'root',
  database: 'mycontacts',
});

client.connect();

exports.query = async (queryCommand, values) => {
  const { rows } = await client.query(queryCommand, values);

  return rows;
};
