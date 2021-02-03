const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');

const app = require('../../config/express');
const { version } = require('../../config/env');

const baseUserURL = `/api/${version}/users`;
const baseGenreURL = `/api/${version}/genres`;
const baseURL = `/api/${version}/movies`;

let token;
let userToken;
let sampleGenre;
let sampleGenreResponse;
let sampleMovie;
let sampleMovieResponse;

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

describe('\n * Movie Endpoints', () => {
  describe('\n => POST /movies/', () => {
    it('Should be able create a new movie, return 201 - Created', async () => {
      sampleGenre = {
        genre: faker.name.title(),
      };

      const genre = await request(app)
        .post(`${baseGenreURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleGenre);
      sampleGenreResponse = genre.body;

      sampleMovie = {
        tt: faker.random.number(),
        title: faker.name.title(),
        year: '2021',
        director: faker.name.firstName(),
        genre: [sampleGenreResponse.id],
        actors: faker.name.title(),
      };

      const movie = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleMovie);

      sampleMovieResponse = movie.body;
      console.log(sampleMovieResponse);

      expect(movie.status).toBe(StatusCodes.CREATED);
    });

    it('Should not be able create a new movie without fields, return 400 - Bad request', async () => {
      const sample = {
        title: faker.name.title(),
        year: '2021',
        director: faker.name.firstName(),
        genre: faker.name.title(),
        actors: faker.name.title(),
      };

      const movie = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sample);

      expect(movie.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able create a new movie with same tt, return 409 - Conflict', async () => {
      const movie = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleMovie);

      expect(movie.status).toBe(StatusCodes.CONFLICT);
    });

    it('Should not be able create a new movie if user is not admin, return 401 - Unauthorized', async () => {
      const user = await request(app)
        .post(`${baseURL}/`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(sampleMovie);

      expect(user.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('\n => (PUT/PATCH) /movies/:id', () => {
    it('Should be able update a movie, return 200 - Ok', async () => {
      sampleMovie.director = faker.name.findName();
      sampleMovie.year = '2020';

      const { id } = sampleMovieResponse;

      const movie = await request(app)
        .put(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleMovie);

      sampleMovieResponse = movie.body;

      expect(movie.status).toBe(StatusCodes.OK);
    });

    it('Should not be able update a movie with wrong id, return 404 - Not found', async () => {
      const errorId = 'fe936e37-f4c6-4f8b-adfb-2873ac891efd';

      const movie = await request(app)
        .put(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleMovie);

      expect(movie.status).toBe(StatusCodes.NOT_FOUND);
    });

    it('Should not be able update a movie with wrong UUID format, return 400 - Bad request', async () => {
      const errorId = 'e936e37-f4c6-4f8b-adfb-2873ac891efd';

      const movie = await request(app)
        .put(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleMovie);

      expect(movie.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able update a movie if user is not admin, return 401 - Unauthorized', async () => {
      const { id } = sampleMovieResponse;

      const movie = await request(app)
        .put(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(sampleMovie);

      expect(movie.status).toBe(StatusCodes.UNAUTHORIZED);
    });
  });

  describe('\n => (GET) /movies/', () => {
    it('Should not be able lit movies, return 200 - OK', async () => {
      const movie = await request(app)
        .get(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`);

      expect(movie.status).toBe(StatusCodes.OK);
    });

    it('Should not be able detail a movie, return 200 - OK', async () => {
      const { id } = sampleMovieResponse;
      const movie = await request(app)
        .get(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`);
      console.log({ id, res: sampleMovieResponse });

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
      const { id } = sampleMovieResponse;

      const movie = await request(app)
        .delete(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(movie.status).toBe(StatusCodes.UNAUTHORIZED);
    });

    it('Should be able delete a movie, return 200 - Ok', async () => {
      const { id } = sampleMovieResponse;

      const movie = await request(app)
        .delete(`${baseURL}/${id}`)
        .set('Authorization', `Bearer ${token}`);

      await request(app)
        .delete(`${baseGenreURL}/${sampleGenreResponse.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(movie.status).toBe(StatusCodes.OK);
    });
  });
});
