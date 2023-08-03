"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class UserInformation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserInformation.belongsTo(models.User);
        }
    }
    UserInformation.init(
        {
            UserId: {
                type: DataTypes.INTEGER,
                allowNull:false,
                validates: {
                    notNull: {msg: 'User ID is required'},
                    notEmpty: {msg: 'User ID is required'}
                }
            },
            phoneNumber: {
                type: DataTypes.INTEGER,
                allowNull:false,
                validates: {
                    notNull: {msg: 'Phone number is required'},
                    notEmpty: {msg: 'Phone number is required'},
                    isNumeric: {msg: 'Phone number must be numeric'}
                }
            },
            address: {
                type: DataTypes.INTEGER,
                allowNull:false,
                validates: {
                    notNull: {msg: 'Address is required'},
                    notEmpty: {msg: 'Address is required'}
                }
            },
        },
        {
            sequelize,
            modelName: "UserInformation",
        }
    );
    return UserInformation;
};
