
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var queensCoordinates = require('./coordinates/QueensDistrictCoordinates.js')
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var swig = require('swig');
var util = require('util');
var apiKeys = require('./apiKeys');
var NYTDistricts = require('./nytdistricts');
var nytAPIkey = apiKeys.nytAPIkey
var nytdistricts = new NYTDistricts(nytAPIkey);

nytdistricts.getCityCouncilDistrict(40.7115760,-73.7972060, function(err,data){
  if(err) throw err;
  console.log("my districts: ",data)
})


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// Swig Setup
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
swig.setDefaults({ cache: false });

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser()); //to receive proper data via ajax
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.get('/', routes.index);
app.get('/queens', routes.queens);
app.get('/brooklyn', routes.brooklyn);
app.get('/bronx', routes.bronx);
app.get('/manhattan', routes.manhattan);
app.get('/statenisland', routes.statenisland);

app.get('/state', routes.state)
//set up bower access on the front-end
app.use('/bower_components', express.static(__dirname + '/bower_components'));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

