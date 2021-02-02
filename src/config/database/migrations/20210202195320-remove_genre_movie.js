module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('movies', 'genre');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('movies', 'genre', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },
};
