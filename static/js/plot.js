import { getRecordingById } from './dataFetch.js';

var parameters = window.location.pathname.split('/');
var id = parameters[parameters.length - 1];

var jsonO = await getRecordingById(id);
var data = jsonO.recording;

// Read the data from the recording
var speedArr = [];
var speedTimeArr = [];
data.treadmill.measurements?.FTMS?.forEach(item => {
  speedArr.push({
    'x': item.time,
    'y': item.speed
  });
  speedTimeArr.push(item.time);
});

var distArr = [];
var distTimeArr = [];
data.treadmill.measurements?.FTMS?.forEach(item => {
  distArr.push({
    'x': item.time,
    'y': item.distance
  });
  distTimeArr.push(item.time);
});

var hrArr = [];
var hrTimeArr = [];
data.hr.measurements?.HR?.forEach(item => {
  hrArr.push({
    'x': item.time,
    'y': item.heartRate
  });
  hrTimeArr.push(item.time);
});

var treadmillInclineArr = [];
var treadmillInclineTimeArr = [];
data.treadmill.measurements?.FTMS?.forEach(item => {
  treadmillInclineArr.push({
    'x': item.time,
    'y': parseFloat(item.inclination)-10.0
  });
  treadmillInclineTimeArr.push(item.time);
});

var realInclineArr = [];
var realInclineTimeArr = [];
data.routeData.dataPoints?.forEach(item => {
  realInclineArr.push({
    'x': item.timestamp,
    'y': item.incline
  });
  realInclineTimeArr.push(item.timestamp);
});


// Fix the time stamps
var newSpeedTime = [];
for(var i = 0; i < speedTimeArr.length; i++) {
  newSpeedTime.push(((speedTimeArr[i] - speedTimeArr[0])/1000).toFixed(0));
}
var newDistTime = [];
for(var i = 0; i < distTimeArr.length; i++) {
  newDistTime.push(((distTimeArr[i] - distTimeArr[0])/1000).toFixed(0));
}
var newHRTime = [];
for(var i = 0; i < hrTimeArr.length; i++) {
  newHRTime.push(((hrTimeArr[i] - hrTimeArr[0])/1000).toFixed(0));
}
var newTreadmillInclineTime = [];
for(var i = 0; i < treadmillInclineTimeArr.length; i++) {
  newTreadmillInclineTime.push(((treadmillInclineTimeArr[i] - treadmillInclineTimeArr[0])/1000).toFixed(0));
}
var newRealInclineTime = [];
for(var i = 0; i < realInclineTimeArr.length; i++) {
  newRealInclineTime.push(((realInclineTimeArr[i] - realInclineTimeArr[0])/1000).toFixed(0));
}

///////////////////////////////////////////////////////////////

// Speed graph
const Speed = {
  labels: newSpeedTime,
  datasets: [{
    label: 'Speed',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    pointRadius: 0,
    data: speedArr,
  }]
};
const configSpeed = {
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
          text: 'Speed (km/h)'
        }
      }
    }
  },
};

// Distance graph
const Distance = {
  labels: newDistTime,
  datasets: [{
    label: 'Distance',
    backgroundColor: 'rgb(50, 205, 50)',
    borderColor: 'rgb(50, 205, 50)',
    pointRadius: 0,
    data: distArr,
  }]
};
const configDist = {
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

// HR graph
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

// Add the graphs to the canvas
const SpeedChart = new Chart(document.getElementById('SpeedChart'), configSpeed);
const DistanceChart = new Chart(document.getElementById('DistanceChart'), configDist);
const HeartRateChart = new Chart(document.getElementById('HeartRateChart'), configHR);

// COMPARISON GRAPHS

// Incline comparison graph
const inclineComparison1 = {
  labels: newTreadmillInclineTime,
  datasets: [{
    label: 'Treadmill incline',
    backgroundColor: 'rgb(50, 50, 205)',
    borderColor: 'rgb(50, 50, 205)',
    pointRadius: 0,
    data: treadmillInclineArr,
  }]
};
const configInclineComparison1 = {
  type: 'line',
  data: inclineComparison1,
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
          text: 'Incline (%)'
        }
      }
    }     
  },
};

const inclineComparison2 = {
  labels: newRealInclineTime,
  datasets: [{
    label: 'Route incline',
    backgroundColor: 'rgb(205, 50, 50)',
    borderColor: 'rgb(205, 50, 50)',
    pointRadius: 0,
    data: realInclineArr,
  }]
};
const configInclineComparison2 = {
  type: 'line',
  data: inclineComparison2,
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
          text: 'Incline (%)'
        }
      }
    }     
  },
};
console.log(treadmillInclineArr);
console.log(realInclineArr);

const inclineComparison = {
  labels: newRealInclineTime,
  datasets: [{
    label: 'Treadmill incline',
    backgroundColor: 'rgb(50, 50, 205)',
    borderColor: 'rgb(50, 50, 205)',
    pointRadius: 0,
    data: treadmillInclineArr,
  },{
    label: 'Route incline',
    backgroundColor: 'rgb(205, 50, 50)',
    borderColor: 'rgb(205, 50, 50)',
    pointRadius: 0,
    data: realInclineArr,
  }]
};
const configInclineComparison = {
  type: 'line',
  data: inclineComparison,
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
          text: 'Incline (%)'
        }
      }
    }     
  },
};

// Comparisons
const inclineComparisonChart1 = new Chart(document.getElementById('inclineComparisonChart1'), configInclineComparison1);
const inclineComparisonChart2 = new Chart(document.getElementById('inclineComparisonChart2'), configInclineComparison2);
const inclineComparisonChart = new Chart(document.getElementById('inclineComparisonChart'), configInclineComparison);
