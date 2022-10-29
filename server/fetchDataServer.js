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
    allRecordings.push(formatRecording(recording));
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
  return formatRecording(recording);
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

/**
 * Function that fixes the format on recording
 */
function formatRecording(recording) {
  recording.experiment.duration = (recording.experiment.duration/1000)+'s';
  recording.experiment.startTime = formatDate(recording.experiment.startTime);
  recording.experiment.endTime = formatDate(recording.experiment.endTime);
  return recording;
}

/**
 * Function that takes a date and formats it to pretty date
 */
function formatDate(date) {
  var d = new Date(date);
  var datestring = parseInt(d.getDate()) >= 10 ? d.getDate() : '0'+d.getDate();
  datestring += '/';
  datestring += parseInt(d.getDate()) >= 10 ? (d.getMonth()+1) : '0'+(d.getMonth()+1);
  datestring += '/';
  datestring += parseInt(d.getFullYear()) >= 10 ? d.getFullYear() : '0'+d.getFullYear();
  datestring += ' ';
  datestring += parseInt(d.getHours()) >= 10 ? d.getHours() : '0'+d.getHours();
  datestring += ':';
  datestring += parseInt(d.getMinutes()) >= 10 ? d.getMinutes() : '0'+d.getMinutes();
  datestring += ':';
  datestring += parseInt(d.getSeconds()) >= 10 ? d.getSeconds() : '0'+d.getSeconds();
  return datestring;
}
