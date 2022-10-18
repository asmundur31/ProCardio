/**
 * This module has all the user interface objects and listeners for
 * the heart rate sensor and the treadmill.
 */
import HeartRateDevice from './hrDevice.js';
import TreadmillDevice from './treadmillDevice.js';
import { 
  stopVideo,
  startVideo,
  increaseVideoSpeed,
  decreaseVideoSpeed,
  updateVideoSpeed,
  setRoute,
  updateDataByVideoProgress } from './video.js';

// Devices
let heartRateDevice = new HeartRateDevice();
let treadmillDevice = new TreadmillDevice();

// Variables
var heartRateMeasurements = {};
var treadmillMeasurements = {};
var routeData = {};
var videoInterval = {};

// Video Elements
const videoSpeedText = document.getElementById('video_speed_text');

const videoStartButton = document.getElementById('button_start');
const videoStopButton = document.getElementById('button_stop');
const videoFasterButton = document.getElementById('button_faster');
const videoSlowerButton = document.getElementById('button_slower');
const newVideoSpeedButton = document.getElementById('button_new_video_speed');
const newVideoSpeedInput = document.getElementById('new_video_speed');

const dropDownItems = document.getElementsByClassName('dropdown-item');

// Treadmill Elements
const treadmillSpeedText = document.getElementById('treadmill_speed_text');
const treadmillInclineText = document.getElementById('treadmill_incline_text');
const treadmillTotalDistanceText = document.getElementById('treadmill_total_distance_text');
const treadmillDistanceText = document.getElementById('treadmill_distance_text');
const elevationText = document.getElementById('elevation_text');
const inclineText = document.getElementById('incline_text');

const treadmillConnectButton = document.getElementById('connect_treadmill');
const treadmillDisconnectButton = document.getElementById('disconnect_treadmill');

const treadmillControls = document.getElementById('treadmill_controls');
const treadmillStartButton = document.getElementById('start_treadmill');
const treadmillStopButton = document.getElementById('stop_treadmill');
const treadmillSetSpeedButton = document.getElementById('button_new_treadmill_speed');
const treadmillSpeedInput = document.getElementById('new_treadmill_speed');
const treadmillSetInclineButton = document.getElementById('button_new_treadmill_incline');
const treadmillInclineInput = document.getElementById('new_treadmill_incline');

// HR Elements
const heartRateText = document.getElementById('hr_text');

const heartRateConnectButton = document.getElementById('connect_hr');
const heartRateDisconnectButton = document.getElementById('disconnect_hr');

// Video Listeners
videoStartButton.addEventListener('click', function () {
  videoInterval = window.setInterval(function(){
    updateDataByVideoProgress(routeData);
  }, 1000);
  startVideo();
});
videoStopButton.addEventListener('click', function () {
  clearInterval(videoInterval);
  stopVideo();
});
videoFasterButton.addEventListener('click', function () {
  increaseVideoSpeed();
});
videoSlowerButton.addEventListener('click', function () {
  decreaseVideoSpeed();
});
newVideoSpeedButton.addEventListener('click', function () {
  const newVideoSpeed = newVideoSpeedInput.value;
  updateVideoSpeed(newVideoSpeed);
});

for (var i = 0; i < dropDownItems.length; i++) {
  dropDownItems[i].addEventListener('click', async function (e) {
    clearInterval(videoInterval);
    routeData = await setRoute(e.target.id);
  });
}
// Treadmill Listeners
treadmillConnectButton.addEventListener('click', async function () {
  try {
    await treadmillDevice.connect();
  } catch (error) {
    console.log(error);
  }
});
treadmillDisconnectButton.addEventListener('click', function () {
  treadmillDevice.disconnect();
});
treadmillStartButton.addEventListener('click', async function () {
  try {
    await treadmillDevice.changeTreadmillStatus('start');
  } catch (e) {
    console.log(e);
  }
});
treadmillStopButton.addEventListener('click', async function () {
  try {
    await treadmillDevice.changeTreadmillStatus('stop');
  } catch (e) {
    console.log(e);
  }
});
treadmillSetSpeedButton.addEventListener('click', function () {
  const newTreadmillSpeed = treadmillSpeedInput.value;
  treadmillDevice.increaseSpeedStep(newTreadmillSpeed, 0);
});
treadmillSetInclineButton.addEventListener('click', function () {
  const newTreadmillIncline = treadmillInclineInput.value;
  treadmillDevice.increaseInclinationStep(newTreadmillIncline, 0);
});
// HR Listeners
heartRateConnectButton.addEventListener('click', function () {
  try {
    heartRateDevice.connect();
  } catch (error) {
    console.log(error);
  }
});
heartRateDisconnectButton.addEventListener('click', function () {
  heartRateDevice.disconnect();
});


