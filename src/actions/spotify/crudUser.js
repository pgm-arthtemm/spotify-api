/* eslint-disable camelcase */
/**
 * CRUD endpoint actions
 */
import parseUser from './parseUser.js';

/**
 * Getting the users
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const getUsers = async (user, request, response) => {
  try {
    response.status(200).json({ users: await user.get() });
  } catch ({ message }) {
    response.status(500);
    response.json({ error: message });
  }
};

/**
 * Create a new user
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const addUser = async (user, request, response) => {
  try {
    const {
      username, email, is_admin, password,
    } = parseUser(request, response);
    const newUser = await user.add(username, email, is_admin, password);
    response.status(201).json({ user: newUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Update a user
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const updateUser = async (user, request, response) => {
  try {
    const {
      username, email, is_admin, password,
    } = parseUser(request);
    const { id } = request.params;
    const updatedUser = await user.update(id, username, email, is_admin, password);
    response.status(200).json({ user: updatedUser });
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};

/**
 * Deletes a user
 *
 * @param {*} user
 * @param {*} request
 * @param {*} response
 */
export const deleteUser = async (user, request, response) => {
  try {
    const { id } = request.params;
    await user.delete(id);
    response.status(204).end();
  } catch ({ message }) {
    response.status(500).json({ error: message });
  }
};
