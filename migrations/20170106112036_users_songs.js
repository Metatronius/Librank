exports.up = function(knex)
{
  return knex.schema.createTable('users_songs', (table) =>
  {

  });
};

exports.down = function(knex)
{
  return knex.raw('DROP TABLE users_songs CASCADE');
};
