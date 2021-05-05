/**
 * User parser to parse the incoming request
 */

// We will recieve an object like this:
// {
//   "user": {
//     "username": "a username",
//     "email": "email",
//     "uri": ""
//   }
// }

export default (request) => {
  const { user } = request.body;

  // validate if we have a user in the body
  if (user == null) {
    throw new Error('The user object was not set.');
  }

  // check if we have a username
  if (user.username == null || user.username.length === 0) {
    throw new Error('The user object does not contain a username');
  }

  // check if we have an email
  if (user.email == null || user.email.length === 0) {
    throw new Error('The user object does not contain an email');
  }
  // check if we have is_admin
  if (user.is_admin == null || user.is_admin.length === 0) {
    throw new Error('The user object does not contain is_admin');
  }

  // check if we have a password
  if (user.password == null || user.password.length === 0) {
    throw new Error('The user object does nt contain a password');
  }

  // trim all the white/non characters in our string
  if (user.username != null && user.email != null && user.is_admin != null) {
    user.username = user.username.trim();
    user.email = user.email.trim();
    user.password = user.password.trim();
  }

  // return the parsed user
  return user;
};
