const {nextISSTimesForMyLocation} = require('./iss_promised');

const printPassTimes = (passTime) =>{
  for (let pass of passTime) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    if (error) {
      console.log(`It didn't work!, ${error}`);
    }
    
  });
