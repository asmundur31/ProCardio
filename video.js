// Get elements on 
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
newSpeedButton.addEventListener('click', setVideoSpeed)
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
