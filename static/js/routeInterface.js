/**
 * Module that handles all the interface for the route
 */
import { showToast } from './utils.js';
import { 
  startRouteInterval,
  stopRouteInterval
} from './routeCalculations.js';
import {
  startTreadmill,
  stopTreadmill,
  setTreadmillSpeed,
  setTreadmillIncline
} from './connectBluetooth.js';

// Elements
var connectTreadmillButton = document.getElementById('connect_treadmill_button');
var disconnectTreadmillButton = document.getElementById('disconnect_treadmill_button');
var connectHRButton = document.getElementById('connect_hr_button');
var disconnectHRButton = document.getElementById('disconnect_hr_button');

var routeControlsOverlay = document.getElementsByClassName('video_overlay_controls')[0];
var startRouteButton = document.getElementById('start_route_button');
var pauseRouteButton = document.getElementById('pause_route_button');
var fullscreenButton = document.getElementById('fullscreen_button');

var cooldownCountdownOverlay = document.getElementsByClassName('video_overlay_countdown')[0];
var cooldownCountdownText = document.getElementById('countdown_text');

var videoContainer = document.getElementsByClassName('video_container')[0];
var videoElement = document.getElementById('video');

var videoSpeedText = document.getElementById('video_speed_text');
var treadmillSpeedText = document.getElementById('treadmill_speed_text');
var treadmillInclineText = document.getElementById('treadmill_incline_text');
var treadmillTotalDistanceText = document.getElementById('treadmill_total_distance_text');
var treadmillDistanceText = document.getElementById('treadmill_distance_text');
var heartRateText = document.getElementById('hr_text');
var elevationText = document.getElementById('elevation_text');
var inclineText = document.getElementById('incline_text');

// Listeners
startRouteButton.addEventListener('click', async () => {
  // Go to fullscreen
  videoContainer.classList.add('fullscreen');
  $('html,body').scrollTop(0);
  var routeId = window.location.pathname;
  routeId = parseInt(routeId[routeId.length-1]);
  await startTreadmill();
  await startRouteInterval(routeId);
  videoElement.play();
  setTreadmillSpeed(3);
});

pauseRouteButton.addEventListener('click', async () => {
  videoElement.pause();
  await stopTreadmill();
  stopRouteInterval();
});

fullscreenButton.addEventListener('click', () => {
  videoContainer.classList.toggle('fullscreen');
});

videoElement.addEventListener('ended', () => {
  setTreadmillSpeed(3);
  setTreadmillIncline(0);
  // Cooldown
  cooldownCountdownOverlay.classList.remove('d-none');
  var timeleft = 60; // 60 second cooldown
  var countdownInterval = setInterval(async () => {
    if(timeleft <= 0){
      await stopTreadmill();
      stopRouteInterval();
      cooldownCountdownOverlay.classList.add('d-none');
      videoContainer.classList.remove('fullscreen');
      clearInterval(countdownInterval);
    }
    cooldownCountdownText.innerHTML = timeleft;
    timeleft -= 1;
  }, 1000);
});

/**
 * Function that updates the interface when treadmill connects with
 * bluetooth.
 */
export function updateInterfaceTreadmillConnected() {
  showToast('Successful connection', 'Treadmill device is connected via bluetooth.', 'success');
  connectTreadmillButton.classList.add('d-none');
  disconnectTreadmillButton.classList.remove('d-none');
  routeControlsOverlay.classList.remove('d-none');
}

/**
 * Function that updates the interface when treadmill disconnects from
 * bluetooth.
 */
 export function updateInterfaceTreadmillDisconnected() {
  showToast('Successful disconnection', 'Treadmill device has disconnected from bluetooth.', 'success');
  connectTreadmillButton.classList.remove('d-none');
  disconnectTreadmillButton.classList.add('d-none');
  routeControlsOverlay.classList.add('d-none');
}

/**
 * Function that updates the interface when treadmill connects with
 * bluetooth.
 */
 export function updateInterfaceHRConnected() {
  showToast('Successful connection', 'Heart rate device is connected via bluetooth.', 'success');
  connectHRButton.classList.add('d-none');
  disconnectHRButton.classList.remove('d-none');
}

/**
 * Function that updates the interface when treadmill disconnects from
 * bluetooth.
 */
 export function updateInterfaceHRDisconnected() {
  showToast('Successful disconnection', 'Heart rate device has disconnected from bluetooth.', 'success');
  connectHRButton.classList.remove('d-none');
  disconnectHRButton.classList.add('d-none');
}

/**
 * Function that updates the text of the treadmill speed
 */
 export function updateInterfaceTreadmillSpeedText(treadmillSpeed) {
  treadmillSpeedText.innerHTML = parseFloat(treadmillSpeed).toFixed(1) + ' km/h';
}

/**
 * Function that updates the text of the treadmill inclination
 */
 export function updateInterfaceTreadmillInclineText(treadmillIncline) {
  treadmillInclineText.innerHTML = parseFloat(treadmillIncline).toFixed(0) + ' %';
}

/**
 * Function that updates the text of the heart rate
 */
export function updateInterfaceHRText(heartRate) {
  heartRateText.innerHTML = heartRate.toFixed(0) + ' bpm';
}

/**
 * Function that updates interface from progress of video
 */
export function updateInterfaceByVideoProgress(data) {
  elevationText.innerHTML = data.elevation.toFixed(2) + ' m';
  inclineText.innerHTML = data.incline.toFixed(1) + ' %';
  treadmillTotalDistanceText.innerHTML = data.totalDistance.toFixed(0) + ' m';
  treadmillDistanceText.innerHTML = data.currentDistance.toFixed(0) + ' m';
}

/**
 * Function that updates interface of video play speed
 */
export function updateInterfaceVideoSpeed(newVideoSpeed) {
  if(newVideoSpeed < 0.0625) {
    newVideoSpeed = 0.0625;
  } else if(newVideoSpeed > 16) {
    newVideoSpeed = 16;
  }
  videoElement.playbackRate = parseFloat(newVideoSpeed);
  videoSpeedText.innerHTML = newVideoSpeed.toFixed(2) + 'x';
}

/**
 * Function that returns the current time on the video
 */
export function getVideoCurrentTime() {
  return videoElement.currentTime;
}

/**
 * Function that returns the total time on the video
 */
 export function getVideoTotalTime() {
  return videoElement.duration;
}
