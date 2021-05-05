/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable radix */
import Express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserDb from '../../lib/UserDb.js';
import Logger from '../../lib/Logger.js';
import parseUser from '../spotify/parseUser.js';

// init user database
const userData = new UserDb();

// init dotenv
dotenv.config();

// init router
const app = Express.Router();

// init passport
const LocalStrategy = passportLocal.Strategy;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
},
async (username, password, done) => {
  Logger.info(username);

  // get user from database
  const user = await userData.findOne(username);

  // check if user is found
  if (!user) {
    return done(null, false, { message: 'User not found in database' });
  }

  // check for valid password
  // eslint-disable-next-line no-use-before-define
  if (!await isPasswordValid(password, user.password)) {
    return done(null, false, { message: 'Password incorrect' });
  }

  // return the existing and authenticated user
  return done(null, user);
}));

app.post('/login', (req, res) => {
  // do authentaction
  console.log(req.body);
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      res.status(401).json(info);
    } else if (!user) {
      res.status(401).json(info);
    } else {
      const token = jwt.sign(user, process.env.JWT_UNIQUE_KEY, {
        expiresIn: parseInt(process.env.JWT_LIFETIME),
      });
      console.log(token);

      res.status(200).json({
        succes: 'true',
        token: token,
        user: {
          id: user.id,
          username: user.email,
        },
      });
    }
  })(req, res);

  // res.status(200).send('login post endpoint is working');
});

app.post('/register', (req, res) => {
  const {
    username, email, is_admin, password,
  } = parseUser(req, res);
  bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS)).then((hash) => {
    userData.add(username, email, is_admin, hash);
    res.status(200).send(hash);
  });
});

export default app;

const isPasswordValid = async (userPassword, dbPassword) => {
  const match = await bcrypt.compare(userPassword, dbPassword);
  return match;
};
