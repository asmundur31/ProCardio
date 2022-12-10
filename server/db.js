import pg from 'pg';
import dotenv from 'dotenv';
import { formatRecording } from './utils.js';

dotenv.config();

const {
  DATABASE_URL: connectionString,
} = process.env;

const pool = new pg.Pool({ connectionString });

pool.on('error', (err) => {
  console.error('Error in connection to database!', err);
  process.exit(-1);
});

/**
 * Function that performs the SQL query on the database
 * @param {string} q String that contains the SQL query
 * @param {list} values List of values that go into the SQL query string
 * @returns Returns what the SQL qyery returns or null if the SQL query did not work
 */
export async function query(_query, values = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(_query, values);
    return result;
  } catch(err) {
    console.error(err);
  } finally {
    client.release();
  }
}

// Helper to remove pg from the event loop
export async function end() {
  await pool.end();
}

/**
 * Function that saves a route data into the database
 * @param {JSON} data The route in JSON format
 * @returns the result of the query
 */
export async function saveRoute(data) {
  const name = data.name;
  const routeString = JSON.stringify(data.features);
  const video = data.video;
  const thumbnail = data.thumbnail;
  const description = data.description;
  const q = 'INSERT INTO routes (name, route, video, thumbnail, description) VALUES ($1, $2, $3, $4, $5);';
  const val = [name, routeString, video, thumbnail, description];
  const result = await query(q, val);
  return result;
}

/**
 * Function that saves a test data into the database
 * @param {JSON} data The route in JSON format
 * @returns the result of the query
 */
 export async function saveTest(data) {
  const name = data.name;
  const testString = JSON.stringify(data.features);
  const video = data.video;
  const thumbnail = data.thumbnail;
  const description = data.description;
  const q = 'INSERT INTO tests (name, test, video, thumbnail, description) VALUES ($1, $2, $3, $4, $5);';
  const val = [name, testString, video, thumbnail, description];
  const result = await query(q, val);
  return result;
}

/**
 * Function that saves a recording data into the database
 * @param {JSON} data The recording in JSON format
 * @returns the result of the query
 */
 export async function saveRecording(data) {
  const q = 'INSERT INTO recordings (recording) VALUES ($1);';
  const val = [JSON.stringify(data)];
  const result = await query(q, val);
  return result;
}

/**
 * Function that gets all recordings from the database
 * @returns all recordings in a json format
 */
export async function getRecordings() {
  const q = 'SELECT * FROM recordings;';
  const result = await query(q);
  var recordings = [];
  result?.rows.forEach((rec) => {
    var jsonO = JSON.parse(rec.recording);
    rec.recording = jsonO;
    recordings.push(formatRecording(rec));
  });
  return recordings;
}

/**
 * Function that gets a recording from the database with id
 * @param {int} id the id of the requested recording
 * @returns the recording with id in json format
 */
export async function getRecordingById(id) {
  const q = 'SELECT * FROM recordings WHERE id=$1;';
  const val = [id];
  const result = await query(q, val);
  const rec = result?.rows[0];
  var jsonO = JSON.parse(rec.recording);
  rec.recording = jsonO;
  return formatRecording(rec);
}

/**
 * Function that gets all routes from the database
 * @returns all routes in a json fromat
 */
export async function getRoutes() {
  const q = 'SELECT * FROM routes;';
  const result = await query(q);
  var routes = []
  result?.rows.forEach((rou) => {
    var jsonO = JSON.parse(rou.route);
    rou.route = jsonO;
    routes.push(rou);
  })
  return routes;
}

/**
 * Function that gets a route from the database with id
 * @param {int} id the id of the requested route
 * @returns the route with id in json fromat
 */
export async function getRouteById(id) {
  const q = 'SELECT * FROM routes WHERE id=$1;';
  const val = [id];
  const result = await query(q, val);
  const rou = result?.rows[0];
  var jsonO = JSON.parse(rou.route);
  rou.route = jsonO;
  return rou;
}

/**
 * Function that gets all tests from the database
 * @returns all tests in a json format
 */
export async function getTests() {
  const q = 'SELECT * FROM tests;';
  const result = await query(q);
  var tests = []
  result?.rows.forEach((tes) => {
    var jsonO = JSON.parse(tes.test);
    tes.test = jsonO;
    tests.push(tes);
  })
  return tests;
}

/**
 * Function that gets a test from the database with id
 * @param {int } id the id of the requested test
 * @returns the test with id in json format
 */
export async function getTestById(id) {
  const q = 'SELECT * FROM tests WHERE id=$1;';
  const val = [id];
  const result = await query(q, val);
  const tes = result?.rows[0];
  var jsonO = JSON.parse(tes.test);
  tes.test = jsonO;
  return tes;
}
