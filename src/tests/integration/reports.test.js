const faker = require('faker');
const request = require('supertest');
const { StatusCodes } = require('http-status-codes');

const app = require('../../config/express');
const { version } = require('../../config/env');

const baseUserURL = `/api/${version}/users`;
const baseGenreURL = `/api/${version}/genres`;
const baseMovieURL = `/api/${version}/movies`;
const baseScoreURL = `/api/${version}/scores`;
const baseURL = `/api/${version}/reports`;

let token;
let sampleGenre;
let sampleGenreResponse;
let sampleMovie;
let sampleScore;

beforeAll(async () => {
  const admin = await request(app)
    .post(`${baseUserURL}/login`)
    .send({ email: 'adm@adm.com', password: '123' });

  token = admin.body.token;
});

describe('\n * Report Endpoints', () => {
  describe('\n => GET /reports/', () => {
    it('Should be able list top 3 movies, return 200 - Ok', async () => {
      sampleGenre = {
        genre: faker.name.title(),
      };

      sampleScore = {
        score: 4,
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
        .post(`${baseMovieURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleMovie);
      sampleMovieResponse = movie.body;

      await request(app)
        .post(`${baseScoreURL}/${sampleMovieResponse.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sampleScore);

      const report = await request(app)
        .get(`${baseURL}/`)
        .set('Authorization', `Bearer ${token}`)
        .query({ top: 3, page: 1 });

      await request(app)
        .delete(`${baseMovieURL}/${sampleMovieResponse.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(report.status).toBe(StatusCodes.OK);
    });
  });
});
