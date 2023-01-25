import express from 'express';
import uniqid from 'uniqid';
import { moviesArr } from './sources/movies.js';

const app = express();
const id = uniqid();
console.log(id);
console.log(moviesArr);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Server is working');
});

app.get('/movies', (req, res) => {
  try {
    res.send();
  } catch (error) {
    console.error(error);
  }
});

app.get('/movies/:id', (req, res) => {
  try {
    res.send();
  } catch (error) {
    console.error(error);
  }
});

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
