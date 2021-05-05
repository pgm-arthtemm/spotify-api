/**
 * CRUD endpoint actions
 */

import parseSong from './parseSong.js';

/**
* Getting the songs
*
* @param {*} song
* @param {*} request
* @param {*} response
*/
export const getSongs = async (song, request, response) => {
  try {
    response.status(200).json({ songs: await song.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
* Create a new song
*
* @param {*} song
* @param {*} request
* @param {*} response
*/
export const addSong = async (song, request, response) => {
  const creationDate = new Date().toLocaleString();
  try {
    const { title, artist, uri } = parseSong(request, response);
    const newSong = await song.add(title, artist, uri, creationDate);
    response.status(201).json({ song: newSong });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
* Update a song
*
* @param {*} song
* @param {*} request
* @param {*} response
*/
export const updateSong = async (song, request, response) => {
  try {
    const { title, artist, uri } = parseSong(request);
    const { id } = request.params;
    const updatedSong = await song.update(id, title, artist, uri);
    response.status(200).json({ song: updatedSong });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
* Deletes a song
*
* @param {*} song
* @param {*} request
* @param {*} response
*/
export const deleteSong = async (song, request, response) => {
  try {
    const { id } = request.params;
    await song.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
