"use strict";
const bcrypt = require('bcrypt');
const debug = require('debug')('kavak-task-list:models:public:User')
const {Sequelize, sequelize} = require('../../config/models');
const jsonwebtoken = require('jsonwebtoken');
const Model = Sequelize.Model;
class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(254),
      unique: true
    },
    password: {
      type: Sequelize.STRING(80),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
    underscored: true
  }
);

User.login = async params => {
  let isValidPassword;
  let user = await User.findOne({
    where: {
      email: params.email
    }
  })
  debug("User found? ", !!user)

  if (user) {
    isValidPassword = await user.isValidPassword(params.password);
  }

  debug('isValidPassword: ', isValidPassword)

  if (isValidPassword === true) {
    return user;
  }
}

User.prototype.token = function()  {
  let payload = {
    id: this.id,
    email: this.email
  };
  debug("payload to sign: ", payload);
  return jsonwebtoken.sign(payload, process.env["TOKEN_SECRET"], { expiresIn: '1h' })
}

User.prototype.toJSON = function() {
  return {
    email: this.email,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}


User.prototype.isValidPassword = function(password) {
  var instance = this;
  debug(`Checking ${password} vs ${instance.password}`)
  return new Promise(function(resolve,reject) {
    bcrypt.compare(password, instance.password, function(err, match) {
      if (err) {
        return reject(err);
      }
      debug("Match? ", match);

      if (!match) {
        return resolve(false);
      }

      return resolve(true);
    })
  });
}

module.exports = User;


