exports.seed = function(knex, Promise)
{
  // Deletes ALL existing entries
  return knex('songs').del()
    .then(function()
    {
      return Promise.all([
        // // Inserts seed entries
        // knex('table_name').insert({id: 1, colName: 'rowValue1'}),
        // knex('table_name').insert({id: 2, colName: 'rowValue2'}),
        // knex('table_name').insert({id: 3, colName: 'rowValue3'})
        knex('songs').insert(
        {
          trackName: "Happy Birthday",
          albumArt: "imageurl.com",
          rating: 0,
          user_id: 1,
        }),
        knex('songs').insert(
        {
          trackName: "Rock Music",
          albumArt: "imageurl.com",
          rating: 0,
          user_id: 1,
        }),
        knex('songs').insert(
        {
          trackName: "Extreme Polka",
          albumArt: "imageurl.com",
          rating: 0,
          user_id: 1,
        }),
      ]);
    });
};
