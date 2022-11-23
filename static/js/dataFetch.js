/**
 * This moduel handels all data fetching clientside.
 */

/**
 * Function that gets all the routes that we have collected
 */
export async function getRouteById(id) {
  var route = await getData('/api/routes/'+id);
  return route;
}

export async function getRecordingById(id) {
  var recording = await getData('/api/recordings/'+id);
  return recording;
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
  var result = await fetch(`${window.location.origin}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonObj)
  });
  return result;
}

/**
 * Function that sends a post request with recording to server
 */
export async function saveRecording(jsonObj) {
  var url = '/api/recordings';
  var result = await postData(url, jsonObj);
  return result;
}
