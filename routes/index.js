
/*
 * GET home page.
 */

var queens = require("../coordinates/QueensCoordinates")
var util = require('util')
var OpenStates = require('openstates');



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

exports.state = function(req,res){
  var openstates = new OpenStates('e5242fc0a55f4f3ba952a7071e2c42d6');
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
