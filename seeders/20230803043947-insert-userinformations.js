"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const data = [
            {
                UserId: 1,
                phoneNumber: "659-286-8441",
                address: "20538 Claremont Point",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 2,
                phoneNumber: "619-669-5374",
                address: "57570 Russell Place",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 3,
                phoneNumber: "495-311-9803",
                address: "854 Prentice Court",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 4,
                phoneNumber: "796-616-8908",
                address: "32 Riverside Park",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 5,
                phoneNumber: "519-473-8553",
                address: "35831 Crownhardt Way",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 6,
                phoneNumber: "891-464-5609",
                address: "0 La Follette Center",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 7,
                phoneNumber: "931-711-1280",
                address: "545 Farmco Center",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 8,
                phoneNumber: "595-815-9603",
                address: "721 Gulseth Trail",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 9,
                phoneNumber: "742-777-7068",
                address: "3019 Walton Circle",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                UserId: 10,
                phoneNumber: "815-620-4595",
                address: "7648 Nancy Way",
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        return queryInterface.bulkInsert("UserInformations", data, {});
    },

    down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete("UserInformations", null, {});
    },
};
