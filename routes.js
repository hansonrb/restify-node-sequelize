const UsersController = require('./controllers/users');
const AssetTypesController = require('./controllers/asset-types');
const AssetsController = require('./controllers/assets');
const AllocationsController = require('./controllers/allocations');
var fs = require('fs');

function routes(server) {
  server.get('/users', UsersController.getAll);
  server.post('/users', UsersController.create);
  server.get('/users/:id', UsersController.get);
  server.patch('/users/:id', UsersController.update);
  server.put('/users/:id', UsersController.update);
  server.del('/users/:id', UsersController.delete);

  server.get('/asset-types', AssetTypesController.getAll);

  server.get('/assets', AssetsController.getAll);
  server.post('/assets', AssetsController.create);
  server.get('/assets/:id', AssetsController.get);
  server.patch('/assets/:id', AssetsController.update);
  server.put('/assets/:id', AssetsController.update);
  server.del('/assets/:id', AssetsController.delete);

  server.get('/allocs', AllocationsController.getAll);
  server.get('/allocs/user/:id', AllocationsController.getAllByUser);
  server.get('/allocs/asset/:id', AllocationsController.getAllByAsset);
  server.get('/allocs/current', AllocationsController.getCurrent);
  server.get('/allocs/:id', AllocationsController.get);
  server.post('/allocs', AllocationsController.create);
  server.patch('/allocs/:id', AllocationsController.update);
  server.put('/allocs/:id', AllocationsController.update);
  server.del('/allocs/:id', AllocationsController.delete);
}

module.exports = routes;
