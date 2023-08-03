"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable("UserInformations", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            UserId: {
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                type: Sequelize.INTEGER,
            },
            phoneNumber: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down(queryInterface, Sequelize) {
        return queryInterface.dropTable("UserInformations");
    },
};
