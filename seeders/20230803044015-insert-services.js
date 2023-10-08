"use strict";

const fs = require('fs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        const rawData = JSON.parse(fs.readFileSync('./data/services.json'));
        const seedData = rawData.map(el => {
            const { title, description, imageUrl, offeredPrice, VendorId, isActive } = el;
            return {
                title, description, imageUrl, offeredPrice, VendorId, isActive,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return queryInterface.bulkInsert("Services", seedData, {});
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Services", null, {});
    },
};
