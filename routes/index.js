
/*
 * GET home page.
 */


var util = require('util')
var OpenStates = require('openstates');
var apiKeys = require('../apiKeys')

//coordinates
var queens = require("../coordinates/QueensCoordinates");
var bronx = require("../coordinates/BronxCoordinates");
var brooklyn = require("../coordinates/BrooklynCoordinates");
var statenisland = require("../coordinates/StatenIslandCoordinates");
var manhattan = require("../coordinates/ManhattanCoordinates");

exports.index = function(req, res){
  res.render('index');
};

//TO DO: REFACTOR
exports.queens = function(req,res){
  var QueensDistrictCoordinates = queens.data.features;
  var polygons = [];
  var points = [];
  //loop to determine if object is polygon or point
  for (var i = 0; i < QueensDistrictCoordinates.length; i++){
    if (QueensDistrictCoordinates[i].geometry.type === "Polygon"){
        polygons.push(QueensDistrictCoordinates[i])
    } else {
      points.push(QueensDistrictCoordinates[i])
    }
  }
  res.json(200, { polygons : polygons, points: points});
}

exports.brooklyn = function(req,res){
  var BrooklynDistrictCoordinates = brooklyn.data.features;
  var polygons = [];
  var points = [];
  //loop to determine if object is polygon or point
  for (var i = 0; i < BrooklynDistrictCoordinates.length; i++){
    if (BrooklynDistrictCoordinates[i].geometry.type === "Polygon"){
        polygons.push(BrooklynDistrictCoordinates[i])
    } else {
      points.push(BrooklynDistrictCoordinates[i])
    }
  }
  res.json(200, { polygons : polygons, points: points});
}

exports.bronx = function(req,res){
  var BronxDistrictCoordinates = bronx.data.features;
  var polygons = [];
  var points = [];
  //loop to determine if object is polygon or point
  for (var i = 0; i < BronxDistrictCoordinates.length; i++){
    if (BronxDistrictCoordinates[i].geometry.type === "Polygon"){
        polygons.push(BronxDistrictCoordinates[i])
    } else {
      points.push(BronxDistrictCoordinates[i])
    }
  }
  res.json(200, { polygons : polygons, points: points});
}

exports.manhattan = function(req,res){
  var ManhattanDistrictCoordinates = manhattan.data.features;
  var polygons = [];
  var points = [];
  //loop to determine if object is polygon or point
  for (var i = 0; i < ManhattanDistrictCoordinates.length; i++){
    if (ManhattanDistrictCoordinates[i].geometry.type === "Polygon"){
        polygons.push(ManhattanDistrictCoordinates[i])
    } else {
      points.push(ManhattanDistrictCoordinates[i])
    }
  }
  res.json(200, { polygons : polygons, points: points});
}

exports.statenisland = function(req,res){
  var StatenIslandDistrictCoordinates = statenisland.data.features;
  var polygons = [];
  var points = [];
  //loop to determine if object is polygon or point
  for (var i = 0; i < StatenIslandDistrictCoordinates.length; i++){
    if (StatenIslandDistrictCoordinates[i].geometry.type === "Polygon"){
        polygons.push(StatenIslandDistrictCoordinates[i])
    } else {
      points.push(StatenIslandDistrictCoordinates[i])
    }
  }
  res.json(200, { polygons : polygons, points: points});
}

exports.state = function(req,res){
  var openstates = new OpenStates(apiKeys.openstatesAPIkeyrs);
  // openstates.geoLookup(40.7115760,-73.7972060, function(err, data) {
  //   if(err){console.log(err)}
  //   else{
  //     console.log(data)
  //   }
  // });
  // openstates.districtSearch('ny', 'upper', function(err, data){
  //   if(err) {console.log(err)}
  //   else {
  //     console.log(data)
  //   }
  // });
    openstates.districtBoundary('sldl/ny-24', function(err, data){
      if (err) {console.log(err)}
      else{
        console.log(util.inspect(data.shape[0]));
      }
    })
}
