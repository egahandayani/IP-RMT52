const { test, expect, describe } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");
const bcrypt = require('bcrypt');
const { User } = require('../models');

const validGoogleToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI1NTUxMTI3fQ.fVpwZKXiSPlrCRSv6p70Mitnz5DprlFKlZNIdHMNmFc';

beforeEach(async () => {
  await User.destroy({ where: {} });
});

describe('POST /register', () => {
  test('Berhasil menambahkan user', async () => {
    const response = await request(app)
      .post('/register')
      .send({
        username: 'userTest',
        email: 'userTest@gmail.com',
        password: '123456'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('username', 'userTest');
    expect(response.body).toHaveProperty('email', 'userTest@gmail.com');
  });

  test('Berhasil mengembalikan error jika email sudah terdaftar', async () => {
    await User.create({
      username: 'userTest',
      email: 'userTest@gmail.com',
      password: await bcrypt.hash('123456', 10)
    });

    const response = await request(app)
      .post('/register')
      .send({
        username: 'userTest',
        email: 'userTest@gmail.com',
        password: '123456'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});


describe('POST /login', () => {
  beforeEach(async () => {
    await User.create({
      username: 'userTest',
      email: 'userTest@gmail.com',
      password: await bcrypt.hash('123456', 10)
    });
  });

  test('Berhasil login dengan valid access_token', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'userTest@gmail.com',
        password: '123456'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('id');
  });

  test('Berhasil mengembalikan error jika email tidak diberikan', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        password: '123456'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message', 'Email is required !');
  });

  test('Berhasil mengembalikan error jika password invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'userTest@gmail.com',
        password: '1234567'
      });

    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', 'Email or Password is required');
  });
});

describe('POST /googleLogin', () => {
  test('Berhasil login dengan token Google dan membuat user baru', async () => {
    const response = await request(app)
      .post('/googleLogin')
      .send({
        googleToken: validGoogleToken  
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('access_token');
  });

  test('Berhasil mengembalikan error jika token Google tidak valid', async () => {
    const response = await request(app)
      .post('/googleLogin')
      .send({
        googleToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzI1NTQ3MTk1fQ.mxuph5ducf0Fpwc'
      });

    expect(response.statusCode).toBe(401); 
    expect(response.body).toHaveProperty('message', 'Invalid Token');
  });
});