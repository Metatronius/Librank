const exports = module.exports();

exports.fight = function(song1, song2, currentUser)
{
  let song1Filter = {
    user_id: currentUser,
    trackName: song1,
  }
  let song2Filter = {
    user_id: currentUser,
    trackName: song1
  }
  let songObjs = [
  {
    name: song1,
    rating: knex.select('rating').from('songs')
      .where(song1Filter),
    albumArt: knex.select('albumArt').from('songs').where(song1Filter),
  },
  {
    name: song2,
    rating: knex.select('rating').from('songs').where(song2Filter),
    knex.select('albumArt').from('songs').where(song2Filter),
  }, ]
  return songObjs;
};
exports.updateScore = function(songObjs, winner)
  //0 is song1, 1 is song2
  {
    if (winner)
    {
      songObjs[1].rating += 25;
      songObjs[0].rating -= 25;
    }
    else
    {
      songObjs[1].rating -= 25;
      songObjs[0].rating += 25;
    }
    knex('songs')
      .where('name', songObjs[0].name)
      .update(songObjs[0]);
    knex('songs')
      .where('name', songObjs[1].name)
      .update(songObjs[1]);
    return songObjs[winner];
  }
