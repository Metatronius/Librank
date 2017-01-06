process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

beforeEach(done =>
{
});

describe('GET /library', () =>
{
  it('responds with JSON', done =>
  {
    request(app)
      .get('/library')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('GET /library/:id', () =>
{
  it('responds with JSON', done =>
  {
    request(app)
      .get('/library/1')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
