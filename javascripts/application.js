var map = L.map('map').setView([51.505, -0.09], 13);

var marker = L.marker([51.5, -0.09]).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);
