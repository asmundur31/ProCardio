/**
 * This module has the routing for recordings
 */
import express from 'express';
import fs from 'fs';
import { getAllRecordings, getRecordingById } from './fetchDataServer.js';

export const router = express.Router();

/**
 * Function that get all recordings
 */
router.get('/', async (req, res) => {
  var recordings = await getAllRecordings();
  res.render('recordings', {'recordings': recordings});
});

/**
 * Function that gets one recording
 */
router.get('/:id', async (req, res) => {
  var id = req.params.id;
  var recording = await getRecordingById(id);
  res.render('recording', {'recording': recording});
});

/**
 * Function that recives the recording and saves it on the server
 */
router.post('/', async (req, res) => {
  var recording = req.body;
  fs.writeFile('./static/recordings/'+recording.experiment.fileName+'.json', JSON.stringify(recording), function (err) {
    if(err) return console.log(err);
  });
  fs.readFile('./static/recordings/allRecordings.json', {encoding: 'utf-8'}, function(err, data) {
    if(!err) {
      var jsonObj = JSON.parse(data);
      var lastId = jsonObj.recordings[jsonObj.recordings.length-1].id;
      jsonObj.recordings.push({
        id: lastId+1,
        recording: '/static/recordings/'+recording.experiment.fileName+'.json'
      });
      fs.writeFile('./static/recordings/allRecordings.json', JSON.stringify(jsonObj), function (err) {
        if(err) return console.log(err);
      });
    } else {
      console.log(err);
      res.status(500).send();
    }
  });
  console.log('Successfully saved recording');
  res.status(204).send();
 });
