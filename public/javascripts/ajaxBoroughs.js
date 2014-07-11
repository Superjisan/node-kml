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
       google.maps.event.addDomListener(window, 'load', mapRefresh(data.queens[0]))
    })
  }) //end of on queens click

});

function mapRefresh(data) {
  var mapOptions = makeMapOptions();

  var district;

  var map = newMap(mapOptions);

  var districtCoords = PolygonCoordinatesArr(data);

  district = constructPolygon(districtCoords);

  district.setMap(map);

}

function makeMapOptions(){
  var result = {
    zoom: 11,
    center: new google.maps.LatLng(40.78013, -73.79871),
    mapTypeID: google.maps.MapTypeId.TERRAIN
  };
   return result
}

function newMap(mapOptions){
  return new google.maps.Map(document.getElementById('map-canvas'),mapOptions)
}


//turns a district data object and turns it into proper coordinate format
function PolygonCoordinatesArr(districtObj){
  var result= [];
  var coordinates = districtObj.geometry.coordinates[0]
  coordinates.forEach(function(elem){
    console.log("loop element:", elem[1], elem[0])
    result.push(new google.maps.LatLng(elem[1], elem[0]));
  })
  console.log("result coordinates:", result)
  return result
}

function constructPolygon(coordinates){
  console.log("coordinates", coordinates)
  return new google.maps.Polygon({
    paths: coordinates,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillOpacity: 0.35
  })
}

