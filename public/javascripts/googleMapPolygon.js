function initialize() {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(40.78013, -73.79871),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var bermudaTriangle;

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  // Define the LatLng coordinates for the polygon's path.
  var triangleCoords = [
    new google.maps.LatLng(25.774252, -80.190262),
    new google.maps.LatLng(18.466465, -66.118292),
    new google.maps.LatLng(32.321384, -64.75737),
    new google.maps.LatLng(25.774252, -80.190262)
  ];


  //Construct the polygon.
  // bermudaTriangle = new google.maps.Polygon({
  //   paths: triangleCoords,
  //   strokeColor: '#FF0000',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#FF0000',
  //   fillOpacity: 0.35
  // });

  // bermudaTriangle.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);
