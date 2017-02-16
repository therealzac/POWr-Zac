'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'Posts',
      'user_name',
      Sequelize.TEXT
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn(
      'Posts',
      'user_name',
      Sequelize.TEXT
    )
  }
};
