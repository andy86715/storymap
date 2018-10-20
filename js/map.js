// 運用ajax把pool這個json轉到另一隻PHP檔案，在存入到server上

// OSM map
var map = new ol.Map({
  target: document.getElementById('map'),
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: coord,
    zoom: 3
  })
});

// popup
var popup = new ol.Overlay.Popup();
map.addOverlay(popup);

var lat = 0
var lon = 0
var coord = [14016534.760885669, 2458443.6735774893]
map.on('dblclick', function(evt) {
    var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
    popup.show(evt.coordinate, '<div>' + prettyCoord + '</div>');
    lat = map.getView().getCenter()[0];
    lon = map.getView().getCenter()[1];
    coord = evt.coordinate
    console.log(lat)
    console.log(lon)
    console.log('dbclick')
});

// search OSM
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
var i = 1;
var pool = {}
var status = 'btn0'
var clickEvent = function () {
  var id = $(this).attr('id')
  $('#' + status).css('background', '#fff')
  $(this).css('background', '#999')

  pool[status] = {
    url: $('#url').val(),
    credit: $('#Credit').val(),
    caption :$('#Caption').val(),
    title: $('#title').val(),
    message: $('#msg').val(),
    lat: lat,
    lon: lon,
    coord: coord
  }
  console.log(lat)
  console.log(lon)
  console.log('click')


  status = id
  if (typeof pool[status] !== 'object') {
    pool[status] = {
      url: '',
      credit: '',
      caption: '',
      title: '',
      message: '',
      lat: 0,
      lon: 0,
      coord: [14016534.760885669, 2458443.6735774893]
    }
  }

  $('#url').val(pool[status].url)
  $('#Credit').val(pool[status].credit)
  $('#Caption').val(pool[status].caption)
  $('#title').val(pool[status].title)
  $('#msg').val(pool[status].message)
  lat = pool[status].lat
  lon = pool[status].lon
  coord = pool[status].coord

  console.log(lat)
  console.log(lon)
  console.log('clicked')

  map.setView(new ol.View({
    center: coord,
    zoom: 3
  }))

  if (lat !== 0 && lon !== 0) {
    var prettyCoord = ol.coordinate.toStringHDMS(ol.proj.transform(coord, 'EPSG:3857', 'EPSG:4326'), 2);
    popup.show(coord, '<div>' + prettyCoord + '</div>');
  }
}

$('#btn0').click(clickEvent)
$('#btn0').click()

$(".butt").click(function() {
  if (i < 10) {
    $('<button>').attr({
      id: 'btn' + i,
      class: 'butt2'
    }).text('Untitled' + i).click(clickEvent).appendTo($('.insert-links')).slideDown("fast");
      i++;
  }
});

$("#btn-submit").click(function(e) {
  e.preventDefault();
  pool[status].url = $('#url').val(),
  pool[status].credit =  $('#Credit').val(),
  pool[status].caption = $('#Caption').val(),
  pool[status].title = $('#title').val(),
  pool[status].message = $('#msg').val()
  console.log(pool);
  // var jsonString = JSON.stringify(pool);
  //    $.ajax({
  //         type: "POST",
  //         url: "/storymap_fronted/php/outjson.php",
  //         data: jsonString, 
  //         cache: false
  //     });
});


// 側邊選單
$(document).ready(function() {
  $(".navbar-brand2").on('click', function() {
    $(".theDiv").animate({width:'toggle'},350);
  });
});
