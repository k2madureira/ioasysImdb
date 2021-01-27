'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('users', [
        {
          id:'f8c6768e-cb03-43f3-91e9-dde2b336d6e6',
          name: 'admin',
          nickname: 'admin',
          email: 'adm@adm.com',
          password_hash: '$2a$08$HBRNR98RGg8SRFZOVNSEWu1WOTTcNjYQyDEvkz/JN7zSef6Fiqqei',
          admin: true,
          disabled: false,
          created_at: '2021-01-22 16:29:15',
          updated_at: '2021-01-22 16:29:15',
        },
        {
          id: '0471477d-a14d-4e65-9f7e-5ec53fa98a30',
          name: 'user',
          nickname: 'user',
          email: 'user@user.com',
          password_hash: '$2a$08$HBRNR98RGg8SRFZOVNSEWu1WOTTcNjYQyDEvkz/JN7zSef6Fiqqei',
          admin: false,
          disabled: false,
          created_at: '2021-01-22 16:29:15',
          updated_at: '2021-01-22 16:29:15',
        }
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('users', {id: {[Op.in]: ['f8c6768e-cb03-43f3-91e9-dde2b336d6e6', '0471477d-a14d-4e65-9f7e-5ec53fa98a30']}}, {});
     
  }
};
