"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable("Services", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            imageUrl: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            offeredPrice: {
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                type: Sequelize.INTEGER,
            },
            VendorId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            isActive: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
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
        return queryInterface.dropTable("Services");
    },
};
