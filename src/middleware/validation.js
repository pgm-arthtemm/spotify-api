/**
 * Spotify URI validation
 */

export default (req, res, next) => {
  if ((req.body.song.uri).substring(0, 14) === 'spotify:track:' && (req.body.song.uri).length > 20) {
    next();
  } else {
    res.status(406).send('URI is not valid');
  }
};
