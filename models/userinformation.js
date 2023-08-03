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
            UserId: DataTypes.INTEGER,
            phoneNumber: DataTypes.STRING,
            address: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "UserInformation",
        }
    );
    return UserInformation;
};
