const axios = require("axios");
const { MyCharacter } = require("../models");
const mycharacter = require("../models/mycharacter");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
module.exports = class CharacterController {
  static async getCharacters(req, res, next) {
    try {
      const apiUrl = "https://api.disneyapi.dev/character";
      const response = await axios.get(apiUrl);
      const characters = response.data.data;

      const result = characters.map((character) => {
        return {
          id: character._id,
          films: character.films.length > 0 ? character.films : null,
          shortFilms:
            character.shortFilms.length > 0 ? character.shortFilms : null,
          tvShows: character.tvShows.length > 0 ? character.tvShows : null,
          videoGames:
            character.videoGames.length > 0 ? character.videoGames : null,
          parkAttractions:
            character.parkAttractions.length > 0
              ? character.parkAttractions
              : null,
          allies: character.allies.length > 0 ? character.allies : null,
          enemies: character.enemies.length > 0 ? character.enemies : null,
          sourceUrl: character.sourceUrl,
          name: character.name,
          imageUrl: character.imageUrl,
          createdAt: character.createdAt,
          updatedAt: character.updatedAt,
          url: character.url,
          version: character.__v,
        };
      });

      res.status(200).json(result);
    } catch (err) {
      console.log("🚀 ~ CharacterController ~ getCharacters ~ err:", err);
      next(err);
    }
  }

  static async getOneCharacterById(req, res, next) {
    const { _id } = req.params;
    try {
      const apiUrl = `https://api.disneyapi.dev/character/${_id}`;
      const response = await axios.get(apiUrl);
      const character = response.data.data[0];

      const result = {
        id: character._id,
        films: character.films.length > 0 ? character.films : null,
        shortFilms:
          character.shortFilms.length > 0 ? character.shortFilms : null,
        tvShows: character.tvShows.length > 0 ? character.tvShows : null,
        videoGames:
          character.videoGames.length > 0 ? character.videoGames : null,
        parkAttractions:
          character.parkAttractions.length > 0
            ? character.parkAttractions
            : null,
        allies: character.allies.length > 0 ? character.allies : null,
        enemies: character.enemies.length > 0 ? character.enemies : null,
        sourceUrl: character.sourceUrl,
        name: character.name,
        imageUrl: character.imageUrl,
        createdAt: character.createdAt,
        updatedAt: character.updatedAt,
        url: character.url,
        version: character.__v,
      };

      res.status(200).json(result);
    } catch (err) {
      console.log("🚀 ~ CharacterController ~ getOneCharacterById ~ err:", err);
      next(err);
    }
  }

  static async addMyCharacter(req, res, next) {
    try {
      const response = await axios.get(
        `https://api.disneyapi.dev/character/${req.params.CharacterId}`
      );
      const character = response.data.data;
      const myCharacter = await MyCharacter.create({
        UserId: req.user.id,
        CharacterId: req.params.CharacterId,
        imageUrl: character.imageUrl || null,
      });
      res.status(200).json(myCharacter);
    } catch (err) {
      console.log("🚀 ~ CharacterController ~ addMyCharacter ~ err:", err);
      next(err);
    }
  }

  static async getMyCharacter(req, res, next) {
    try {
      const myCharacters = await MyCharacter.findAll();
      const myCharacterDetails = [];

      for (let i = 0; i < myCharacters.length; i++) {
        const myCharacter = myCharacters[i];
        const apiUrl = `https://api.disneyapi.dev/character/${myCharacter.CharacterId}`;
        const response = await axios.get(apiUrl);
        const character = response.data.data[0];

        const result = {
          id: character._id,
          films: character.films.length > 0 ? character.films : null,
          shortFilms:
            character.shortFilms.length > 0 ? character.shortFilms : null,
          tvShows: character.tvShows.length > 0 ? character.tvShows : null,
          videoGames:
            character.videoGames.length > 0 ? character.videoGames : null,
          parkAttractions:
            character.parkAttractions.length > 0
              ? character.parkAttractions
              : null,
          allies: character.allies.length > 0 ? character.allies : null,
          enemies: character.enemies.length > 0 ? character.enemies : null,
          sourceUrl: character.sourceUrl,
          name: character.name,
          imageUrl: character.imageUrl,
          createdAt: character.createdAt,
          updatedAt: character.updatedAt,
          url: character.url,
          version: character.__v,
        };

        myCharacterDetails.push(result);
      }

      res.status(200).json(favoriteDetails);
    } catch (err) {
      console.log("🚀 ~ CharacterController ~ getMyCharacter ~ err:", err);
      next(err);
    }
  }

  static async updateMyCharacter(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.user.id;

      const myCharacter = await MyCharacter.findOne({
        where: { UserId: userId, id: id },
      });

      if (!myCharacter) {
        throw {
          name: "NotFound",
          message: `MyCharacter with ID: ${id} not found`,
        };
      }

      if (!req.file) {
        throw {
          name: "BadRequest",
          message: "No image file uploaded",
        };
      }

      const mimeType = req.file.mimetype;
      const base64Image = req.file.buffer.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${base64Image}`,
        {
          folder: "disney_characters",
          public_id: req.file.originalname,
        }
      );

      await myCharacter.update({ imageUrl: result.secure_url });

      res.json({ message: "Character image has been updated" });
    } catch (err) {
      console.log("🚀 ~ CharacterController ~ updateMyCharacter ~ err:", err);
      next(err);
    }
  }

  static async deleteMyCharacter(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const myCharacter = await MyCharacter.findOne({
        where: { id: id, UserId: userId },
      });

      if (!myCharacter) {
        return res
          .status(404)
          .json({ message: "Character not found in myCharacters." });
      }

      await myCharacter.destroy();
      res.status(200).json({
        message: "Character successfully removed from myCharacters.",
      });
    } catch (err) {
      console.log("🚀 ~ CharacterController ~ deleteMyCharacter ~ err:", err);
      next(err);
    }
  }
};
