const Asset = require('../models').Asset;
const AssetType = require('../models').AssetType;
const AssetAttribute = require('../models').AssetAttribute;

const AssetsController = {
  getAll: (req, res, next) => {
    {
      Asset.findAll({
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

    Asset.create(req.body, {
      include: AssetAttribute,
    }).then(newone => {
      if (newone) {
        res.send(newone);
      } else {
        res.send(400);
      }
      next();
    });
  },
  get: (req, res, next) => {
    Asset.findById(req.params.id, {
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
    }).then(response => {
      res.send(response || 404);
      next();
    });
  },
  delete: (req, res, next) => {
    Asset.findById(req.params.id, {
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
    }).then(response => {
      if (!response) {
        res.send(404);
        next();
        return;
      }
      // asset attributes are deleted by cascading
      response.destroy().then(dres => {
        res.send(200);
        next();
      });
    });
  },
  update: (req, res, next) => {
    if (!req.body) {
      res.send(400);
      next();
      return;
    }

    // AssetAttributes are being recreated whenever update is taking place
    // TODO: need this to be updated, by using MongoDB or similar
    AssetAttribute.destroy({ where: { assetId: req.params.id } }).then(dres => {
      Asset.findById(req.params.id, {
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
      }).then(response => {
        if (response) {
          response.updateAttributes(req.body).then(ures => {
            AssetAttribute.bulkCreate(
              req.body.AssetAttributes.map(aa => ({ assetId: ures.id, ...aa })),
            ).then(cres => {
              res.send(ures);
              next();
            });
          });
        } else {
          res.send(404);
          next();
        }
      });
    });
  },
};

module.exports = AssetsController;
