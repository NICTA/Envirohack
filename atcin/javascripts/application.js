// var map = L.map('map').setView([33.8600, 151.2111], 13);


// L.circle([51.508, -0.11], 500, {
//   color: 'red',
//   fillColor: '#f03',
//   fillOpacity: 0.5
// }).addTo(map).bindPopup("I am a circle.");

// L.polygon([
//   [51.509, -0.08],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(map).bindPopup("I am a polygon.");

// L.multiPolygon(
// ).addTo(map).bindPopup("I am a polygon.");


//
// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//   .openOn(map);
// }
//
// map.on('click', onMapClick);

var map = null;
$("#submit").click(function() {
  if(map !== null)
    map.remove();
  var input = $(this.form).find("input").val();
  $.getJSON("http://envirohack.research.nicta.com.au/fsdf-topology/units/" + input, function( data ) {
    var name = data.unitName;
    var url = data.simplifiedGeometryURL;
    $.getJSON(url, function( data ) {
      var features = data.features;
      if(features){
        for(var i=0; i < features.length; i++){
          var coors = features[i].geometry.coordinates;
          var center = coors[0][0][0];
          map = L.map('map').setView(center, 8);
          L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
          }).addTo(map);
          L.marker(center).addTo(map)
           .bindPopup(name).openPopup();
          var popup = L.popup();
          L.multiPolygon(
            coors
          ).addTo(map).bindPopup(name);
        };
      };
    });
  });
  return false;
});
