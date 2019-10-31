'use strict';
const SOURCE = 'kavak-task-list:routes:users';
const debug = require('debug')(SOURCE);
/* App */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const authorization = require('../middleware/authorization');
const TasksController = require('../controllers/TasksController');
const {check} = require('express-validator');
const filter = require('../middleware/filter');

const routes = {
  '/': {
    GET: {
      middleware: [
        authorization.verifyToken,
        filter.filterParams,
        TasksController.index
      ]
    },
    POST: {
      middleware: [
        authorization.verifyToken,
        check('name').isLength({min: 1}),
        check('order').isInt({min: 0}),
        check('expiresAt').isISO8601(),
        TasksController.create
      ]
    }
  },
  '/:idTask(\\d+)': {
    GET: {
      middleware: [
        authorization.verifyToken,
        TasksController.find
      ]
    },
    PATCH: {
      middleware: [
        authorization.verifyToken,
        check('name').isLength({min: 1}).optional(),
        check('order').isInt({min: 0}).optional(),
        check('expiresAt').isISO8601().optional(),
        TasksController.update
      ]
    },
    DELETE: {
      middleware: [
        authorization.verifyToken,
        TasksController.delete
      ]
    },
  }

};

_.forOwn(routes, function (methods, endpoint) {
  _.forOwn(methods, function (details, method) {
    method = method.toLowerCase();
    if (typeof router[method] === 'function') {
      debug('Loading endpoint %s#%s', endpoint, method);
      router[method](endpoint, details.middleware);
    }
  });
});

module.exports = router;