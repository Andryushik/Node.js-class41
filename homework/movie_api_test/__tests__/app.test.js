import app from '../app.js';
import supertest from 'supertest';

const request = supertest(app);

describe('GET /movies', () => {
  it('If request endpoint is wrong', async () => {
    const response = await request.get('/movie');
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({});
  });
  it('If request is correct', async () => {
    const response = await request.get('/movies');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
  });
});

describe('GET /movies', () => {
  it('If request id is wrong', async () => {
    const response = await request.get('/movies/43lgu7xfldaj3');
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({});
  });
  it('If request is correct', async () => {
    const response = await request.get('/movies/43lgu7xfldaj3een');
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: '43lgu7xfldaj3een',
      Title: 'The Avengers',
      Released: '2012',
      Director: 'Joss Whedon',
    });
  });
});

describe('POST /movies', () => {
  it('If request does not contain tittle, released or director 1)Should return 404 status code, 2)Should return cannot add this movie!', async () => {
    const response = await request.post('/movies').send({
      title: 'New Avatar',
      released: '2007',
    });
    expect(response.status).toBe(400);
    expect(response.text).toStrictEqual(
      'Cannot add this movie! Please provide ALL fields: title, released, director, in your request.',
    );
  });
  it('If request contain correct movie object 1)Should return 201 status code, 2)Should return object with {weatherText: current temperature in cityName is currentTemp°C}', async () => {
    const response = await request.post('/movies').send({
      title: '300',
      released: '2007',
      director: 'Zack Snyder',
    });
    expect(response.status).toBe(201);
    expect(response.text).toContain('New movie added in Database with id:');
  });
  it('If request endpoint is wrong}', async () => {
    const response = await request.post('/movie').send({
      title: '300',
      released: '2007',
      director: 'Zack Snyder',
    });
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({});
  });
});

describe('DELETE /movies', () => {
  it('If request id is wrong', async () => {
    const response = await request.delete('/movies/43lgu7xfldaj3');
    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({});
  });
  it('If request is correct', async () => {
    const response = await request.delete('/movies/43lgu7xfldaj3een');
    expect(response.status).toBe(200);
    expect(response.text).toStrictEqual('Movie is deleted.');
  });
});
