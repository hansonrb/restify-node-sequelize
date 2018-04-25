const expect = require('chai').expect;
const hippie = require('hippie');
const restify = require('restify');
const routes = require('../routes');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.pre(restify.plugins.pre.userAgentConnection());

routes(server);

describe('User', function() {
  describe('getall', function() {
    it('returns all users', function(done) {
      hippie(server)
        .json()
        .get('/users')
        .expectStatus(200)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });
    it('returns specific user', function(done) {
      hippie(server)
        .json()
        .get('/users/1')
        .expectStatus(200)
        .expectValue('firstname', 'Test')
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });
    it('returns 404', function(done) {
      hippie(server)
        .json()
        .get('/users/1000')
        .expectStatus(404)
        .end(function(err, res, body) {
          if (err) throw err;
          done();
        });
    });
    it('creates a user', function(done) {
      hippie(server)
        .json()
        .post('/users')
        .send({
          firstname: 'new',
          lastname: 'user',
          email: 'test@gmail.com',
        })
        .expectStatus(200)
        .expectValue('email', 'test@gmail.com')
        .end(function(err, res, body) {
          if (err) throw err;
          done();
          process.exit(0);
        });
    });
  });
});
