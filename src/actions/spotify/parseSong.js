/**
 * Song parser to parse the incoming request
 */

// We will recieve an object like this:
// {
//   "song": {
//     "title": "the song title",
//     "artist": "the song artist",
//     "uri": "the song uri"
//   }
// }

export default (request) => {
  const { song } = request.body;

  // validate if we have a song in the body
  if (song == null) {
    throw new Error('The song object was not set.');
  }

  // check if we have a title
  if (song.title == null || song.title.length === 0) {
    throw new Error('The song object does not contain a title');
  }

  // check if we have an artist
  if (song.artist == null || song.artist.length === 0) {
    throw new Error('The song object does not contain an artist');
  }
  // check if we have a uri
  if (song.uri == null || song.uri.length === 0) {
    throw new Error('The song object does not contain a uri');
  }

  // trim all the white/non characters in our string
  if (song.title != null && song.artist != null && song.uri != null) {
    song.title = song.title.trim();
    song.artist = song.artist.trim();
    song.uri = song.uri.trim();
  }

  // return the parsed song
  return song;
};
