var fs = require('fs'),
    xml2js = require('xml2js'),
    path = require('path'),
    util = require('util');

var parser = new xml2js.Parser();

// fs.readFileSync(path.join(__dirname, '../templates') + '/my-template.html', 'utf8');
fs.readFile(path.join(__dirname, '../kml')+ '/pdQueensOnCur.kml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log("19th District Coordinates:", result.kml.Document[0].Folder[0].Placemark[0].Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates)
        //Placemark is where disctricts coordinates are located
        var DistrictArray = result.kml.Document[0].Folder[0].Placemark;
        var coordinatesArray = [];
        DistrictArray.forEach(function(elem){
          var result = {};
          var name = elem.name[0];
          var coordinates = elem.Polygon[0].outerBoundaryIs[0].LinearRing[0].coordinates;
          result.name = name;
          result.coordinates = coordinates;
          coordinatesArray.push(result)
        })
        console.log("coordinatesArray:", coordinatesArray)


        console.log('Done');
        // var wholeData = util.inspect(result, false, null)
        // fs.writeFile('QueensKml.js', wholeData, function (err) {
        //   if (err) throw err;
        //   console.log('It\'s saved!');
        // });
        var wholeCoordinatesData = util.inspect(coordinatesArray, false, null)
        fs.writeFile('QueensCoordinates.js', wholeCoordinatesData, function (err) {
          if (err) throw err;
          console.log('It\'s saved!');
        });
    });
});
