const User = require('../models').User;

const UsersController = {
  getAll: (req, res, next) => {
    {
      User.findAll({
        attributes: ['id', 'firstname', 'lastname', 'email'],
      }).then(response => {
        res.send(response);
        next();
      });
    }
  },
  create: (req, res, next) => {
    if (!req.body) {
      res.send(400);
      next();
      return;
    }
    User.create(req.body).then(newone => {
      res.send(newone || 400);
      next();
    });
  },
  get: (req, res, next) => {
    User.findById(req.params.id).then(response => {
      res.send(response || 404);
      next();
    });
  },
  delete: (req, res, next) => {
    User.destroy({ where: { id: req.params.id } }).then(response => {
      res.send(response > 0 ? 200 : 400);
      next();
    });
  },
  update: (req, res, next) => {
    if (!req.body) {
      res.send(400);
      next();
      return;
    }

    User.update(req.body, { where: { id: req.params.id } }).then(response => {
      res.send(response > 0 ? 200 : 404);
      next();
    });
  },
};

module.exports = UsersController;
