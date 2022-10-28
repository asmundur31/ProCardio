/**
 * This module handles all connections via bluetooth to all devices.
 */
import TreadmillDevice from './treadmillDevice.js';
import HeartRateDevice from './hrDevice.js';
import { 
  updateInterfaceTreadmillConnected,
  updateInterfaceTreadmillDisconnected,
  updateInterfaceHRConnected,
  updateInterfaceHRDisconnected,
  updateInterfaceTreadmillSpeedText,
  updateInterfaceTreadmillInclineText,
  updateInterfaceHRText,
  updateInterfaceVideoSpeed
} from './routeInterface.js';
import { getVideoSpeedUnit } from './routeCalculations.js';

// Devices
let treadmillDevice = new TreadmillDevice();
let heartRateDevice = new HeartRateDevice();

// Variables for recording data
var recordInterval;
var recordIntervalTime = 500;
var isRecording = false;

// Measurments
var treadmillMeasurements = {};
var heartRateMeasurements = {};
var routeData = {};

// Elements
var connectTreadmillButton = document.getElementById('connect_treadmill_button');
var disconnectTreadmillButton = document.getElementById('disconnect_treadmill_button');
var connectHRButton = document.getElementById('connect_hr_button');
var disconnectHRButton = document.getElementById('disconnect_hr_button');

// Set listeners
connectTreadmillButton.addEventListener('click', connectTreadmill);
disconnectTreadmillButton.addEventListener('click', disconnectTreadmill);
connectHRButton.addEventListener('click', connectHR);
disconnectHRButton.addEventListener('click', disconnectHR);

// Listeners
async function connectTreadmill() {
  try {
    // Connect to treadmill
    //await treadmillDevice.connect();
    // Update interface after treadmill connected
    updateInterfaceTreadmillConnected();
  } catch (error) {
    console.log(error);
  }
}

function disconnectTreadmill() {
  treadmillDevice.disconnect();
  updateInterfaceTreadmillDisconnected();
}

async function connectHR() {
  try {
    await heartRateDevice.connect();
    updateInterfaceHRConnected();
  } catch (error) {
    console.log(error);
  }
}

function disconnectHR() {
  heartRateDevice.disconnect();
  updateInterfaceHRDisconnected();
}

// Functions
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
}
export function updateConnectedTreadmill() {
  treadmillMeasurements = {};
}
export function updateDataTreadmill(measurementType, treadmillMeasurement) {
  updateInterfaceTreadmillSpeedText(treadmillMeasurement.speed);
  updateInterfaceTreadmillInclineText(treadmillMeasurement.inclination);
  if(treadmillMeasurements[measurementType] == undefined) {
    treadmillMeasurements[measurementType] = [];
  }
  treadmillMeasurements[measurementType].push(treadmillMeasurement);
}

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
}
export function updateConnectedHR() {
  heartRateMeasurements = {};
}
export function updateDataHR(measurementType, heartRateMeasurement) {
  updateInterfaceHRText(heartRateMeasurement.heartRate);
  if (heartRateMeasurements[measurementType] == undefined) {
    heartRateMeasurements[measurementType] = [];
  }
  heartRateMeasurements[measurementType].push(heartRateMeasurement);
}

// Functions to control the treadmill
/**
 * Function that sets the incline on the treadmill
 */
export function setTreadmillIncline(newIncline) {
  console.log('Update incline on treadmill to '+newIncline);
  treadmillDevice.increaseInclinationStep(10+newIncline, 0);
}

/**
 * Function that sets the speed on the treadmill
 */
 export function setTreadmillSpeed(newSpeed) {
  console.log('Update speed on treadmill to '+newSpeed);
  treadmillDevice.increaseSpeedStep(newSpeed, 0);
}

/**
 * Function that starts the treadmill
 */
export async function startTreadmill() {
  try {
    await treadmillDevice.changeTreadmillStatus('start');
  } catch (e) {
    console.log(e);
  }
}

/**
 * Function that stops the treadmill
 */
 export async function stopTreadmill() {
  try {
    await treadmillDevice.changeTreadmillStatus('stop');
  } catch (e) {
    console.log(e);
  }
}

/**
 * Function that updates the video speed by treadmill speed
 */
 export function updateVideoSpeedByTreadmillSpeed(treadmillMeasurement) {
  var treadmillSpeed = treadmillMeasurement.speed;
  var videoSpeedUnit = getVideoSpeedUnit();
  var newVideoSpeed = treadmillSpeed/videoSpeedUnit;
  updateInterfaceVideoSpeed(newVideoSpeed);
}
/*
// Loop functions to record data
function startRecordLoop() {
  if(!recordInterval) {
    recordInterval = setInterval(updateRecording, recordIntervalTime);
  }
}
function stopRecordLoop() {
  clearInterval(recordInterval);
  recordInterval = null;
}

function updateRecording() {
  // Check if at least one device is connected
  if(treadmillDevice.device === null && heartRateDevice.device === null) {
    stopRecordLoop();
    return;
  }
  //
}
*/

// Get mesurement data
export function getMeasurementsData() {
  console.log(treadmillMeasurements);
  console.log(heartRateMeasurements);
}
