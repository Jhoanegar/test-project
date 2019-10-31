"use strict";
const debug = require('debug')('kavak-task-list:models:public:Task')
const {Sequelize, sequelize} = require('../../config/models');
const Model = Sequelize.Model;
class Task extends Model {}

Task.init(
{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idUser: {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  name: {
    type: Sequelize.STRING(254),
    allowNull: false
  },
  order: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  expiresAt: {
    type: Sequelize.DATE,
    allowNull: false,
    field: 'expires_at'
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now'),
    allowNull: false
  },
  deletedAt: {
    field: 'deleted_at',
    type: Sequelize.DATE
  }
},
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    paranoid: true,
    underscored: true
  }
);

Task.prototype.toJSON = function() {
  return {
    id: this.id,
    name: this.name,
    order: this.order,
    expiresAt: this.expiresAt
  }
}

module.exports = Task;


