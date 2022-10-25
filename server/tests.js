/**
 * This module has the routing for tests
 */
import express from 'express';

export const router = express.Router();

router.get('/', (req, res) => {
  res.render('tests');
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  res.render('test', {'id': id});
});