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
            status: DataTypes.STRING,
            dateOrdered: DataTypes.DATE,
            CustomerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Transaction",
        }
    );
    return Transaction;
};
