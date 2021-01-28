const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');

const app = require('../../config/express');
const { version } = require('../../config/env');

const baseURL = `/api/${version}/users`;

let token;
let userToken;
let sampleUser;
let sampleUserResponse;

beforeAll(async () => {
  const admin = await request(app)
    .post(`${baseURL}/login`)
    .send({ email: 'adm@adm.com', password: '123' });

  const user = await request(app)
    .post(`${baseURL}/login`)
    .send({ email: 'user@user.com', password: '123' });

  token = admin.body.token;
  userToken = user.body.token;
});

describe('\n * User Endpoints', () => {
  describe('\n => POST /users/login', () => {
    it('Should be able to log in', async () => {
      const login = await request(app)
        .post(`${baseURL}/login`)
        .send({ email: 'adm@adm.com', password: '123' });

      expect(login.body).toHaveProperty('token');
    });

    it('Should not be able to log in with wrong Email, return 404 - Not Found', async () => {
      const login = await request(app)
        .post(`${baseURL}/login`)
        .send({ email: 'ERROR@ERROR.com', password: '123' });

      expect(login.status).toBe(StatusCodes.NOT_FOUND);
    });

    it('Should not be able to log in with wrong Password, return 409 - Conflict', async () => {
      const login = await request(app)
        .post(`${baseURL}/login`)
        .send({ email: 'adm@adm.com', password: 'ERROR' });

      expect(login.status).toBe(StatusCodes.CONFLICT);
    });
  });

  describe('\n => POST /users/', () => {
    it('Should be able create a new user, return 201 - Created', async () => {
      sampleUser = {
        name: faker.name.findName(),
        nickname: faker.name.lastName(),
        email: faker.internet.email(),
        password: 'P@SSW0RD',
        admin: false,
      };

      const user = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      sampleUserResponse = user.body;

      expect(user.status).toBe(StatusCodes.CREATED);
    });

    it('Should not be able create a new user without fields, return 400 - Bad request', async () => {
      const sample = {
        name: faker.name.findName(),
        nickname: faker.name.lastName(),
        password: 'P@SSW0RD',
        admin: false,
      };

      const user = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sample);

      expect(user.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able create a new user with same email, return 409 - Conflict', async () => {
      const user = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      expect(user.status).toBe(StatusCodes.CONFLICT);
    });

    it('Should not be able create a new admin if user is not admin, return 401 - Unauthorized', async () => {
      sampleUser.admin = true;
      const user = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(sampleUser);

      sampleUser.admin = false;
      expect(user.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('\n => (PUT/PATCH) /users/:id', () => {
    it('Should be able update a user, return 200 - Ok', async () => {
      sampleUser.name = faker.name.findName();
      sampleUser.nickname = faker.name.lastName();
      delete sampleUser.password;

      const { id } = sampleUserResponse;

      const user = await request(app)
        .put(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      sampleUser.password = 'P@SSW0RD';
      sampleUserResponse = user.body;

      expect(user.status).toBe(StatusCodes.OK);
    });

    it('Should not be able update a user with wrong id, return 404 - Not found', async () => {
      const errorId = 'fe936e37-f4c6-4f8b-adfb-2873ac891efd';

      const user = await request(app)
        .put(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      expect(user.status).toBe(StatusCodes.NOT_FOUND);
    });

    it('Should not be able update a user with wrong UUID format, return 400 - Bad request', async () => {
      const errorId = 'e936e37-f4c6-4f8b-adfb-2873ac891efd';

      const user = await request(app)
        .put(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      expect(user.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able update a admin if user is not admin, return 401 - Unauthorized', async () => {
      const { id } = sampleUserResponse;
      sampleUser.admin = true;

      const user = await request(app)
        .put(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(sampleUser);

      sampleUser.admin = false;
      expect(user.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('\n => (DELETE) /users/:id', () => {
    it('Should not be able delete a user with wrong id, return 404 - Not found', async () => {
      const errorId = 'fe936e37-f4c6-4f8b-adfb-2873ac891efd';

      const user = await request(app)
        .delete(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      expect(user.status).toBe(StatusCodes.NOT_FOUND);
    });

    it('Should not be able delete a user with wrong UUID format, return 400 - Bad request', async () => {
      const errorId = 'e936e37-f4c6-4f8b-adfb-2873ac891efd';

      const user = await request(app)
        .delete(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      expect(user.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able delete a user if not admin, return 401 - Unauthorized', async () => {
      const { id } = sampleUserResponse;

      const user = await request(app)
        .delete(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(sampleUser);

      expect(user.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('Should be able delete a user, return 200 - Ok', async () => {
      const { id } = sampleUserResponse;

      const user = await request(app)
        .delete(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleUser);

      expect(user.status).toBe(StatusCodes.OK);
    });
  });
});
