# Spotify API
## Project for programming-3, Arteveldehogeschool

Assignment description: Create an API to manage songs and playlists.  
The API allows you to add songs as an administrator, every member can create and manage playlists.  

## Intro
This database driven API allows a user to register new users and logging in using a users credentials.  
A registered user can create, manage or delete playlists with songs.  
Only an administrator can add, update or delete songs from the Songs table.  

## Content
- [Using the API](#using-the-api)
- [Database](#database)
- [Endpoints](#endpoints)

# Using the API

Before using the API you have to install the used node modules and start the server.

- Install node modules for this API with `npm install`.
- Start the server with `npm run dev`.
- (optional) Seed the User tabel with new data with `npm run seed`.

# Database

## Build

The database was made with DB Browser (SQLite) using following node modules:
- [knex.js](https://www.npmjs.com/package/knex)
- [SQLite3](https://www.npmjs.com/package/sqlite3)
- [Password encryption with bcrypt](https://www.npmjs.com/package/bcrypt)
- [Seeded with faker library](https://www.npmjs.com/package/faker)

The Users table was seeded with 50 users generated with faker.js data.  
You can add more administrators using the `auth/register` endpoint documented [here](#authentication)  

## Structure
The database has 3 tables. Every table has an autoincrementing id starting from 1.
- Songs
  - title
  - artist
  - uri
  - date_of_creation

- Users
  - username
  - password
  - email
  - is_admin: boolean (0 = no admin, 1 = admin)

- Playlists
  - title
  - user_id: foreign key from Users.id
  - song_list: array of strings
  - date_of_creation
  - date_of_modification

# Endpoints

## Authentication

This API uses following node modules:
- [passport](https://www.npmjs.com/package/passport)
- [passport-local](https://www.npmjs.com/package/passport-local)
- [passport-jwt](https://www.npmjs.com/package/jsonwebtoken)

`/auth/register` is a __POST__ request to register a new user.
- The __POST /auth/register__ endpoint requires an object:
```json
{
  "user": {
    "username": "exampleUsername",
    "password": "examplePassword",
    "email": "email.address@example.com",
    "is_admin": 0
  }
}
```

`/auth/login` is a __POST__ request to login a user.
- The __POST /login__ endpoint requires an object with existing credentials:
```json
{
  "username": "exampleUsername",
  "password": "examplePassword"
}
```
A successful login request will return a json object containing a jwt token:
```json
{
  "success": "true",
  "token": "jwttoken",
  "user": {
    "id": 1,
    "username": "exampleUsername"
  }
}
```  
  ## How to get an authenticated user:
1. Register a new user
2. Login with the new user
3. Copy the jwt token
4. Paste the token in as bearer token
5. You can now create, read, update and delete playlists

## Songs

`/songs` is a __GET__ request to get all the songs and a __POST__ request to post a new song.
- the __GET /songs__ endpoint returns an array of song objects.
- The __POST /songs__ endpoint can only be used by an admin and requires an object. The uri has to be valid, it has to start with `spotify:track:` and be more than 20 characters
```json
{
  "song": {
    "title": "exampleTitle",
    "artist": "exampleArtist",
    "uri": "spotify:track:exampleUri"
  }
}
```
`/songs/:id` is a __PUT__ request to update a song and a __DELETE__ request to delete a song. __These requests can only be done by admins.__
- the __DELETE songs/:id__ endpoint requires the id of the song you want to delete.
- the __PUT songs/:id__ endpoint requires the id of the song you want to update and an updated song object:
```json
{
  "song": {
    "title": "updatedTitle",
    "artist": "updatedArtist",
    "uri": "updatedUri"
  }
}
```  

## Playlists

`/playlists` is a __GET__ request to get all the playlists and a __POST__ request to post a new song.
- the __GET /playlists__ endpoint returns an array of playlist objects.
- The __POST /playlists__ endpoint requires an object:
```json
{
  "playlist": {
    "title": "exampleTitle",
    "user_id": 1,
    "song_list": ["song1", "song2"]
  }
}
```
`/playlists/:id` is a __PUT__ request to update a playlist and a __DELETE__ request to delete a playlist.
- the __DELETE platlists/:id__ endpoint requires the id of the playlist you want to delete.
- the __PUT playlists/:id__ endpoint requires the id of the playlist you want to update and an updated playlist object:
```json
{
  "playlist": {
    "title": "updatedTitle",
    "user_id": 1,
    "song_list": ["song1", "song2", "song3"]
  }
}
```