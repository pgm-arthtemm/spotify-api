/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import passport from 'passport';
import passportJWT from 'passport-jwt';
import dotenv from 'dotenv';
import Logger from '../lib/Logger.js';

// init dotenv
dotenv.config();

// init passport
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// define options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_UNIQUE_KEY,
};

// define admin or not
let is_admin = 0;

// use passport
passport.use(
  new JwtStrategy(opts, async (jwtData, done) => {
    is_admin = jwtData.is_admin;
    try {
      Logger.info(`${jwtData.username} does an authenticated request`);
      return done(null, jwtData.username);
    } catch (error) {
      done(null, error);
    }
  }),
);

export default (req, res, next) => {
  if (req.method === 'GET') {
    // no need for authentication on get requests
    next();
  } else {
    // authenticate user
    passport.authenticate('jwt', { session: false }, (error, user, info) => {
      if (error || !user) {
        Logger.error(info);
        res.status(401).send(info);
      } else if (is_admin === 0) {
        res.status(401).send('Only admins can post songs.');
      } else {
        next();
      }
    })(req, res, next);
  }
};
