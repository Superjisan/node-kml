
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

//create a http server on port 8000
http.createServer(function (req, res) {
    //tell the client the document is XML
    res.writeHead(200, {'Content-Type': 'text/xml'});
    //read our template file
    fs.readFile('template.ejs', 'utf8', function (err, template) {
        //render our template file with the included varables to change
        var content = ejs.render(template,{
            name:"test name",
            description:"this is the description",
            coordinates:"-122.0822035425683,37.42228990140251,0"
        });
        res.write(content);
        res.end()
    });

    //write the rendered template to the client

    }).listen(8000);

console.log('Server listening at at http://localhost:8000/');
