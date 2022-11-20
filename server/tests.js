/**
 * This module has the routing for tests
 */
import express from 'express';
import { getTests, getTestById } from './db.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  var tests = await getTests();
  res.render('routes', {'routes': tests, 'type': 'tests'});
});

router.get('/:id', async (req, res) => {
  var id = req.params.id;
  var test = await getTestById(id);
  res.render('route', {'route': test});
});
