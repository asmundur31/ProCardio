/**
 * This module has the routing for recordings
 */
 import express from 'express';
 import { getAllRecordings, getRecordingById } from './fetchDataServer.js';

 export const router = express.Router();
 
 router.get('/', async (req, res) => {
  var recordings = await getAllRecordings();
  res.render('recordings', {'recordings': recordings});
 });
 
 router.get('/:id', async (req, res) => {
   var id = req.params.id;
   var recording = await getRecordingById(id);
   res.render('recording', {'recording': recording});
 });
