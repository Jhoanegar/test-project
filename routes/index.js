'use strict';

const path = require('path');
const debug = require('debug')('kavak-task-list:routes:index');
const basename = path.basename(module.filename);
const express = require('express');
const router = express.Router();
const fs = require('fs');
function loadRoutes(location) {
  debug("Looking for routes on: %s ...", location);
  fs
    .readdirSync(location)
    .filter(function(file) {
      return file !== basename;
    })
    .forEach(function(file) {
      if (file.slice(-3) !== '.js' && file.indexOf('.') >= 0) return;
      let name;
      let pathRouter;
      let fileRouter;

      if (file.slice(-3) === '.js') {
        name = file.substring(0, file.indexOf("."));
        pathRouter = path.join(location,name);
        debug("Loading js: ", name)
        fileRouter = require(pathRouter);
        router.use("/" + name, fileRouter);
      }
      else {
        name = file;
        pathRouter = path.join(location,name);
        debug("Importing folder: ", name)
        fileRouter = require(pathRouter);
        router.use("/" + name, fileRouter);

      }
    });
}

loadRoutes(__dirname);

module.exports = router;
