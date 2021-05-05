import request from 'supertest';
import UserDb from '../src/lib/UserDb.js';
import PlaylistDb from '../src/lib/PlaylistDb.js';
import SongDb from '../src/lib/SongDb.js';
import { app } from '../src/index.js';

const userData = new UserDb();
const playlistData = new PlaylistDb();
const songData = new SongDb();

describe('Database tests', () => {
  it('should return an array with at least 1 user', async () => {
    const users = await userData.get();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return an array with at least 1 song', async () => {
    const songs = await songData.get();

    expect(Array.isArray(songs)).toBe(true);
    expect(songs.length).toBeGreaterThan(0);
  });

  it('should return an array with at least 1 playlist', async () => {
    const playlists = await playlistData.get();

    expect(Array.isArray(playlists)).toBe(true);
    expect(playlists.length).toBeGreaterThan(0);
  });
});

describe('Endpoints tests', () => {
  let token = '';

  it('should return an access token', async (done) => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'admin123',
      })
      .set('Accept', 'application/json');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
    token = response.body.token;
    done();
  });

  it('should register a new user', async (done) => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        "user": {
          username: "testUser",
          password: "password",
          is_admin: 0,
          email: "email",
        }
      })
      .set('Accept', 'application/json');
      expect(response.statusCode).toEqual(200);

      done();
  });

  it('should return a list of users', async (done) => {
    const response = await request(app)
      .get('/users/')
      .set('Accept', 'application/json')
      .set('Authorization', 'Bearer ' + token);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('users');

    done();
  });
});
