
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) =>
  {

  });
};

exports.down = function(knex) {
  return knex.raw('DROP TABLE users CASCADE');
};
