import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /movies', () => {
  it('If request does not contain tittle, released or director 1)Should return 404 status code, 2)Should return cannot add this movie!', async () => {
    const response = await request.post('/movies').send({
      title: 'New Avatar',
      released: '2007',
    });
    expect(response.status).toBe(404);
    expect(response.body).toBe(
      'Cannot add this movie! Please provide ALL fields: title, released, director, in your request.',
    );
  });
  // it('If request contain wrong city name 1)Should return 404 status code, 2)Should return object with {weatherText: City is not found!}', async () => {
  //   const response = await request
  //     .post('/weather')
  //     .send({ city: 'Wrongcityname' });
  //   expect(response.status).toBe(404);
  //   expect(response.body).toMatchObject({ weatherText: 'City is not found!' });
  // });
  // it('If request contain correct city name 1)Should return 200 status code, 2)Should return object with {weatherText: current temperature in cityName is currentTemp°C}', async () => {
  //   const response = await request.post('/weather').send({ city: 'Moscow' });
  //   expect(response.status).toBe(200);
  //   expect(response.body).toBeInstanceOf(Object);
  //   expect(response.body.weatherText).toContain(
  //     'current temperature in Moscow is',
  //   );
  // });
  // it('If request endpoint is wrong}', async () => {
  //   const response = await request.post('/weat').send({ city: 'Moscow' });
  //   expect(response.status).toBe(404);
  //   expect(response.body).toStrictEqual({});
  // });
});
