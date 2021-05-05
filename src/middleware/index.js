/**
 * indexing middleware
 */

import auth from './auth.js';
import validator from './validation.js';

export default [auth, validator];
