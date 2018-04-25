const AssetTypes = require('../models/assettype').AssetType;

const AssetTypesController = {
  getAll: (req, res, next) => {
    AssetTypes.findAll({
      attributes: ['name'],
    }).then(response => {
      res.send(response);
      next();
    });
  },
};

module.exports = AssetTypesController;
