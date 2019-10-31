'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          email: 'jhoanegar@gmail.com',
          password: '$2b$10$ckJfuzhV16lo2nXEpqELNOwHTfWGRG3RTbDtYJpX/9zz4RDBW3qja'
        },
        {
          email: 'test@email.com',
          password: '$2b$10$ckJfuzhV16lo2nXEpqELNOwHTfWGRG3RTbDtYJpX/9zz4RDBW3qja'
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
