"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable("Transactions", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('Pending confirmation', 'Payment pending', 'Preparing'),
            },
            dateOrdered: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            dateDelivered: {
                type: Sequelize.DATE,
            },
            CustomerId: {
                allowNull: false,
                references: {
                    model: "Users",
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
        return queryInterface.dropTable("Transactions");
    },
};
