/**
 * This module has api endpoints for frontend to get data
 */
import express from 'express';
import fs from 'fs';
import { getRoutes, getRouteById, getRecordings, getRecordingById, getTests, getTestById, saveRecording } from './db.js';

export const router = express.Router();

router.get('/routes', async (req, res) => {
  var routes = await getRoutes();
  return res.json(routes);
});

router.get('/routes/:id', async (req, res) => {
  var id = req.params.id;
  var route = await getRouteById(id);
  return res.json(route);
});

router.get('/tests', async (req, res) => {
  var tests = await getTests();
  return res.json(tests);
});

router.get('/tests/:id', async (req, res) => {
  var id = req.params.id;
  var test = await getTestById(id);
  return res.json(test);
});

router.get('/recordings', async (req, res) => {
  var recordings = await getRecordings();
  return res.json(recordings);
});

router.get('/recordings/:id', async (req, res) => {
  var id = req.params.id;
  var recording = await getRecordingById(id);
  return res.json(recording);
});

router.post('/recordings', async (req, res) => {
  var recording = req.body;
  try {
    var result = await saveRecording(recording);
    if(result) {
      // Also save to file system
      var data = JSON.stringify(recording);
      fs.writeFileSync('./static/recordings/'+recording.experiment.fileName+'.json', data);
      return res.json('Data saved successfully');
    }
  } catch(error) {
    return res.status(400).send('Database error');
  }
});
