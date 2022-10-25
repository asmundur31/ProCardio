/**
 * This file starts the server and handels all the routes of the website
 */
import express from 'express';
import { router as routesRouter } from './server/routes.js';
import { router as testsRouter } from './server/tests.js';

const app = express();
const port = 3000;

// We are using EJS templates that we serve to the client
app.set('view engine', 'ejs');
// Static files are loceted in the static folder
app.use('/static', express.static('static'));

// The root variable is accessable globally (Current Working Directory)
app.locals.root = process.cwd();

// Routes for the app
app.get('/', (req, res) => {
  res.redirect('home');
});
app.get('/home', (req, res) => {
  res.render('home');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/old', (req, res) => {
  res.render('index');
});
app.use('/routes', routesRouter);
app.use('/tests', testsRouter);

// Here we start the server
app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
