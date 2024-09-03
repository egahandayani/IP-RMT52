const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { where } = require("sequelize");
const { User } = require("../models");

module.exports = class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    try {
      const user = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
    } catch (err) {
      console.log(err, "<<< UserController.register");
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "BadRequest", message: "Email is required !" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required !" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw {
          name: "Unauthorized",
          message: "Email or Password is required",
        };
      }

      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw {
          name: "Unauthorized",
          message: "Email or Password is required",
        };
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({
        access_token: access_token,
      });
    } catch (err) {
      console.log(err, "<<< UserController.login");
      next(err);
    }
  }
};
