/**
 * Main application
 */

import Express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Logger from './lib/Logger.js';
import registerSongEndpoints from './actions/spotify/registerSongEndpoints.js';
import registerUserEndpoints from './actions/spotify/registerUserEndpoints.js';
import registerPlaylistEndpoints from './actions/spotify/registerPlaylistEndpoints.js';
import authenticate from './actions/auth/index.js';
import middleware from './middleware/index.js';

// create a new express application
const app = Express();

const NODE_ENV = process.env.NODE_ENV;

// initiate dotenv
dotenv.config();

// enable cors
app.use(cors());

// enable bodyParser
app.use(bodyParser.json());

// register endpoints for songs
app.use('/songs', ...middleware, registerSongEndpoints);

// register endpoints for users
app.use('/users', registerUserEndpoints);

// register endpoints for playlists
app.use('/playlists', registerPlaylistEndpoints);

// register auth endpoints
app.use('/auth', authenticate);

/**
 * Start listening to a port
 */
if (NODE_ENV !== 'test') {
  app.listen(process.env.PORT, () => {
    Logger.info(`Server started on port http://localhost:${process.env.PORT}`);
  });
}

// eslint-disable-next-line import/prefer-default-export
export { app };
