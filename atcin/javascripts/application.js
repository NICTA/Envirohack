// var map = L.map('map').setView([33.8600, 151.2111], 13);
var map = L.map('map').setView([-34.320178992999956,150.92623500800005], 9);

L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
}).addTo(map);


// L.marker([51.5, -0.09]).addTo(map)
// L.marker([-34.320178992999956,150.92623500800005]).addTo(map)
//  .bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();

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


var popup = L.popup();
//
// function onMapClick(e) {
//   popup
//     .setLatLng(e.latlng)
//     .setContent("You clicked the map at " + e.latlng.toString())
//   .openOn(map);
// }
//
// map.on('click', onMapClick);

$("#submit").click(function() {
  var input = $(this.form).find("input").val();
  $.getJSON("http://envirohack.research.nicta.com.au/fsdf-topology/units/" + input, function( data ) {
    var name = data.unitName;
    var url = data.simplifiedGeometryURL;
    $.getJSON(url, function( data ) {
      var features = data.features;
      if(features){
        console.log(features.length);
        for(var i=0; i < features.length; i++){
          var coors = features[i].geometry.coordinates;
          L.multiPolygon(
            coors
          ).addTo(map).bindPopup(name);
        };
      };
    });
  });
  return false;
});
