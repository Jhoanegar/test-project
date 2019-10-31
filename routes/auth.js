'use strict';
const SOURCE = 'kavak-task-list:routes:auth';
const debug = require('debug')(SOURCE);
/* App */
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const AuthController = require('../controllers/AuthController');
const {check} = require('express-validator');
const validatePreconditions = require('../middleware/validatePreconditions');
const routes = {
  '/login': {
    POST: {
      middleware: [
        check('email').isEmail(),
        check('password').isLength({min: 8}),
        validatePreconditions,
        AuthController.login
      ]
    }
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