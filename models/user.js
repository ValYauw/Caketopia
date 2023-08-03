"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require('../helpers/password');
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
                validate: {
                    notNull: {msg: 'Name is required'},
                    notEmpty: {msg: 'Name is required'}
                }
            },
            email: {
                type:DataTypes.STRING,
                allowNull:false,
                validate: {
                    notNull: {msg: 'Email is required'},
                    notEmpty: {msg: 'Email is required'},
                    isEmail: {msg: 'Email is invalid'}
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: 'Password is required'},
                    notEmpty: {msg: 'Password is required'}
                }
            },
            roles: {
                type: DataTypes.ENUM('Vendor', 'Customer'),
                allowNull: false,
                validate: {
                    notNull: {msg: 'Please select a role'},
                    notEmpty: {msg: 'Please select a role'}
                }
            },
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    User.beforeCreate((user, options) => {
        user.password = hashPassword(user.password);
    })
    return User;
};
