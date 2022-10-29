/**
 * This module has the routing for routes
 */
import express from 'express';
import { getAllRoutes, getRouteById } from './fetchDataServer.js';

export const router = express.Router();

router.get('/', async (req, res) => {
  var routes = await getAllRoutes();
  res.render('routes', {'routes': routes});
});

router.get('/:id', async (req, res) => {
  var id = req.params.id;
  var route = await getRouteById(id);
  res.render('route', {'route': route});
});
