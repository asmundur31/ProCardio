import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use('/static', express.static('static'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
