'use strict';

var express = require('express');
var router = express.Router();
const knex = require('../knex');

router.put('/song', (req, res, next) =>
  {
    console.log(req.body);
    if (req.body.winner === 'left')
    {
      console.log(+req.body.id1);
      knex('songs')
        .where('id', '=', +req.body.id1)
        .increment('rating', 25)
        .then(()=>console.log(req.body));
      knex('songs')
        .where('id', '=', +req.body.id2)
        .decrement('rating',  25)
        .then(()=>console.log(req.body));
    }
    else if(req.body.winner === 'right')
    {
      console.log(+req.body.id2);
      knex('songs')
        .where('id', '=', +req.body.id2)
        .increment('rating', 25)
        .then(()=>console.log(req.body));
      knex('songs')
        .where('id', '=', +req.body.id1)
        .decrement('rating',  25)
        .then(()=>console.log(req.body));
    }
    res.send(req.body);
  });
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
