/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable object-shorthand */
/**
 * Writing to a users JSON file
 */

import knexSpotify from '../../db/knexSpotify.js';
import Logger from './Logger.js';

export default class UserDb {
  /**
  * Find a user in the users database
  *
  * @param {string} username
  * @returns
  */
  async findOne(username) {
    try {
      return await knexSpotify('users')
        .where({ username: username })
        .select('*')
        .first();
    } catch (e) {
      return Logger.error(e.message);
    }
  }

  /**
  * Add a new user
  *
  * @param {string} username
  * @param {string} email
  * @param {integer} is_admin
  * @param {string} password
  */
  async add(username, email, is_admin, password) {
    try {
      return await knexSpotify('users').insert({
        username,
        email,
        is_admin,
        password,
      });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
  * Get all the users
  */
  async get() {
    try {
      return await knexSpotify('users').select('*');
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
  * Updates a user
  *
  * @param {*} id
  * @param {*} username
  * @param {*} email
  * @param {*} is_admin
  * @param {*} password
  * @returns
  */
  async update(id, username, email, is_admin, password) {
    try {
      return await knexSpotify('users').where('id', id).update({
        username,
        email,
        is_admin,
        password,
      });
    } catch (e) {
      Logger.error(e.message);
    }
  }

  /**
  * Deletes a user
  *
  * @param {*} id
  * @returns
  */
  async delete(id) {
    try {
      return await knexSpotify('users').where('id', id).del();
    } catch (e) {
      Logger.error(e.message);
    }
  }

  async addSeeds(field) {
    try {
      // add field, get new id
      const id = await knexSpotify('users').insert(field);
      return id;
    } catch (message) {
      console.log(message);
    }
  }
}