// Treadmill
export function updateDisconnectedTreadmill(reason) {
  treadmillDevice = new TreadmillDevice();
  switch (reason) {
    case 'failed_connection':
      console.log("Connection to Treadmill failed. Try again.", "Treadmill device");
      break;
    case 'lost_connection':
      console.log("Connection to Treadmill lost. Try again.", "Treadmill device");
      break;
    case 'disconnected':
      console.log("Disconnected from Treadmill.", "Treadmill device");
      break;
    default:
      return;
  }
  treadmillConnectButton.disabled = false;
  treadmillControls.classList.add('d-none');
}
export function updateConnectedTreadmill() {
  treadmillMeasurements = {};
  treadmillConnectButton.disabled = true;
  treadmillControls.classList.remove('d-none');
}
export function updateDataTreadmill(measurementType, treadmillMeasurement) {
  updateTreadmillSpeedText(treadmillMeasurement.speed);
  updateTreadmillInclineText(treadmillMeasurement.inclination);
  if (treadmillMeasurements[measurementType] == undefined) {
    treadmillMeasurements[measurementType] = [];
  }
  treadmillMeasurements[measurementType].push(treadmillMeasurement);
}

// HR
export function updateDisconnectedHR(reason) {
  heartRateDevice = new HeartRateDevice();
  switch (reason) {
    case 'failed_connection':
      console.log("Connection to HR sensor failed. Try again.", "Heart rate sensor");
      break;
    case 'lost_connection':
      console.log("Connection to HR sensor lost. Try again.", "Heart rate sensor");
      break;
    case 'disconnected':
      console.log("Disconnected from HR sensor.", "Heart rate sensor");
      break;
    default:
      return;
  }
  heartRateConnectButton.disabled = false;
}
export function updateConnectedHR() {
  heartRateMeasurements = {};
  heartRateConnectButton.disabled = true;
}
export function updateDataHR(measurementType, heartRateMeasurement) {
  updateHRText(heartRateMeasurement.heartRate);
  if (heartRateMeasurements[measurementType] == undefined) {
    heartRateMeasurements[measurementType] = [];
  }
  heartRateMeasurements[measurementType].push(heartRateMeasurement);
}


// Functions to update the UI
export function updateVideoSpeedText(newText) {
  videoSpeedText.innerHTML = newText + 'x';
}
export function updateHRText(newText) {
  heartRateText.innerHTML = newText + ' bpm';
}
export function updateTreadmillSpeedText(newText) {
  treadmillSpeedText.innerHTML = newText + ' km/h';
}
export function updateTreadmillInclineText(newText) {
  treadmillInclineText.innerHTML = newText + ' %';
}
export function updateTreadmillTotalDistanceText(newText) {
  treadmillTotalDistanceText.innerHTML = newText + ' m';
}
export function updateTreadmillDistanceText(newText) {
  treadmillDistanceText.innerHTML = newText + ' m';
}
export function updateElevationText(newText) {
  elevationText.innerHTML = newText + ' m';
}
export function updateInclineText(newText) {
  inclineText.innerHTML = newText + ' %';
}

// Functions to update the Treadmill
export function setTreadmillIncline(newIncline) {
  treadmillDevice.increaseInclinationStep(10+newIncline, 0);
}

export async function endRoute() {
  try {
    await treadmillDevice.changeTreadmillStatus('stop');
    clearInterval(videoInterval);
  } catch (e) {
    console.log(e);
  }
}