/*eslint no-undef: "error"*/
/*eslint-env node*/

const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());

app.post('/blogs', (req, res) => {
  // How to get the title and content from the request??
  const title = req.body.title;
  const content = req.body.content;
  fs.writeFileSync(title, content);
  res.end('ok');
});

app.put('/posts/:title', (req, res) => {
  // How to get the title and content from the request?
  const title = req.body.title;
  const content = req.body.content;
  // What if the request does not have a title and/or content?
  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    res.end('ok');
  } else {
    res.end('This post does not exist!');
    // Send response with error message
  }
});

app.delete('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  console.log(title);
  if (fs.existsSync(title)) {
    // Add condition here
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    // Respond with message here
    res.end('This post does not exist!');
  }
});

app.get('/blogs/:title', (req, res) => {
  // How to get the title from the url parameters?
  const title = req.params.title;
  // check if post exists
  if (fs.existsSync(title)) {
    const post = fs.readFileSync(title);
    res.setHeader('Content-Type', 'text/plain');
    // send response
    res.status(200).send(post);
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.get('/blogs', (req, res) => {
  // how to get the file names of all files in a folder??

  const files = fs.readdirSync(__dirname);
  res.status(200).send(files);
});

// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);
