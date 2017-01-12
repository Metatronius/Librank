exports.up = function(knex)
{
  return knex.schema.createTable('songs', (table) =>
  {
    table.increments();
    table.string('trackName').notNullable();
    table.string('albumArt').notNullable();
    table.integer('rating').notNullable();
    table.integer('user_id').references('users.id');
  });
};

exports.down = function(knex)
{
  return knex.raw('DROP TABLE songs CASCADE');
};
