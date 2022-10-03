/**
 * This module has all the logic done on the video.
 */
import routeCalculations from "./routeCalculations.js";
import { 
  updateElevationText,
  updateInclineText,
  updateTreadmillDistanceText,
  updateTreadmillTotalDistanceText,
  updateVideoSpeedText,
  setTreadmillIncline,
  endRoute } from "./userInterface.js";

// Elements
const videoElement = document.getElementById('video');
const videoSource = videoElement.getElementsByTagName('source')[0];

// Variables
var totalDistance = 0;
var totalTime = 1;
var videoSpeedUnit = 1; // average speed in km/h that eaquals video speed 1x

// Setting the videoSpeedUnit
videoElement.onloadedmetadata = function() {
  totalTime = this.duration;
  videoSpeedUnit = (totalDistance/totalTime)*3.6; //this refers to videoElement
};

// When video ends
videoElement.addEventListener('ended', async function() {
  // We want to stop the treadmill
  await endRoute();
}, false);


/**
 * Function that start the current video
 */
export function startVideo() {
  videoElement.play();
}

/**
 * Function that stops the current video
 */
export function stopVideo() {
  videoElement.pause();
}

/**
 * Function that increases the video speed by 0.1
 */
export function increaseVideoSpeed() {
  updateVideoSpeed(videoElement.playbackRate + 0.1);
}

/**
 * Function that decreases the video speed by 0.1
 */
 export function decreaseVideoSpeed() {
  updateVideoSpeed(videoElement.playbackRate - 0.1);
}

/**
 * Function that updates the speed
 */
export function updateVideoSpeed(value) {
  if(0.0625<=value && value<=16) {
    videoElement.playbackRate = parseFloat(value).toFixed(2);
    updateVideoSpeedText(videoElement.playbackRate);
  }
}

/**
 * Function that updates the video speed by heart rate
 * Data comes from heart rate sensor
 */
export function updateVideoSpeedByHR(heartRateMeasurement) {
  var heartRate = heartRateMeasurement.heartRate;
  // We assume that HR is on range [40,200] and we convert that range to [0.0625,16]
  var newVideoSpeed = ((heartRate-40)/30)+0.0625;
  updateVideoSpeed(newVideoSpeed.toFixed(2));
}

/**
 * Function that updates the video speed by treadmill speed
 * Data comes from the treadmill in km/h
 */
export function updateVideoSpeedByTreadmillSpeed(treadmillMeasurement) {
  var treadmillSpeed = treadmillMeasurement.speed;
  var newVideoSpeed = treadmillSpeed/videoSpeedUnit;
  updateVideoSpeed(newVideoSpeed.toFixed(2));
}

/**
 * Function that sets chosen route, that is chosen from a drop down 
 */
export async function setRoute(route) {
  videoSource.setAttribute('src', './static/videos/'+route+'.mp4');
  videoElement.load();
  const routeData = await routeCalculations(route);
  // Lets set the total distance so we can calculate the video speed unit
  totalDistance = routeData.totDist[routeData.totDist.length-1];
  return routeData;
}

export function updateDataByVideoProgress(routeData) {
  // Fisrt get the progress of the video
  var currentTime = videoElement.currentTime;
  var totalTime = videoElement.duration;
  var progress = currentTime/totalTime;
  // Second assuming that the video speed is constant and find the
  // current distance.
  var totDistance = routeData.totDist[routeData.totDist.length-1];
  var currentDistance = totDistance*progress;
  // Thirdly get the index of elevation
  var index = 0;
  while(routeData.totDist[index]<currentDistance) {
    index++;
  }
  // Then from the index we get the real elevation
  var alfa = (currentDistance-routeData.totDist[index-1])/(routeData.totDist[index]-routeData.totDist[index-1]);
  var ele = routeData.elevation[index]*alfa + routeData.elevation[index-1]*(1-alfa);
  // Calculate the incline
  var currentIncline = routeData.incline[index];
  // We request the treadmill to change its incline
  setTreadmillIncline(currentIncline);
  // Finally we update the text with correct values
  updateElevationText(ele.toFixed(2));
  updateInclineText(currentIncline.toFixed(1));
  updateTreadmillTotalDistanceText(totDistance.toFixed(0));
  updateTreadmillDistanceText(currentDistance.toFixed(0));
}
