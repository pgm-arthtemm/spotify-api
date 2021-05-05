/* eslint-disable no-return-await */
/**
 * Registering the playlist endpoints
 */

import Express from 'express';
import PlaylistDb from '../../lib/PlaylistDb.js';
import {
  addPlaylist,
  deletePlaylist,
  getPlaylists,
  updatePlaylist,
} from './crudPlaylist.js';

const app = Express.Router();

const playlistData = new PlaylistDb();

// get the playlists
app.get('/', async (req, res) => await getPlaylists(playlistData, req, res));

// add a playlist
app.post('/', async (req, res) => await addPlaylist(playlistData, req, res));

// update a specific playlist
app.put('/:id', async (req, res) => await updatePlaylist(playlistData, req, res));

// delete a specific playlist
app.delete('/:id', async (req, res) => await deletePlaylist(playlistData, req, res));

export default app;
