var map, geocoder, inWhichDistrict;


$(function(){
  //on queens click
  $("#queens").on("click", function(e){
    e.preventDefault();

    $.ajax({
      context: $("#map-canvas"),
      type: 'GET',
      content: 'application/json',
      url: 'http://localhost:3000/queens'
    }).done(function(data){
       console.log("data from the server:", data);
       google.maps.event.addDomListener(window, 'load', mapRefresh(data.polygons, data.points));
     })
  }) //end of on queens click

  $("#brooklyn").on("click", function(e){
    e.preventDefault();

    $.ajax({
      context: $("#map-canvas"),
      type: 'GET',
      content: 'application/json',
      url: 'http://localhost:3000/brooklyn'
    }).done(function(data){
       console.log("data from the server:", data);
       google.maps.event.addDomListener(window, 'load', mapRefresh(data.polygons, data.points));
     })
  }) //end of on brooklyn click

  $("#manhattan").on("click", function(e){
    e.preventDefault();

    $.ajax({
      context: $("#map-canvas"),
      type: 'GET',
      content: 'application/json',
      url: 'http://localhost:3000/manhattan'
    }).done(function(data){
       console.log("data from the server:", data);
       google.maps.event.addDomListener(window, 'load', mapRefresh(data.polygons, data.points));
     })
  }) //end of on brooklyn click

  $("#bronx").on("click", function(e){
    e.preventDefault();

    $.ajax({
      context: $("#map-canvas"),
      type: 'GET',
      content: 'application/json',
      url: 'http://localhost:3000/bronx'
    }).done(function(data){
       console.log("data from the server:", data);
       google.maps.event.addDomListener(window, 'load', mapRefresh(data.polygons, data.points));
     })
  }) //end of on brooklyn click

  $("#statenisland").on("click", function(e){
    e.preventDefault();

    $.ajax({
      context: $("#map-canvas"),
      type: 'GET',
      content: 'application/json',
      url: 'http://localhost:3000/statenisland'
    }).done(function(data){
       console.log("data from the server:", data);
       google.maps.event.addDomListener(window, 'load', mapRefresh(data.polygons, data.points));
     })
  }) //end of on brooklyn click
});



//refreshes the map after ajax request is completed with server data
function mapRefresh(polygonData, pointData) {

  var mapOptions = makeMapOptions();

  map = newMap(mapOptions);
  geocoder = new google.maps.Geocoder()

  var districts = [];

  var district;
  //construct all distrcits
  for (var i = 0; i < polygonData.length ; i++){
    setPolygonToMap(polygonData[i], i);
  }

  function setPolygonToMap(polygonObj, index) {

      var districtCoords = PolygonCoordinatesArr(polygonObj);
      var districtNum = polygonObj.properties.name;

      districts[index] = constructPolygon(districtCoords);
      districts[index].setMap(map);

      google.maps.event.addListener(districts[index], 'click', function(e) {
        if (google.maps.geometry.poly.containsLocation(e.latLng, districts[index])) {
          inWhichDistrict = districtNum;
          console.log("inWhichDistrict: ",inWhichDistrict)
        } else {
          console.log("not in any district")
        }
     })
  }


  //construct all district labels
  for (var j = 0; j < pointData.length; j++){
    var point;
    var pointCoords = pointCoordinates(pointData[j]);
    var districtNum = pointData[j].properties.name;
    createPoint(pointCoords, map, districtNum)
  }
}



//construct variables to use in map later
function createDistrictVariables(data){
  var districts = [];

  for(var i = 0; i < data.length; i++){
    var districtName = data[i].properties.name
    districts[i] = "district" + districtName;
  }
  return districts
}

// a function to return the initial map attributes
function makeMapOptions(){
  var result = {
    zoom: 10,
    center: new google.maps.LatLng(40.78013, -73.79871),
    mapTypeID: google.maps.MapTypeId.TERRAIN
  };
   return result
}

//returns a new map
function newMap(mapOptions){
  return new google.maps.Map(document.getElementById('map-canvas'),mapOptions)
}


//get the coordinates of the district point flag
function pointCoordinates(pointObj){
  var result;

  var coordinates = pointObj.geometry.coordinates;
  result = new google.maps.LatLng(coordinates[1], coordinates[0]);
  return result
};

function createImage(districtNum){

  var img = {url: "http://google-maps-icons.googlecode.com/files/red"+districtNum+".png",
             size: new google.maps.Size(27,27),
             origin: new google.maps.Point(0,0),
             anchor: new google.maps.Point(0,27)
            }
  return img
}

function createPoint(LatLng, map, districtNum){
  var marker = new google.maps.Marker({
    position: LatLng,
    map: map,
    icon: createImage(districtNum),
    zIndex: 4,
  })
}

//turns a district data object and turns it into proper coordinate format
function PolygonCoordinatesArr(districtObj){
  var result= [];
  var coordinates = districtObj.geometry.coordinates[0];

  //set each coordinate border
  coordinates.forEach(function(elem){
    result.push(new google.maps.LatLng(elem[1], elem[0]));
  })
  return result;
}



//construct a polygon with the given coordinates
function constructPolygon(coordinates){
  var randomColor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
  return new google.maps.Polygon({
    paths: coordinates,
    strokeColor: randomColor,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.2,
    fillColor: randomColor,
  })
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    console.log("results", results)
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

