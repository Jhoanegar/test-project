const debug = require('debug')('kavak-task-list:controllers:AuthController');
const User = require('../models/public/User');
const errors = require('../middleware/errors');
module.exports = {
  async login(req, res) {
    try {
      let user = await User.login(req.body);
      if (!user) {
        return res.status(401).json({
          message: 'Invalid Credentials'
        })
      }
      let token = await user.token();
      return res.json({
        user,
        token
      })
    } catch(err) {
      return errors.serverError(req, res, err);
    }
  }
}