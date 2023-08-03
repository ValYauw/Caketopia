"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Service.belongsTo(models.User);
            Service.hasMany(models.TransactionItem);
        }
    }
    Service.init(
        {
            title: DataTypes.STRING,
            description: DataTypes.TEXT,
            imageUrl: DataTypes.STRING,
            offeredPrice: DataTypes.INTEGER,
            VendorId: DataTypes.INTEGER,
            isActive: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Service",
        }
    );
    return Service;
};
