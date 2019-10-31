'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('users', 
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
      return queryInterface.dropTable('users');
  }
};
