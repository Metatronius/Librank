
exports.up = function(knex) {
  return knex.schema.createTable('songs', (table) =>
  {

  });
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE songs CASCADE');
};
