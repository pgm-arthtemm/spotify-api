/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/**
 * Writing to a playlist JSON file
 */

import knexSpotify from '../../db/knexSpotify.js';
import Logger from './Logger.js';

export default class PlaylistDb {
  /**
   * Add a new playlist
   *
   * @param {string} title
   * @param {*} user_id
   * @param {string} date_of_creation
   * @param {string} date_of_modification
   * @param {Array} song_list
   * @returns
   */
  // eslint-disable-next-line consistent-return
  async add(title, user_id, song_list, date_of_creation, date_of_modification) {
    try {
      return await knexSpotify('playlists').insert({
        title,
        user_id,
        date_of_creation,
        date_of_modification,
        song_list,
      });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Get all playlists
   */
  async get() {
    try {
      return await knexSpotify('playlists').select('*');
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Update a playlist
   *
   * @param {*} id
   * @param {*} title
   * @param {*} song_list
   * @param {*} date_of_modification
   * @returns
   */
  async update(id, title, song_list) {
    try {
      return await knexSpotify('playlists').where('id', id).update({
        title,
        song_list,
      });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Deletes a playlist
   *
   * @param {*} id
   * @returns
   */
  async delete(id) {
    try {
      return await knexSpotify('playlists').where('id', id).del();
    } catch (e) {
      Logger.error(e.message);
    }
  }
}
