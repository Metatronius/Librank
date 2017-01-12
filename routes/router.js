'use strict';

var express = require('express');
var router = express.Router();
const knex = require('../knex')


router.get('/song/pair', (req, res) =>
{
  knex('songs')
    .where('user_id', 1)
    .then((songs) =>
    {
      // Math.floor(Math.random()*songs.length())
      res.send([songs[0], songs[1]])
    })
});
module.exports=router;
