'use strict';

var express = require('express');
var router = express.Router();
const knex = require('../knex');
const logic = require('../logic/sorting');

router.patch('/song')
{
  
}
router.get('/song/pair', (req, res) =>
{
  knex('songs')
    .where('user_id', 2)
    .then((songs) =>
    {
      let first, second;
      do {
         first = Math.floor(Math.random() * songs.length);
         second = Math.floor(Math.random() * songs.length);
      }
      while (first === second)

      res.send([songs[first], songs[second]]);
    })
});
router.get('/song/rankings', (req, res) =>
{
  knex('songs')
    .where('user_id', 2)
    .then((songs) =>
    {
      res.send(songs);
    })
})
module.exports = router;
