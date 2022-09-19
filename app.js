// devices
let heartRateDevice = new HeartRateDevice();
let treadmillDevice = new TreadmillDevice();

// Elements
const heartRateConnectButton = document.getElementById('connect_hr');
const heartRateDisconnectButton = document.getElementById('disconnect_hr');
const heartRateText = document.getElementById('hr_text');

const treadmillConnectButton = document.getElementById('connect_treadmill');
const treadmillDisconnectButton = document.getElementById('disconnect_treadmill');
const treadmillSpeedText = document.getElementById('treadmill_speed_text');
const treadmillInclineText = document.getElementById('treadmill_incline_text');
const treadmillDistanceText = document.getElementById('treadmill_distance_text');
const treadmillControls = document.getElementById('control_treadmill');
const treadmillStartButton = document.getElementById('start_treadmill');
const treadmillStopButton = document.getElementById('stop_treadmill');
const treadmillSetSpeedButton = document.getElementById('button_new_treadmill_speed');
const treadmillSpeedInput = document.getElementById('new_treadmill_speed');
const treadmillSetInclineButton = document.getElementById('button_new_treadmill_incline');
const treadmillInclineInput = document.getElementById('new_treadmill_incline');

// Variables
var heartRateMeasurements = {};
var treadmillMeasurements = {};

// Listeners
heartRateConnectButton.addEventListener('click', function () {
  try {
    heartRateDevice.connect();
  } catch(error) {
    console.log(error);
  }
});
heartRateDisconnectButton.addEventListener('click', function () {
  heartRateDevice.disconnect();
});
treadmillConnectButton.addEventListener('click', async function () {
  try {
    await treadmillDevice.connect();
  } catch(error) {
    console.log(error);
  }
});
treadmillDisconnectButton.addEventListener('click', function () {
  treadmillDevice.disconnect();
});
treadmillStartButton.addEventListener('click', async function () {
  try {
    await treadmillDevice.changeTreadmillStatus('start');
  } catch(e) {
    console.log(e);
  }
});
treadmillStopButton.addEventListener('click', async function () {
  try {
    await treadmillDevice.changeTreadmillStatus('stop');
  } catch(e) {
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

// HR
function updateDisconnectedHR(reason) {
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
function updateConnectedHR() {
  heartRateMeasurements = {};
  heartRateConnectButton.disabled = true;
}
function updateDataHR(measurementType, heartRateMeasurement) {
  heartRateText.innerHTML = `HR: ${heartRateMeasurement.heartRate} bpm`;
  if (heartRateMeasurements[measurementType] == undefined) {
    heartRateMeasurements[measurementType] = [];
  }
  heartRateMeasurements[measurementType].push(heartRateMeasurement);
}

// Treadmill
function updateDisconnectedTreadmill(reason) {
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
function updateConnectedTreadmill() {
  treadmillMeasurements = {};
  treadmillConnectButton.disabled = true;
  treadmillControls.classList.remove('d-none');
}
function updateDataTreadmill(measurementType, treadmillMeasurement) {
  treadmillSpeedText.innerHTML = `Speed: ${treadmillMeasurement.speed} km/h`;
  treadmillInclineText.innerHTML = `Incline: ${treadmillMeasurement.inclination} %`;
  treadmillDistanceText.innerHTML = `Distance: ${treadmillMeasurement.distance} m`;
  if (treadmillMeasurements[measurementType] == undefined) {
    treadmillMeasurements[measurementType] = [];
  }
  treadmillMeasurements[measurementType].push(treadmillMeasurement);  
}
