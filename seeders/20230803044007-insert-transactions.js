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
                status: "pending confirmation",
                dateOrdered: new Date("2023-07-10"),
                CustomerId: 6,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status: "pending confirmation",
                dateOrdered: new Date("2023-07-11"),
                CustomerId: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status: "pending confirmation",
                dateOrdered: new Date("2023-07-12"),
                CustomerId: 8,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status: "pending confirmation",
                dateOrdered: new Date("2023-07-13"),
                CustomerId: 9,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                status: "pending confirmation",
                dateOrdered: new Date("2023-07-14"),
                CustomerId: 10,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        return queryInterface.bulkInsert("Transactions", data, {});
    },

    down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete("Transactions", null, {});
    },
};
