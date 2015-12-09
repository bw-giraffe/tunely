// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
var db = require('./models');
// generate a new express app and call it 'app'
var app = express();
var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: true});

app.use(parseUrlencoded);
/************
 * DATABASE *
 ************/



/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index (req, res){
    db.Album.find({}, function(err, albums){
      if(err) {
        res.send(err);
      } else {
        console.log("you got albums");
        res.json(albums);
      }
  });
});
// app.post('/cities', parseUrlencoded, function (request, response) {
app.post('/api/albums', function create_album (req, res){
  var data = req.body;
  var genres = data.genres.split(',').map(function(item) { return item.trim(); } );
  data.genres = genres;

   db.Album.create(data, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    res.json(data);
  });
})

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
