const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

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

  console.log(coordinates)
});