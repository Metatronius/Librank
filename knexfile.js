// Update with your config settings.

module.exports = {

  development:
  {
    client: 'pg',
    connection: 'postgres://localhost/librank_dev',
  },

  test:
  {
    client: 'pg',
    connection: 'postgres://localhost/librank_test',
  },


  production:
  {

  }

};
