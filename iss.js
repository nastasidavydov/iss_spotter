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

module.exports = { fetchMyIP };
