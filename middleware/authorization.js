const debug = require('debug')('kavak-task-list:middleware:authorization');
const jsonwebtoken = require('jsonwebtoken');
const errors = require('./errors');
module.exports = {
  verifyToken(req, res, next) {
    let auth = req.headers['authorization'];
    let token;
    if (auth) {
      token = auth.split(' ')[1]
    } 
    if (!token) {
      return errors.authError(req, res);
    }

    try {
      let result = jsonwebtoken.verify(token, process.env['TOKEN_SECRET'])
      debug("Result verify: ", result);
      req.user = result;
      next();
    } catch(err) {
      errors.authError(req, res);
    }
    
  }
}