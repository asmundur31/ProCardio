/**
 * Function that performs all the calculations on the route that
 * we need.
 * It takes in the name of the file we want to access.
 */
export default async function routeCalculations(filename) {
  const file = await fetch('./static/routes/'+filename+'.geojson');
  // Get coordinates and elevation lists
  const { coordinates, elevation } = await formatRouteData(file);
  // Perform calculations on data
  const { totDist, incline } = calcData(coordinates, elevation);
  return {totDist, elevation, incline}
}

/**
 * Function that gets json file and returns the data we need
 */
async function formatRouteData(file) {
  const jsonData = await file.json();
  const { features } = jsonData;
  var coordinates = [];
  var elevation = [];
  features.forEach((feature) => {
    coordinates.push(feature.geometry.coordinates)
    elevation.push(feature.properties.ele);
  });
  var incline = [0];
  for(var i=1; i<elevation.length; i++) {
    incline.push(calcIncline(elevation[i-1], elevation[i]));
  }
  return {coordinates, elevation, incline};
}

/**
 * Function that calculates the total distance between all the 
 * given points and incline between points. Returns an array with
 * collected distance and incline between every point.
 */
function calcData(coordinates, elevation) {
  var totDist = [0];
  var incline = [0];
  var previousPoint = coordinates[0];
  var previousElevation = elevation[0];
  for(var i=1; i<coordinates.length; i++) {
    const nextPoint = coordinates[i];
    const distance = pointDist(previousPoint, nextPoint);
    totDist.push(totDist[totDist.length-1]+distance);
    const nextElevation = elevation[i];
    const incl = calcIncline(previousElevation, nextElevation, distance);
    /*console.log('previous elevation: '+previousElevation);
    console.log('Next elevation: '+nextElevation);
    console.log('Distace: '+distance);
    console.log('incl: '+incl);*/
    incline.push(incl);
    previousPoint = nextPoint;
    previousElevation = nextElevation;
  }
  return {totDist, incline};
}

/**
 * Function that calculates the distance between two Latitude/Longitude
 * points.
 * Reference: http://www.movable-type.co.uk/scripts/latlong.html
 * Points are on the form [Longitude, Latitude]
 */
function pointDist(pointA, pointB) {
  const R = 6371000;
  const latA = pointA[1]*Math.PI/180;
  const latB = pointB[1]*Math.PI/180;
  const latDif = (pointB[1]-pointA[1])*Math.PI/180;
  const lonDif = (pointB[0]-pointA[0])*Math.PI/180;
  const a = Math.sin(latDif/2)*Math.sin(latDif/2) + Math.cos(latA) * Math.cos(latB) * Math.sin(lonDif/2) * Math.sin(lonDif/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c;
  return d;
}

/**
 * Function that calculates incline between two elevation samples.
 * Takes in two elevation samples and the distance between them.
 */
function calcIncline(elevationA, elevationB, distance) {
  const inclinePer = ((elevationB-elevationA)/distance)*100;
  return inclinePer;
}