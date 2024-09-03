"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Character, { through: models.MyCharacter });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `username is required !`,
          },
          notEmpty: {
            msg: `username cannot be empty !`,
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email already exists",
        },
        validate: {
          notNull: {
            msg: `email is required !`,
          },
          notEmpty: {
            msg: `email cannot be empty !`,
          },
          isEmail: {
            args: true,
            msg: "Email format is wrong",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `password is required !`,
          },
          notEmpty: {
            msg: `password cannot be empty !`,
          },
          len: {
            args: [6],
            msg: "Password at least 6 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, options) => {
    if (!options || !options.noHashing) {
      user.password = hashPassword(user.password);
    }
  });
  return User;
};
