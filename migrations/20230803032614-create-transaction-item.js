"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable("TransactionItems", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            TransactionId: {
                allowNull: false,
                references: {
                    model: "Transactions",
                    key: "id",
                },
                type: Sequelize.INTEGER,
            },
            ServiceId: {
                allowNull: false,
                references: {
                    model: "Services",
                    key: "id",
                },
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable("TransactionItems");
    },
};
