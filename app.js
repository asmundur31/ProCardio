/**
 * This file starts the server and handels all the routes of the website
 */
import express from 'express';
import dotenv from 'dotenv';

import { router as routesRouter } from './server/routes.js';
import { router as testsRouter } from './server/tests.js';
import { router as recordingsRouter } from './server/recordings.js';

dotenv.config();

const {
  ORIGIN: origin = 'http://localhost:3000',
  PORT: port = 3000
} = process.env;

const app = express();

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
app.use('/routes', routesRouter);
app.use('/tests', testsRouter);
app.use('/recordings', recordingsRouter);

// Here we start the server
app.listen(port, () => {
  console.info(`Server running at ${origin}/`);
});
