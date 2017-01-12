'use strict';

var express = require('express');
var router = express.Router();

router.get('/song/pair', (req, res) =>
    {
      knex('songs')
        .where('user_id', currentUser)
        .then((songs) =>
        {
          // Math.floor(Math.random()*songs.length())
          res.send([songs[0], songs[1]])
        })
    }
    _
