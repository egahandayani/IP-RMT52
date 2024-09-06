const request = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");
const { User, MyCharacter } = require("../models");
const jwt = require("jsonwebtoken");

let token;

const userData = {
  username: "userTest",
  email: "userTest@gmail.com",
  password: "123456",
};

const characterId = "1";
const mockCharacter = {
  _id: "1",
  name: "Mickey Mouse",
  films: ["Steamboat Willie"],
  shortFilms: [],
  tvShows: [],
  videoGames: [],
  parkAttractions: [],
  allies: [],
  enemies: [],
  sourceUrl: "https://disneyapi.dev/character/1",
  imageUrl: "https://example.com/image.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
  url: "https://example.com",
  __v: 0,
};

beforeAll(async () => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = await User.create({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
  });

  token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  await MyCharacter.create({
    UserId: user.id,
    CharacterId: characterId,
    imageUrl: mockCharacter.imageUrl,
  });
});

afterAll(async () => {
  await MyCharacter.destroy({ where: {} });
  await User.destroy({ where: {} });
});

describe("GET /characters", () => {
  test("Berhasil mendapatkan list characters", async () => {
    const response = await request(app)
      .get("/characters")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty("data");
  });
});

describe("GET /characters/:id", () => {
  test("Berhasil mendapatkan character berdasarkan ID", async () => {
    const response = await request(app)
      .get(`/characters/${characterId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("id", characterId);
  });
});

describe("POST /characters/:CharacterId", () => {
  test("Berhasil menambahkan character ke MyCharacter", async () => {
    const response = await request(app)
      .post(`/characters/${characterId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty("UserId");
    expect(response.body).toHaveProperty("CharacterId", characterId);
  });
});

describe("GET /my-characters", () => {
  test("Berhasil mendapatkan daftar MyCharacters", async () => {
    const response = await request(app)
      .get("/my-characters")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("PUT /characters/:id", () => {
  test("Berhasil update gambar character", async () => {
    const response = await request(app)
      .put(`/characters/${characterId}`)
      .set("Authorization", `Bearer ${token}`)
      .attach(
        "image",
        "https://static.wikia.nocookie.net/disney/images/d/d0/27_marta.jpg"
      )
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Character image has been updated"
    );
  });
});

describe("DELETE /characters/:id", () => {
  test("Berhasil menghapus characters dari MyCharacters", async () => {
    const response = await request(app)
      .delete(`/characters/${characterId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Character successfully removed from myCharacters."
    );
  });
});
