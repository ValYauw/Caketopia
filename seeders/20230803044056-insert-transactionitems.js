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
                TransactionId: 1,
                ServiceId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                TransactionId: 2,
                ServiceId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                TransactionId: 3,
                ServiceId: 9,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                TransactionId: 4,
                ServiceId: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                TransactionId: 5,
                ServiceId: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        return queryInterface.bulkInsert("TransactionItems", data, {});
    },

    down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete("TransactionItems", null, {});
    },
};
