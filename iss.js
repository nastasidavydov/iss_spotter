const request = require('request');


const fetchMyIP = function(done) {
  
  request('https://api.ipify.org?format=json', (err, resp, body) => {
    if (err) {
      done(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      done(Error(msg), null);
      return;
    }

    const myIP = JSON.parse(body);
    done(null, myIP.ip);
  });
};


const fetchCoordsByIP = function(ip, done) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=8672e600-7a43-11ec-b560-b13c17ddf9ca`, (err, resp, body) => {
    if (err) {
      done(err, null);
      return;
    }
    // if non-200 status, assume server error
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      done(Error(msg), null);
      return;
    }
    const geoLocation = JSON.parse(body);
    const coordinates = {latitude: geoLocation.latitude, longitude: geoLocation.longitude};
    done(null, coordinates);
  });
};

const fetchISSFlyOverTimes = (coordinates, done) => {
  const lat = coordinates.latitude;
  const long = coordinates.longitude;
  
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`, (err, resp, body) => {

    if (err) {
      done(err, null);
      return;
    }

    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      done(Error(msg), null);
    }

    const flyoverTimes = JSON.parse(body).response;
    done(null, flyoverTimes);

  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
