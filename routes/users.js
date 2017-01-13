'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');
const api_key = require('../API-key/api_key');
const request = require('request');


router.post('/users', (req, res, next) =>
{
  const username = req.query.username;
  const password = req.query.password;
  const email = req.query.email;
  // console.log(req);
  if (!username || username.trim() === '')
  {
    const err = new Error('Username must not be blank');
    err.status = 400;

    return next(err);
  }
  if (!password || password.trim() === '')
  {
    const err = new Error('Password must not be blank');
    err.status = 400;

    return next(err);
  }
  if (!email || email.trim() === '')
  {
    const err = new Error('Email must not be blank');
    err.status = 400;

    return next(err);
  }
  knex('users')
    .select(knex.raw('1=1'))
    .where('username', username)
    .first()
    .then((exists) =>
    {
      if (exists)
      {
        const err = new Error('Username already exists');
        err.status = 400;
        throw err;
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashed_password) =>
    {
      return knex('users').insert(
      {
        'username': username,
        'hashed_password': hashed_password,
        'email': email,
      });
    })
    .then(() =>
    {

      const url =
        `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${username}&limit=100&api_key=${api_key.getKey()}&format=json`;
      console.log(url);
      request(url, function(error, response, body)
      {
        if (!error && response.statusCode == 200)
        {
          body = JSON.parse(body);
          // console.log(body.toptracks); //
          // console.log('BOOOOOOODDDDY',body);
          // console.log('keySss', Object.keys(body));
          // console.log('TORPTRKS',body.toptracks);
          // console.log();
           knex.select('id')
            .from('users')
            .where('email', email)
            .first().then((id) =>
            {
              let toSongs = [];
              for (let i = 0; i < body.toptracks.track.length; i++)
              {
                 toSongs.push({
                  trackName: body.toptracks.track[i].name,
                  albumArt: body.toptracks.track[i].image[1]['#text'],
                  rating: body.toptracks.track[i].playcount,
                  user_id: id.id
                })

              }
              // console.log(toSongs);

              knex('songs').insert(toSongs, '*')
              .then((result)=>console.log(result));
            })
        }
      })
    })
    .then(() =>
    {
      res.sendStatus(200);
    })
    .catch((err) =>
    {
      next(err);
    });
});

module.exports = router;
