// Elements
const videoElement = document.getElementById('video');
const startButton = document.getElementById('button_start');
const stopButton = document.getElementById('button_stop');
const fasterButton = document.getElementById('button_faster');
const slowerButton = document.getElementById('button_slower');
const newSpeedButton = document.getElementById('button_new_speed');
const newSpeedInput = document.getElementById('new_speed');
const videoSpeedSpan = document.getElementById('video_speed');

// Add listeners to the buttons
startButton.addEventListener('click', startVideo);
stopButton.addEventListener('click', stopVideo);
fasterButton.addEventListener('click', speedUp);
slowerButton.addEventListener('click', speedDown);
newSpeedButton.addEventListener('click', setVideoSpeed);

/**
 * Function that starts the video
 */
function startVideo() {
  videoElement.play();
}

/**
 * Function that stops the video
 */
function stopVideo() {
  videoElement.pause();
}

/**
 * Function that speeds video up
 */
function speedUp() {
  updateSpeed(videoElement.playbackRate+0.1);
}

/**
 * Function that slows video down
 */
function speedDown() {
  updateSpeed(videoElement.playbackRate-0.1);
}

/**
 * Function that sets the video speed to specific number
 */
function setVideoSpeed() {
  const newSpeed = newSpeedInput.value;
  updateSpeed(newSpeed);
}

/**
 * Function that updates the speed
 */
 function updateSpeed(value) {
  videoElement.playbackRate = value;
  videoSpeedSpan.innerText = videoElement.playbackRate+'x';
}

/**
 * Function that updates the video speed by heart rate
 * Data comes from heart rate sensor
 */
function updateVideoSpeedByHR(heartRateMeasurement) {
  var heartRate = heartRateMeasurement.heartRate;
  // We assume that HR is on range [40,200] and we convert that range to [0.0625,16]
  var newVideoSpeed = ((heartRate-40)/30)+0.0625;
  if(0.0625<=newVideoSpeed && newVideoSpeed<=16) {
    updateSpeed(newVideoSpeed.toFixed(2));
  }
}

/**
 * Function that updates the video speed by treadmill speed
 * Data comes from the treadmill in km/h
 */
function updateVideoSpeedByTreadmillSpeed(treadmillMeasurement) {
  var treadmillSpeed = treadmillMeasurement.speed;
  // We assume that video 1x is 2.38 m/s approx 8.57 km/h
  var newVideoSpeed = treadmillSpeed/8.57;
  if(0.0625<=newVideoSpeed && newVideoSpeed<=16) {
    updateSpeed(newVideoSpeed.toFixed(2));
  }
}
