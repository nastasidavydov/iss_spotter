const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=8672e600-7a43-11ec-b560-b13c17ddf9ca`);
};

const fetchISSFlyOverTimes = (body) => {
  const geoLocation = JSON.parse(body);
  const lat = geoLocation.latitude;
  const long = geoLocation.longitude;

  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`)
  
};


const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
          .then(fetchCoordsByIP)
          .then(fetchISSFlyOverTimes)
          .then((body) => {
            const { response } = JSON.parse(body);
            return response;
          })
}         
module.exports = {nextISSTimesForMyLocation};