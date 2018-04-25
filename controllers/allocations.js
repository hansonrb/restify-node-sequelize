const Allocation = require('../models').Allocation;
const User = require('../models').User;
const Asset = require('../models').Asset;
const AssetType = require('../models').AssetType;
const AssetAttribute = require('../models').AssetAttribute;

const INCLUDES = [
  {
    model: User,
    attributes: ['id', 'firstname', 'lastname', 'email'],
  },
  {
    model: Asset,
    attributes: ['id', 'name'],
    include: [
      {
        model: AssetType,
        attributes: ['id', 'name'],
      },
      {
        model: AssetAttribute,
        attributes: ['id', 'name', 'value'],
      },
    ],
  },
];

const AllocationsController = {
  getAll: (req, res, next) => {
    Allocation.findAll({
      attributes: ['id', 'endAt', 'createdAt', 'updatedAt'],
      include: INCLUDES,
    }).then(response => {
      res.send(response);
      next();
    });
  },
  create: (req, res, next) => {
    if (!req.body || !req.body.userId || !req.body.assetId) {
      res.send(400);
      next();
      return;
    }

    Allocation.count({
      where: {
        userId: req.body.userId,
        assetId: req.body.assetId,
        endAt: {
          $gt: new Date(),
        },
        createdAt: {
          $lte: new Date(),
        },
      },
    }).then(count => {
      if (count > 0) {
        res.send(409);
        next();
      } else {
        Allocation.create(req.body).then(newone => {
          res.send(newone || 400);
          next();
        });
      }
    });
  },
  get: (req, res, next) => {
    Allocation.findById(req.params.id, {
      attributes: ['id', 'endAt', 'createdAt', 'updatedAt'],
      include: INCLUDES,
    }).then(response => {
      res.send(response || 404);
      next();
    });
  },
  getAllByUser: (req, res, next) => {
    Allocation.findAll({
      attributes: ['id', 'endAt', 'createdAt', 'updatedAt'],
      include: INCLUDES,
      where: { userId: req.params.id },
    }).then(response => {
      res.send(response);
      next();
    });
  },
  getAllByAsset: (req, res, next) => {
    Allocation.findAll({
      attributes: ['id', 'endAt', 'createdAt', 'updatedAt'],
      include: INCLUDES,
      where: { assetId: req.params.id },
    }).then(response => {
      res.send(response);
      next();
    });
  },
  getCurrent: (req, res, next) => {
    Allocation.findAll({
      attributes: ['id', 'endAt', 'createdAt', 'updatedAt'],
      include: INCLUDES,
      where: {
        endAt: {
          $gt: new Date(),
        },
        createdAt: {
          $lte: new Date(),
        },
      },
    }).then(response => {
      res.send(response);
      next();
    });
  },
  delete: (req, res, next) => {
    Allocation.destroy({ where: { id: req.params.id } }).then(response => {
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

    Allocation.count({
      where: {
        userId: req.body.userId,
        assetId: req.body.assetId,
        endAt: {
          $gt: new Date(),
        },
        createdAt: {
          $lte: new Date(),
        },
      },
    }).then(count => {
      if (count > 0) {
        res.send(409);
        next();
      } else {
        Allocation.update(req.body, { where: { id: req.params.id } }).then(
          response => {
            res.send(response > 0 ? 200 : 404);
            next();
          },
        );
      }
    });
  },
};

module.exports = AllocationsController;
