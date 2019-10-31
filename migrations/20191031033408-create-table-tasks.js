'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('tasks', 
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
          },
          field: 'id_user'
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
      }
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('tasks');
  }
};
