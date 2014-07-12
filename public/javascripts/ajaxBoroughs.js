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
       google.maps.event.addDomListener(window, 'load', mapRefresh(data.polygons));
       var districts = createDistrictVariables(data.polygons);
       console.log("districtArray and length:", districts, districts.length);
    })
  }) //end of on queens click

});

function mapRefresh(data) {

  var mapOptions = makeMapOptions();

  var map = newMap(mapOptions);

  var districts = createDistrictVariables(data);

  for (var i = 0; i < data.length ; i++){
    var district;
    var districtCoords = PolygonCoordinatesArr(data[i]);
    district = constructPolygon(districtCoords);
    district.setMap(map);
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


//turns a district data object and turns it into proper coordinate format
function PolygonCoordinatesArr(districtObj){
  var result= [];
  var coordinates = districtObj.geometry.coordinates[0];

  //
  coordinates.forEach(function(elem){
    result.push(new google.maps.LatLng(elem[1], elem[0]));
  })

  return result;
}

//construct a polygon with the given coordinates
function constructPolygon(coordinates){
  console.log("coordinates", coordinates)
  return new google.maps.Polygon({
    paths: coordinates,
    strokeColor: 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.2,
    fillColor: '#FF0000',
  })
}

