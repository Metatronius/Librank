exports.seed = function(knex, Promise)
{
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function()
    {
      return Promise.all([
        // Inserts seed entries
        // knex('table_name').insert({id: 1, colName: 'rowValue1'}),
        // knex('table_name').insert({id: 2, colName: 'rowValue2'}),
        // knex('table_name').insert({id: 3, colName: 'rowValue3'})
        knex('users').insert(
        {
          email: 'hackme@please.com',
          hashed_password: "ThisIsSecretlyAHashedPassword",
          username: "XxlastFMuserxX",
        }),
      ]);
    });
};
