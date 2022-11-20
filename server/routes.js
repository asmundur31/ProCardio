/**
 * This module has the routing for routes
 */
import express from 'express';
import { getRoutes, getRouteById } from './db.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  var routes = await getRoutes();
  res.render('routes', {'routes': routes, 'type': 'routes'});
});

router.get('/:id', async (req, res) => {
  var id = req.params.id;
  var route = await getRouteById(id);
  res.render('route', {'route': route});
});
