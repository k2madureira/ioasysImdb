const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');

const app = require('../../config/express');
const { version } = require('../../config/env');

const baseUserURL = `/api/${version}/users`;
const baseURL = `/api/${version}/genres`;

let token;
let userToken;
let sampleGenre;
let sampleGenreResponse;

beforeAll(async () => {
  const admin = await request(app)
    .post(`${baseUserURL}/login`)
    .send({ email: 'adm@adm.com', password: '123' });

  const user = await request(app)
    .post(`${baseUserURL}/login`)
    .send({ email: 'user@user.com', password: '123' });

  token = admin.body.token;
  userToken = user.body.token;
});

describe('\n * Genre Endpoints', () => {
  describe('\n => POST /genres/', () => {
    it('Should be able create a new genre, return 201 - Created', async () => {
      sampleGenre = {
        genre: faker.name.title(),
      };

      const genre = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleGenre);

      sampleGenreResponse = genre.body;

      expect(genre.status).toBe(StatusCodes.CREATED);
    });

    it('Should not be able create a new genre without fields, return 400 - Bad request', async () => {
      const sample = {};

      const genre = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sample);

      expect(genre.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able create a new genre with same name, return 409 - Conflict', async () => {
      const genre = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleGenre);

      expect(genre.status).toBe(StatusCodes.CONFLICT);
    });

    it('Should not be able create a new genre if user is not admin, return 401 - Unauthorized', async () => {
      const genre = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(sampleGenre);

      expect(genre.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('\n => (PUT/PATCH) /genres/:id', () => {
    it('Should be able update a genre, return 200 - Ok', async () => {
      sampleGenre.genre = faker.name.title();

      const { id } = sampleGenreResponse;

      const genre = await request(app)
        .patch(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleGenre);

      sampleGenreResponse = genre.body;

      expect(genre.status).toBe(StatusCodes.OK);
    });

    it('Should not be able update a genre with wrong id, return 404 - Not found', async () => {
      const errorId = 'fe936e37-f4c6-4f8b-adfb-2873ac891efd';

      const genre = await request(app)
        .patch(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleGenre);

      expect(genre.status).toBe(StatusCodes.NOT_FOUND);
    });

    it('Should not be able update a genre with wrong UUID format, return 400 - Bad request', async () => {
      const errorId = 'e936e37-f4c6-4f8b-adfb-2873ac891efd';

      const genre = await request(app)
        .patch(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleGenre);

      expect(genre.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able update a genre if user is not admin, return 401 - Unauthorized', async () => {
      const { id } = sampleGenreResponse;

      const genre = await request(app)
        .patch(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(sampleGenre);

      expect(genre.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });
  /*
  describe('\n (GET) /movies/', () => {
    it('Should not be able lit movies, return 200 - OK', async () => {
      const movie = await request(app)
        .get(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`);

      expect(movie.status).toBe(StatusCodes.OK);
    });

    it('Should not be able detail a movie, return 200 - OK', async () => {
      const { id } = sampleGenreResponse;
      const movie = await request(app)
        .get(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(movie.status).toBe(StatusCodes.OK);
    });
  });

  describe('\n => (DELETE) /movies/:id', () => {
    it('Should not be able delete a movie with wrong id, return 404 - Not found', async () => {
      const errorId = 'fe936e37-f4c6-4f8b-adfb-2873ac891efd';

      const movie = await request(app)
        .delete(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(movie.status).toBe(StatusCodes.NOT_FOUND);
    });

    it('Should not be able delete a movie with wrong UUID format, return 400 - Bad request', async () => {
      const errorId = 'e936e37-f4c6-4f8b-adfb-2873ac891efd';

      const movie = await request(app)
        .delete(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(movie.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able delete a movie if not admin, return 401 - Unauthorized', async () => {
      const { id } = sampleGenreResponse;

      const movie = await request(app)
        .delete(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(movie.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('Should be able delete a movie, return 200 - Ok', async () => {
      const { id } = sampleGenreResponse;

      const movie = await request(app)
        .delete(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(movie.status).toBe(StatusCodes.OK);
    });
  }); */
});
