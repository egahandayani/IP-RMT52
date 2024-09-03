"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsToMany(models.User, { through: models.MyCharacter });
    }
  }
  Character.init(
    {
      url: DataTypes.STRING,
      name: DataTypes.STRING,
      sourceUrl: DataTypes.STRING,
      films: DataTypes.STRING,
      shortFilms: DataTypes.STRING,
      tvShows: DataTypes.STRING,
      videoGames: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      parkAttractions: DataTypes.STRING,
      allies: DataTypes.STRING,
      enemies: DataTypes.STRING,
      __v: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Character",
    }
  );
  return Character;
};
