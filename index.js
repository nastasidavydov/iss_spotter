const { fetchMyIP, fetchCoordsByIP , fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log(ip);
  // fetchCoordsByIP(ip, (error, coordinates) => {
  //   if (error) {
  //     console.log("It didn't work!" , error);
  //     return;
  //   }
  
  //   console.log(coordinates)
  // });
});


fetchCoordsByIP('38.34.61.218', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log(coordinates);
});

const coords = { latitude: '43.6227', longitude: '-79.3892' };

fetchISSFlyOverTimes(coords, (error, flyoverTimes) => {

  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log(flyoverTimes);
});