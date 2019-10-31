'use strict';

var debug = require('debug')('kavak-task-list:config:models');
var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

debug("Initializing sequelize...");
var models = module.exports = {
  Sequelize: require('sequelize'),
  sequelize: null
};

if (config.use_env_variable) {
  debug("Using env var: ", config.use_env_variable, process.env[config.use_env_variable]);
  models.sequelize = new models.Sequelize(process.env[config.use_env_variable], config);
} else {
  debug("Using json input...");
  models.sequelize = new models.Sequelize(config.database, config.username, config.password, config);
}

debug("Sequelize loaded!");