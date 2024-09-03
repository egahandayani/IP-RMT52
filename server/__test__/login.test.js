const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

describe("POST /login", () => {
  test("Berhasil login dan mengirimkan access_token", async () => {
    const login = {
      email: "admin@gmail.com",
      password: "admin123",
    };

    const response = await request(app).post("/login").send(login);

    console.log(
      "🚀 ~ test ~ response:",
      response.status,
      response.body,
      "<<< body"
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("Email tidak diberikan / tidak diinput", async () => {
    const login = {
      email: "",
      password: "admin123",
    };

    const response = await request(app).post("/login").send(login);

    console.log(
      "🚀 ~ test ~ response:",
      response.status,
      response.body,
      "<<< body"
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Email is required !");
  });

  test("Password tidak diberikan / tidak diinput", async () => {
    const login = {
      email: "admin@gmail.com",
      password: "",
    };

    const response = await request(app).post("/login").send(login);

    console.log(
      "🚀 ~ test ~ response:",
      response.status,
      response.body,
      "<<< body"
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Password is required !");
  });

  test("Email diberikan invalid / tidak terdaftar", async () => {
    const login = {
      email: "ega@gmail.com",
      password: "ega123",
    };

    const response = await request(app).post("/login").send(login);

    console.log(
      "🚀 ~ test ~ response:",
      response.status,
      response.body,
      "<<< body"
    );
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is required"
    );
  });

  test("Password diberikan salah / tidak match", async () => {
    const login = {
      email: "ega@gmail.com",
      password: "admin456",
    };

    const response = await request(app).post("/login").send(login);

    console.log(
      "🚀 ~ test ~ response:",
      response.status,
      response.body,
      "<<< body"
    );
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      "message",
      "Email or Password is required"
    );
  });
});
