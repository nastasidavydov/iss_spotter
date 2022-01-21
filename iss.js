const request = require('request');

const nextISSTimesForMyLocation = function(done) {

  request('https://api.ipify.org?format=json', (err, resp, body) => {
    if (err) {
      done(err, null);
      return;
    }
    
    if (resp.statusCode !== 200) {
      const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
      done(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    ///////////////////////////////////////////////////////////////////////////

    request(`https://api.freegeoip.app/json/${ip}?apikey=8672e600-7a43-11ec-b560-b13c17ddf9ca`, (err, resp, body) => {
      if (err) {
        done(err, null);
        return;
      }
      if (resp.statusCode !== 200) {
        const msg = `Status Code ${resp.statusCode} when fetching IP. Response: ${body}`;
        done(Error(msg), null);
        return;
      }
      const geoLocation = JSON.parse(body);

      //////////////////////////////////////////////////////////////////////////
      const lat = geoLocation.latitude;
      const long = geoLocation.longitude;
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
    });
  });
};

module.exports = {nextISSTimesForMyLocation};
