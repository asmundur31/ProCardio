import { getRecordingById } from './dataFetch.js';

var parameters = window.location.pathname.split('/');
var id = parameters[parameters.length - 1];

var jsonO = await getRecordingById(id);
var data = jsonO.recording;


let speedArr = [];
data.treadmill.measurements?.FTMS?.forEach(item => {
  speedArr.push(item.speed)
});

let distanceArr = [];
data.treadmill.measurements?.FTMS?.forEach(item => {
  distanceArr.push(item.distance)
});

let hrArr = [];
let hrTimeArr = [];
data.hr.measurements?.HR?.forEach(item => {
  hrArr.push(item.heartRate);
  hrTimeArr.push(item.time);
});

var newHRTime = [];
for(var i = 0; i < hrTimeArr.length; i++) {
  newHRTime.push((hrTimeArr[i] - hrTimeArr[0])/1000);
}

var newSpeed = JSON.parse("[" + speedArr.join() + "]");
//Remove the quotation mark from orignal speed data

//let newDistance = distanceArr.slice(0,6)

var newDistance = [];
for(var i = 0; i < distanceArr.length; i++) {

  // Decrement the value of the original speed and push it to the new one
  newDistance.push(distanceArr[i] - distanceArr[0]);
}


const timestamp = [];

for (let i = 0; i < speedArr.length; i++) {
  timestamp.push(i*2);
}

///////////////////////////////////////////////////////////////

const Speed = {
  labels: timestamp,
  datasets: [{
    label: 'Speed',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    pointRadius: 0,
    data: newSpeed,
  }]
};

const config = {
  type: 'line',
  data: Speed,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Speed (m/s)'
        }
      }
    }
  },
};

const Distance = {
  labels: timestamp,
  datasets: [{
    label: 'Distance',
    backgroundColor: 'rgb(50, 205, 50)',
    borderColor: 'rgb(50, 205, 50)',
    pointRadius: 0,
    data: newDistance,
  }]
};

const config1 = {
  type: 'line',
  data: Distance,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Distance (m)'
        }
      }
    }     
  },
};

const HR = {
  labels: newHRTime,
  datasets: [{
    label: 'Heart Rate',
    backgroundColor: 'rgb(50, 50, 205)',
    borderColor: 'rgb(50, 50, 205)',
    pointRadius: 0,
    data: hrArr,
  }]
};

const configHR = {
  type: 'line',
  data: HR,
  options: {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Heart Rate (bpm)'
        }
      }
    }     
  },
}

const SpeedChart = new Chart(document.getElementById('SpeedChart'), config);
const DistanceChart = new Chart(document.getElementById('DistanceChart'), config1);
const HeartRateChart = new Chart(document.getElementById('HeartRateChart'), configHR);


  









