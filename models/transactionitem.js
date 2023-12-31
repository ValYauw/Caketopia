"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TransactionItem.belongsTo(models.Transaction);
      TransactionItem.belongsTo(models.Service);
    }
  }
  TransactionItem.init(
    {
      TransactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validates: {
          notNull: { msg: "TransactionId is required" },
          notEmpty: { msg: "TransactionId is required" },
        },
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validates: {
          notNull: { msg: "ServiceId is required" },
          notEmpty: { msg: "ServiceId is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionItem",
    }
  );
  return TransactionItem;
};
