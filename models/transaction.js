"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transaction.belongsTo(models.User);
            Transaction.hasMany(models.TransactionItem);
        }
    }
    Transaction.init(
        {
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validates: {
                    notNull: { msg: "Status is required" },
                    notEmpty: { msg: "Status is required" },
                },
            },
            dateOrdered: {
                type: DataTypes.DATE,
                allowNull: false,
                validates: {
                    notNull: { msg: "DateOrdered is required" },
                    notEmpty: { msg: "DateOrdered is required" },
                },
            },
            dateDelievered: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            CustomerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validates: {
                    notNull: { msg: "CustomerId is required" },
                    notEmpty: { msg: "CustomerId is required" },
                },
            },
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    );
    return Transaction;
};
