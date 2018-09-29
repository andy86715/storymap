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
var i = 1;
var pool = {}
var status = 'btn0'
var clickEvent = function () {
  var id = $(this).attr('id')
  $('#' + status).css('background', '#fff')
  $(this).css('background', '#999')

  pool[status] = {
    url: $('#url').val(),
    // canvas: $('#canvas').val(),
    credit: $('#Credit').val(),
    caption :$('#Caption').val(),
    title: $('#title').val(),
    message: $('#msg').val()
  }

  // console.log(JSON.stringify(pool))

  status = id
  if (typeof pool[status] !== 'object') {
    pool[status] = {
      url: '',
      // canvas: '',
      credit: '',
      caption: '',
      title: '',
      message: ''
    }
  }

  $('#url').val(pool[status].url)
  // $('#canvas').val(pool[status].canvas)
  $('#Credit').val(pool[status].credit)
  $('#Caption').val(pool[status].caption)
  $('#title').val(pool[status].title)
  $('#msg').val(pool[status].message)
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

$("#btn-submit").click(function() {
  pool[status] = {
    url: $('#url').val(),
    // canvas: $('#canvas').val(),
    credit: $('#Credit').val(),
    caption :$('#Caption').val(),
    title: $('#title').val(),
    message: $('#msg').val()
  }

  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pool));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "result.json");
  dlAnchorElem.click();

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
