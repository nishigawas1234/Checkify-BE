// Example: migrations/xxxxxx-add-uuid-index.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addIndex('UserTable', ['uuid']);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeIndex('UserTable', ['uuid']);
  }
};
