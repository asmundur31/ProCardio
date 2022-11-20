import fs, { promises } from 'fs';
import { query, end, saveRoute, saveTest, saveRecording } from '../server/db.js';

const drop = './sql/drop.sql';
const schema = './sql/schema.sql';
const routeFolder = './static/routes/';
const testFolder = './static/tests/';
const recordingFolder = './static/recordings/';

async function main() {
  const dropTables = await promises.readFile(drop);
  await query(dropTables.toString('utf-8'));
  const createTable = await promises.readFile(schema);
  await query(createTable.toString('utf-8'));
  fs.readdirSync(routeFolder).forEach(async (file) => {
    var file = await promises.readFile(routeFolder+file);
    var json = await JSON.parse(file);
    await saveRoute(json);
  });
  fs.readdirSync(testFolder).forEach(async (file) => {
    var file = await promises.readFile(testFolder+file);
    var json = await JSON.parse(file);
    await saveTest(json);
  });
  fs.readdirSync(recordingFolder).forEach(async (file) => {
    var file = await promises.readFile(recordingFolder+file);
    var json = await JSON.parse(file);
    await saveRecording(json);
  });
}

main().catch((err) => {
  console.error(err);
})
