var qs      = require('querystring'),
    request = require('request');

var NYTDistricts = module.exports = function(apiKey){
  if (!(this instanceof NYTDistricts)){ return new NYTDistricts(apiKey)}
  if(!apiKey) throw new Error('Must provide API Key');
  this.key = apiKey
}

NYTDistricts.prototype.makeRequest = function(lattitude, longitude, callback) {
  // creates and executes an HTTP request
  if (typeof callback != 'function') {
    throw new Error('callback must be a function');
  }
  var options = this.createOptions(lattitude, longitude, this.key);
  return this.executeRequest(options, callback);
};

NYTDistricts.prototype.createOptions = function(lattitude, longitude, key) {
  // generates the options for the http request from the method, params, and key

  var url  = 'http://api.nytimes.com/svc/politics/v2/districts.json?&lat='+lattitude+'&lng='+longitude+'&api-key='+key;
  console.log("request to url:", url)
  return {
    url: 'http://api.nytimes.com/svc/politics/v2/districts.json?&lat='+lattitude+'&lng='+longitude+'&api-key='+key,
    agent: false,
    headers: {
      "User-Agent": "Mozilla/4.0 (compatible; sunlight node.js client)",
      "Content-type": "application/x-www-form-urlencoded"
    }
  };
};

NYTDistricts.prototype.executeRequest = function(options, callback) {
  // executes the HTTP request with the given options

  request(options, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      callback(null, JSON.parse(body));
    } else {
      callback(new Error('Request failed with ' + res.statusCode));
    }
  });
};

//look up all of the districts that the location is
NYTDistricts.prototype.getDistricts = function(lat, long, callback){
  this.makeRequest(lat,long, callback)
}

