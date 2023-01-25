import express from 'express';
import uniqid from 'uniqid';
import { moviesData } from './sources/movies.js';

const app = express();
const id = uniqid();
console.log(id);
console.log(moviesData);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.get('/movies', (req, res) => {
  getMoviesList(req, res);
});

app.get('/movies/:id', (req, res) => {
  getMovie(req, res);
});

function getMoviesList(req, res) {
  try {
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(moviesData);
  } catch (error) {
    console.error('ERROR: Cannot get movies list');
    res.status(500);
    res.send('Sorry. Cannot get movies list!');
  }
}

async function getMovie(req, res) {
  const id = req.params.id;
  try {
    for (let movie of moviesData) {
      if (movie.id === id) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(movie);
        return;
      }
    }
    res.status(404);
    res.send(`Movie with id:${id} not found!`);
  } catch (error) {
    console.error(error);
  }
}

app.post('/movies', (req, res) => {
  try {
    res.send();
  } catch (error) {
    console.error(error);
  }
});
app.delete('/movies/:id', (req, res) => {
  try {
    res.send();
  } catch (error) {
    console.error(error);
  }
});

export default app;
