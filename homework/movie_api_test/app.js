import express from 'express';
import uniqid from 'uniqid';
import { moviesData } from './sources/movies.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/movies', (req, res) => {
  getMoviesList(req, res);
});

app.get('/movies/:id', (req, res) => {
  getMovie(req, res);
});

app.post('/movies', (req, res) => {
  addMovie(req, res);
});
app.delete('/movies/:id', (req, res) => {
  deleteMovie(req, res);
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

function getMovie(req, res) {
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

function addMovie(req, res) {
  const { title, released, director } = req.body;
  if (!title || !released || !director) {
    res.status(400);
    res.send(
      'Cannot add this movie! Please provide ALL fields: title, released, director, in your request.',
    );
    return;
  }
  const id = uniqid();
  const newMovie = {
    id,
    title,
    released,
    director,
  };

  moviesData.push(newMovie);
  try {
    res.status(201);
    res.send(`New movie added in Database with id:${id}`);
  } catch (error) {
    console.error(error);
  }
}

function deleteMovie(req, res) {
  const id = req.params.id;
  const movieToDelete = moviesData.find((movie) => movie.id === id);
  try {
    if (!movieToDelete) {
      res.status(404);
      res.send(`Movie with id:${id} not found!`);
      return;
    }
    moviesData.splice(moviesData.indexOf(movieToDelete), 1);
    res.status(200);
    res.send('Movie is deleted.');
  } catch (error) {
    console.error(error);
  }
}

export default app;
