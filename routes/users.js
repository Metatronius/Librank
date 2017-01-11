'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const api_key = require('../API-key/api_key')

router.post('/users', (req, res, next) =>
{
  bcrypt.hash(req.body.password, 12)
    .then((hashed_password) =>
      {
        return knex('users')
          .insert(
          {
            email: req.body.email,
            hashed_password: hashed_password,
            username: req.body.username
          }, '*');
      }
      .then(() =>
      {
        let libraryJSON = $.get(
          `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${req.body.username}&api_key=${api_key.getKey()}&format=json`
        );
        let id = knex.select('id')
          .from(users)
          .where('email', req.body.email)
        for (let i = 0, i < libraryJSON.toptracks.track.length(), i++)
        {
          let toSongs = {
            trackName: libraryJSON.toptracks.track[i].name,
            albumArt: libraryJSON.toptracks.track[i].image[2],
            timesPlayed: 0,
            kFactor: 30,
            elo: 800,
            user_id: id
          }
          knex('songs').insert(toSongs, '*');
        }
      })
    .then((users) =>
    {
      const user = users[0];
      delete user.hashed_password;
      res.send(user);
    })
    .catch((err) =>
    {
      next(err);
    });
});


module.exports = router;
