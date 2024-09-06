"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const users = [
      {
        email: "staff1@gmail.com",
        password: hashPassword("staff1"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "staff2@gmail.com",
        password: hashPassword("staff2"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
