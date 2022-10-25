/**
 * This moduel handels all data fetching clientside.
 */

/**
 * Function that gets all the routes that we have collected
 */
export async function getAllRoutes() {
  var file = await fetch('http://localhost:3000/static/data.json');
  var data = await file.json();
  return data.routes;
}

/**
 * Function that gets all the routes that we have collected
 */
export async function getRoute(id) {
  var file = await fetch('http://localhost:3000/static/data.json');
  var data = await file.json();
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
 * Function that gets data by specific url 
 */
export async function getData(url) {
  var file = await fetch('http://localhost:3000'+url);
  var data = await file.json();
  return data;
}
