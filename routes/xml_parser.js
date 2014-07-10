var fs = require('fs'),
    xml2js = require('xml2js'),
    path = require('path');

var parser = new xml2js.Parser();

// fs.readFileSync(path.join(__dirname, '../templates') + '/my-template.html', 'utf8');
fs.readFile(path.join(__dirname, '../kml')+ '/pdQueensOnCur.kml', function(err, data) {
    parser.parseString(data, function (err, result) {

        console.log('Done');
    });
});
