/* eslint-disable camelcase */
/**
 * CRUD endpoint actions
 */

import parsePlaylist from './parsePlaylist.js';

/**
 * Getting the playlists
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const getPlaylists = async (playlist, request, response) => {
  try {
    response.status(200).json({ playlists: await playlist.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * Adds a new playlist
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const addPlaylist = async (playlist, request, response) => {
  const creationDate = new Date().toLocaleString();
  // first modificationDate = creationDate
  try {
    const { title, user_id, song_list } = parsePlaylist(request, response);
    const newPlaylist = await playlist.add(title, user_id, song_list, creationDate, creationDate);
    response.status(201).json({ playlist: newPlaylist });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Updates a playlist
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const updatePlaylist = async (playlist, request, response) => {
  try {
    const { title, user_id, song_list } = parsePlaylist(request);
    const modificationDate = new Date().toLocaleString();
    const { id } = request.params;
    // eslint-disable-next-line no-shadow
    const updatePlaylist = await playlist.update(id, title, song_list, modificationDate);
    response.status(200).json({ playlist: updatePlaylist });
  } catch ({ message }) {
    response.stats(500).json({ error: message });
  }
};

/**
 * Deletes a playlist
 *
 * @param {*} playlist
 * @param {*} request
 * @param {*} response
 */
export const deletePlaylist = async (playlist, request, response) => {
  try {
    const { id } = request.params;
    await playlist.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
