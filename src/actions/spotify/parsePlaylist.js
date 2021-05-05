/**
 * Playlist parser to parse the incoming request
 */

// We will recieve an object like this:
// {
//   "playlist": {
//     "title": "the playlist title",
//     "user_id": "the playlist owner's id",
//     "song_list": "the song uri"
//   }
// }

export default (request) => {
  const { playlist } = request.body;

  // validate if we have a playlist in the body
  if (playlist == null) {
    throw new Error('The playlist object was not set.');
  }

  // check if we have a title
  if (playlist.title == null || playlist.title.length === 0) {
    throw new Error('The playlist object does not contain a title');
  }

  // check if we have a user_id
  if (playlist.user_id == null || playlist.user_id.length === 0) {
    throw new Error('The playlist object does not contain a user_id');
  }
  // check if we have a song_list
  if (playlist.song_list == null || playlist.song_list.length === 0) {
    throw new Error('The playlist object does not contain a song_list');
  }

  // trim all the white/non characters in our string
  if (playlist.title != null && playlist.user_id != null && playlist.song_list != null) {
    playlist.title = playlist.title.trim();
  }

  // return the parsed song
  return playlist;
};
