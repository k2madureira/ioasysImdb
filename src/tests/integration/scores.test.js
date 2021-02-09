const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');

const app = require('../../config/express');
const { version } = require('../../config/env');

const baseUserURL = `/api/${version}/users`;
const baseMovieURL = `/api/${version}/movies`;
const baseGenreURL = `/api/${version}/genres`;
const baseURL = `/api/${version}/scores`;

let token;
let sampleMovie;
let sampleMovieResponse;
let sampleGenre;
let sampleGenreResponse;
let sampleScore;

beforeAll(async () => {
  const admin = await request(app)
    .post(`${baseUserURL}/login`)
    .send({ email: 'adm@adm.com', password: '123' });

  token = admin.body.token;
});

describe('\n * Score Endpoints', () => {
  describe('\n => POST /scores/', () => {
    it('Should be able create a new score, return 201 - Created', async () => {
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

      sampleScore = {
        score: 4,
      };

      const movie = await request(app)
        .post(`${baseMovieURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleMovie);

      sampleMovieResponse = movie.body;

      const score = await request(app)
        .post(`${baseURL}/${sampleMovieResponse.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleScore);

      expect(score.status).toBe(StatusCodes.CREATED);
    });

    it('Should not be able create a new score without fields, return 400 - Bad request', async () => {
      const sample = {};

      const score = await request(app)
        .post(`${baseURL}/${sampleMovieResponse.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sample);

      expect(score.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able create a new score with wrong ID, return 404 - Not found', async () => {
      const errorId = 'fe936e37-f4c6-4f8b-adfb-2873ac891efd';
      const score = await request(app)
        .post(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleScore);

      expect(score.status).toBe(StatusCodes.NOT_FOUND);
    });

    it('Should not be able update a score with wrong UUID format, return 400 - Bad request', async () => {
      const errorId = 'e936e37-f4c6-4f8b-adfb-2873ac891efd';

      const score = await request(app)
        .post(`${baseURL}/${errorId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleScore);

      expect(score.status).toBe(StatusCodes.BAD_REQUEST);
    });

    it('Should not be able vote twice, return 409 - Conflict', async () => {
      const score = await request(app)
        .post(`${baseURL}/${sampleMovieResponse.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleScore);

      await request(app)
        .delete(`${baseMovieURL}/${sampleMovieResponse.id}`)
        .set('Authorization', `Bearer ${token}`);

      await request(app)
        .delete(`${baseGenreURL}/${sampleGenreResponse.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(score.status).toBe(StatusCodes.CONFLICT);
    });
  });
});
