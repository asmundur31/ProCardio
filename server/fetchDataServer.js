/**
 * This moduel handels all data fetching serverside.
 */
import fetch from 'node-fetch';

/**
 * Function that gets all the routes that we have collected
 */
export async function getAllRoutes() {
  var data = await getData();
  return data.routes;
}

/**
 * Function that gets all the routes that we have collected
 */
export async function getRoute(id) {
  var data = await getData();
  var route = filterById(data.routes, id);
  return route;
}

/**
 * Function that gets the file with data and returns the
 * data in JSON format.
 */
async function getData() {
  try {
    var file = await fetch('http://localhost:3000/static/data.json');
    var data = await file.json();
  } catch(e) {
    console.error(e);
  }
  return data;
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
