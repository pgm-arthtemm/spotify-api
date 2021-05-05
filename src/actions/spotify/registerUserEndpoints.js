/* eslint-disable no-return-await */
/**
 * Registering the users endpoints
 */

import Express from 'express';

import UserDb from '../../lib/UserDb.js';
import {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} from './crudUser.js';

const app = Express.Router();

const userData = new UserDb();

// get the users
app.get('/', async (req, res) => await getUsers(userData, req, res));

// add a user
app.post('/', async (req, res) => await addUser(userData, req, res));

// update a specific user
app.put('/:id', async (req, res) => await updateUser(userData, req, res));

// delete a specific user
app.delete('/:id', async (req, res) => await deleteUser(userData, req, res));

export default app;
