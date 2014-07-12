
/*
 * GET home page.
 */

var queens = require("../coordinates/QueensCoordinates")
var util = require('util')

exports.index = function(req, res){
  res.render('index');
};


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
  res.json(200, {queens: QueensDistrictCoordinates, polygons : polygons, points: points});
}
