import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

app.post('/weather', (req, res) => {
  const { city } = req.body;
  if (!city) {
    res.status(400);
    res.send('Please do not forget to provide city name.');
    return;
  }
  const cityName = city;
  console.log(cityName);
  res.status(200);
  res.send(cityName);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
