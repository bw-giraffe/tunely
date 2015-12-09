/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
// var sampleAlbums = [];
// sampleAlbums.push({
//              artistName: 'Ladyhawke',
//              name: 'Ladyhawke',
//              releaseDate: '2008, November 18',
//              genres: [ 'new wave', 'indie rock', 'synth pop' ]
//            });
// sampleAlbums.push({
//              artistName: 'The Knife',
//              name: 'Silent Shout',
//              releaseDate: '2006, February 17',
//              genres: [ 'synth pop', 'electronica', 'experimental' ]
//            });
// sampleAlbums.push({
//              artistName: 'Juno Reactor',
//              name: 'Shango',
//              releaseDate: '2000, October 9',
//              genres: [ 'electronic', 'goa trance', 'tribal house' ]
//            });
// sampleAlbums.push({
//              artistName: 'Philip Wesley',
//              name: 'Dark Night of the Soul',
//              releaseDate: '2008, September 12',
//              genres: [ 'piano' ]
//            });
/* end of hard-coded data */


$(document).ready(function() {

$('form').on("submit", function (e) {
     e.preventDefault(); 
     var serializedData = $('form').serialize();
     $('form').trigger('reset');
     console.log(serializedData);
     $.post('/api/albums', serializedData, function(album) {
      console.log("you did it!");
     });
     // $.ajax({
     //    method: "POST",
     //    url: "api/albums",
     //    data: function (album){
     //      console.log("you did it!");
     //    }
     //  });
     // $('form').trigger('reset');
  })

function handleNewSongSubmit(e) {
  var albumId = $('#songModal').data('album-id');
  var songName = $('#songName').val();
  var trackNumber = $('#trackNumber').val();

  var formData = {
  name: songName,
  trackNumber: trackNumber
};


  console.log('app.js loaded!');
$.ajax({
      method: "GET",
      url: "/api/albums",
      success: function (albies) {
          albies.forEach(function (element){
          renderAlbum(element);
          console.log(albies);
        })
      }
});

$('#albums').on('click', '.add-song', function(e) {
    console.log('got your add song click!');
    var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    $('#songModal').data('album-id', id)
    $('#songModal').modal();
});

function buildSongsHtml(songs) {
    var songText = "  &ndash; ";
    songs.forEach(function(song) {
       songText = songText + "(" + song.trackNumber + ") " + song.name + " &ndash; ";
    });
    var songsHtml  =
    "                      <li class='list-group-item'>" +
    "                        <h4 class='inline-header'>Songs:</h4>" +
    "                         <span>" + songText + "</span>" +
    "                      </li>";
    return songsHtml;
}

// this function takes a single album and renders it to the page
function renderAlbum(album) {
  console.log('rendering album:', album);
  var songList = buildSongsHtml(album.songs);

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + album.artistName + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" + songList +
  
  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
                    "<button class='btn btn-primary add-song'>Add Song</button>" +
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";
    // render to the page with jQuery
  $('#albums').append(albumHtml);

}




});

// });
