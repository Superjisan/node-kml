
/*
 * GET home page.
 */

var queens = require("../coordinates/QueensDistrictCoordinates")
var util = require('util')

exports.index = function(req, res){
  res.render('index');
};


exports.queens = function(req,res){
  var QueensDistrictCoordinates = queens.data;
  res.json(200, {queens: QueensDistrictCoordinates});
}
