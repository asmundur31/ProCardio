/**
 * This moduel handels all data fetching clientside.
 */

/**
 * Function that gets all the routes that we have collected
 */
export async function getAllRoutes() {
  var data = await getData('/static/routes/allRoutes.json');
  return data.routes;
}

/**
 * Function that gets all the routes that we have collected
 */
export async function getRouteById(id) {
  var data = await getData('/static/routes/allRoutes.json');
  var routeData = filterById(data.routes, id);
  var routeName = routeData.name;
  var routeType = 'route';
  const route = await getData(routeData.route);
  route.name = routeName;
  route.type = routeType;
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
async function getData(url) {
  var file = await fetch(`${window.location.origin}${url}`);
  var data = await file.json();
  return data;
}

/**
 * Function that posts data to specific url 
 */
async function postData(url, jsonObj) {
  await fetch(`${window.location.origin}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObj)
  });
}

/**
 * Function that sends a post request with recording to server
 */
export async function saveRecording(jsonObj) {
  var url = '/recordings';
  await postData(url, jsonObj);
}
