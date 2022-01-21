const {nextISSTimesForMyLocation} = require('./iss');



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  for (let pass of passTimes) {
    let date = new Date(0);
    date.setUTCSeconds(pass.risetime);
    
    console.log(`Next pass at ${date} for ${pass.duration} seconds!`);
  }

});
