/* eslint-disable no-return-await */
/**
 * Registering the song endpoints
 */

import Express from 'express';

import SongDb from '../../lib/SongDb.js';
import {
  getSongs,
  addSong,
  updateSong,
  deleteSong,
} from './crudSong.js';

const app = Express.Router();

const songData = new SongDb();

// get the songs
app.get('/', async (req, res) => await getSongs(songData, req, res));

// add a song
app.post('/', async (req, res) => await addSong(songData, req, res));

// update a specific song
app.put('/:id', async (req, res) => await updateSong(songData, req, res));

// delete a specific song
app.delete('/:id', async (req, res) => await deleteSong(songData, req, res));

export default app;
