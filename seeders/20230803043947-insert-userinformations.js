"use strict";

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        const rawData = JSON.parse(fs.readFileSync('./data/users.json'));
        const seedData = rawData.map((el, index) => {
            const { phoneNumber, address } = el;
            return {
                UserId: index+1,
                phoneNumber, 
                address,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return queryInterface.bulkInsert("UserInformations", seedData, {});
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("UserInformations", null, {});
    },
};
