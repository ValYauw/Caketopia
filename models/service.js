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
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validates: {
                    notNull: { msg: "Title is required" },
                    notEmpty: { msg: "Title is required" },
                },
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validates: {
                    notNull: { msg: "Description is required" },
                    notEmpty: { msg: "Description is required" },
                },
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
                validates: {
                    notNull: { msg: "ImageUrl is required" },
                    notEmpty: { msg: "ImageUrl is required" },
                },
            },
            offeredPrice: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validates: {
                    notNull: { msg: "OfferedPrice is required" },
                    notEmpty: { msg: "OfferedPrice is required" },
                },
            },
            VendorId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validates: {
                    notNull: { msg: "VendorId is required" },
                    notEmpty: { msg: "VendorId is required" },
                },
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                validates: {
                    notNull: { msg: "IsActive is required" },
                    notEmpty: { msg: "IsActive is required" },
                },
            },
        },
        {
            sequelize,
            modelName: "Service",
        }
    );
    return Service;
};
