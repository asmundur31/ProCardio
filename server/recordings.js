/**
 * This module has the routing for recordings
 */
import express from 'express';
import { getRecordings, getRecordingById } from './db.js';

export const router = express.Router();

/**
 * Function that get all recordings
 */
router.get('/', async (req, res) => {
  var recordings = await getRecordings();
  // Sort by time
  recordings = recordings.sort((a, b) => {
    if (a.recording.experiment.startTime > b.recording.experiment.startTime) {
      return -1;
    }
  });
  res.render('recordings', {'recordings': recordings});
});

/**
 * Function that gets one recording
 */
router.get('/:id', async (req, res) => {
  var id = req.params.id;
  var rec = await getRecordingById(id);
  res.render('recording', {'recording': rec.recording});
});
