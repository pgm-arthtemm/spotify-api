/**
 * Create knex connection
 */

import knex from 'knex';

const knexSpotify = knex({
  client: 'sqlite3',
  connection: {
    filename: './db/spotify.db3',
  },
  useNullAsDefault: true,
});

export default knexSpotify;
