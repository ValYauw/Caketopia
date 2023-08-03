"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.UserInformation);
            User.hasMany(models.Transaction);
            User.hasMany(models.Service);
        }
    }
    User.init(
        {
            name: {
                type:DataTypes.STRING,
                allowNull:false,
                validates: {
                    notNull: {msg: 'Name is required'},
                    notEmpty: {msg: 'Name is required'}
                }
            },
            email: {
                type:DataTypes.STRING,
                allowNull:false,
                validates: {
                    notNull: {msg: 'Email is required'},
                    notEmpty: {msg: 'Email is required'},
                    isEmail: {msg: 'Email is invalid'}
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validates: {
                    notNull: {msg: 'Email is required'},
                    notEmpty: {msg: 'Email is required'},
                    len: {
                        msg: "Length must be at least 8 characters",
                        args: [8, 50]
                    }
                }
            },
            roles: {
                type: DataTypes.ENUM('Vendor', 'Customer'),
                allowNull: false,
                validates: {
                    notNull: {msg: 'Email is required'},
                    notEmpty: {msg: 'Email is required'}
                }
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
