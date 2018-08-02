// OSM map
var map = new ol.Map({
  target: document.getElementById('map'),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([120.58, 23.58]),
    zoom: 3
  })
});

// serach OSM
//Instantiate with some options and add the Control
var geocoder = new Geocoder('nominatim', {
  provider: 'osm',
  lang: 'en',
  placeholder: 'Search for ...',
  limit: 5,
  debug: false,
  autoComplete: true,
  keepOpen: true
});
map.addControl(geocoder);

// mouse position
var mouse_position = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326'
});
map.addControl(mouse_position);

// show image
var fileUpload = document.getElementById('fileUpload');
var canvas  = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

function readImage() {
    if ( this.files && this.files[0] ) {
        var FR= new FileReader();
        FR.onload = function(e) {
           var img = new Image();
           img.src = e.target.result;
           img.onload = function() {
             ctx.drawImage(img, 0, 0, 256, 256);
           };
        };       
        FR.readAsDataURL( this.files[0] );
    }
}

fileUpload.onchange = readImage;

canvas.onclick = function(e) {
  var x = e.offsetX;
  var y = e.offsetY;
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.arc(x, y, 5, 0, Math.PI * 2);
};

// Jquery add slide
var i = 0;
$(".butt").click(function() {
  if (i < 10) {
      $('<div style="display: none;"><button class="butt2">Untitled'+i+'</button></div>').appendTo($('.insert-links')).slideDown("fast");
      i++;
  }
});

// 側邊選單
$(document).ready(function() {
  $(".navbar-brand2").on('click', function() {
    $(".theDiv").animate({width:'toggle'},350);
  });
});