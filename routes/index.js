
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
  res.json(200, {queens: QueensDistrictCoordinates});
}
