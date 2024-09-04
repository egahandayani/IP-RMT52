import axios from "axios";
const { MyCharacter } = require("../models");
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
    const { id } = req.params;
    try {
      const apiUrl = `https://api.disneyapi.dev/character/${id}`;
      const response = await axios.get(apiUrl);
      const character = response.data.data[0];

      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

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
    const { UserId, CharacterId } = req.body;
    try {
      const newMyCharacter = await MyCharacter.create({ UserId, CharacterId });

      const apiUrl = `https://api.disneyapi.dev/character/${CharacterId}`;
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

      res.status(201).json({
        message: "MyCharacter added successfully",
        myCharacter: result,
      });
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
    const { id } = req.params;
    const { imageUrl } = req.body;
    const UserId = req.user.id;

    try {
      const character = await MyCharacter.findOne();

      if (!character) {
        return res.status(404).json({ message: "Character not found" });
      }

      let finalImageUrl = imageUrl;
      if (!finalImageUrl) {
        const response = await axios.get(
          `https://api.disneyapi.dev/character/${id}`
        );
        finalImageUrl = response.data.data[0].imageUrl || character.imageUrl;
      } else {
        
      }
    } catch (err) {
      console.log("🚀 ~ CharacterController ~ updateMyCharacter ~ err:", err);
      next(err);
    }
  }
};
