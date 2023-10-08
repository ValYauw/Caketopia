"use strict";

const fs = require('fs');
const { hashPassword } = require('../helpers/password');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        const rawData = JSON.parse(fs.readFileSync('./data/users.json'));
        const seedData = rawData.map(el => {
            const { name, email, password, role } = el;
            return {
                name, 
                email, 
                password: hashPassword(password), 
                role,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return queryInterface.bulkInsert("Users", seedData, {});
    },

    down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("Users", null, {});
    },
};
