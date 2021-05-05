/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/**
 * Writing to a songs JSON file
 */

import knexSpotify from '../../db/knexSpotify.js';
import Logger from './Logger.js';

export default class SongDb {
  /**
   * Add a new song
   *
   * @param {string} title
   * @param {string} artist
   * @param {string} uri
   * @param {string} date_of_creation
   */
  async add(title, artist, uri, date_of_creation) {
    try {
      return await knexSpotify('songs').insert({
        title,
        artist,
        uri,
        date_of_creation,
      });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * Get all the songs
   */
  async get() {
    try {
      return await knexSpotify('songs').select('*');
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * update a specific song
   *
   * @param {*} id
   * @param {string} artist
   * @param {string} title
   * @param {string} uri
   */
  async update(id, title, artist, uri) {
    try {
      return await knexSpotify('songs').where('id', id).update({
        title,
        artist,
        uri,
      });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
   * delete a specific song
   *
   * @param {*} id
   */
  async delete(id) {
    try {
      return await knexSpotify('songs').where('id', id).del();
    } catch (e) {
      Logger.error(e.message);
    }
  }
}
