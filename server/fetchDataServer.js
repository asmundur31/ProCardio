/**
 * This moduel handels all data fetching serverside.
 */
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const {
  PORT: port = 3000,
  ORIGIN: origin = 'http://localhost:3000'
} = process.env;

/**
 * Function that gets all the routes that we have collected
 */
export async function getAllRoutes() {
  var data = await getData('/static/routes/allRoutes.json');
  return data.routes;
}

/**
 * Function that gets a route with specific id
 */
export async function getRouteById(id) {
  var data = await getData('/static/routes/allRoutes.json');
  var route = filterById(data.routes, id);
  return route;
}

/**
 * Function that filters JSON list by Id.
 */
function filterById(jsonList, id) {
  const object = jsonList.filter((jsonObject) => {
    return (jsonObject['id'] == id);
  });
  return object[0];
}

/**
 * Function that gets all the recordings
 */
export async function getAllRecordings() {
  const data = await getData('/static/recordings/allRecordings.json');
  const allRecordings = [];
  for(var i=0; i<data.recordings.length; i++) {
    var recording = await getData(data.recordings[i].recording);
    recording.id = data.recordings[i].id;
    allRecordings.push(recording);
  }
  return allRecordings;
}

/**
 * Function that gets a recording with a specific id 
 */
 export async function getRecordingById(id) {
  const data = await getData('/static/recordings/allRecordings.json');
  var recordingData = filterById(data.recordings, id);
  const recording = await getData(recordingData.recording);
  return recording;
}

/**
 * Function that gets the file with data and returns the
 * data in JSON format.
 */
 async function getData(url) {
  try {
    var file = await fetch(`${origin}${url}`);
    var data = await file.json();
  } catch(e) {
    console.error(e);
  }
  return data;
}
