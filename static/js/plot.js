import data from '/static/recordings/Test1.json' assert { type: 'json' };

async function fetchDataAsync(url) {
  const response = await fetch(url);
  console.log(await response.json());
}

fetchDataAsync('http://localhost:3000/static/recordings/Test1.json');

let speedArr = [];
 data.treadmill.measurements.FTMS.forEach(item => {
   speedArr.push(item.speed)
 });

let distanceArr = [];
 data.treadmill.measurements.FTMS.forEach(item => {
    distanceArr.push(item.distance)
 });


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

console.log(timestamp); 
console.log(newDistance);
console.log(newSpeed);

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
    }     },
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
  
  
   const SpeedChart = new Chart(document.getElementById('SpeedChart'),config );
   const DistanceChart = new Chart(document.getElementById('DistanceChart'),config1 );


  









