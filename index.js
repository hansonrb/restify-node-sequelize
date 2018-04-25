var restify = require('restify');
var routes = require('./routes');
const App = require('./models').App;

var server = restify.createServer();

server.use(restify.plugins.bodyParser());
server.pre(restify.plugins.dedupeSlashes());
server.pre(restify.plugins.pre.userAgentConnection());
server.pre((req, res, next) => {
  App.findOne({ where: { token: req.headers.token } }).then(app => {
    if (!app) {
      res.send(401);
      return null;
    }
    return next();
  });
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

routes(server);
