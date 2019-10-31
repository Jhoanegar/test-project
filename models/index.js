"use strict";

var fs = require('fs');
var path = require('path');
var basename = path.basename(module.filename);
var modelsConfig = module.exports = require(__dirname + '/../config/models');
var debug = require('debug')('kavak-task-list:models');
let models = {};

function loadModels(location, namespace) {
  debug("Loading models in: ", location);
  fs
    .readdirSync(location)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(function (file) {
      debug("Importing file: ", file);
      var model = modelsConfig.sequelize['import'](path.join(location, file));
      models[model.name] = model;
      debug(`Model found: ${model.name}`);
    });
}

function associateModels(models) {
  Object.keys(models).forEach(function (modelName) {
    debug("Associating ", modelName);
    if (models[modelName].associate) {
      models[modelName].associate(models);
    }
  });
}

debug("Load models");
loadModels(__dirname + '/public');
associateModels(models);



module.exports = models;