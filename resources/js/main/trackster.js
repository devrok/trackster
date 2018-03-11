$(document).ready(function() {
  // clicking the search button
  $("#search-btn").click(function() {
    getInputAndSearchTracksByTitle();
  });
});

// TODO: KEYPRESS NOT WORKING
$(document).on( 'pageinit',function(event){
  $("#search-box").keydown(function(e) {
    if ((e.which || e.keyCode) == 13) {
      getInputAndSearchTracksByTitle();
    }
  });
});

function getInputAndSearchTracksByTitle() {
  var input = $("header input").val();
  Trackster.searchTracksByTitle(input);
};

const API_KEY ="903d0083304a4f424f3ff649aef0380f";

var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {

  $("#result-container").empty();

  var trackArray = getTrackArray(tracks);

  for (var i = 0; i < trackArray.length; i++) {
    var trackItem = trackArray[i];

    var number = i;
    var trackUrl = trackItem.url;
    var trackName = trackItem.name;
    var artist = trackItem.artist;
    var albumArt = getAlbumArtSource(trackItem.image);
    // TODO: STRING FORMAT NOT WORKING
    var listener = trackItem.listeners.toLocaleString("en");
    var length = "n/A";

    var trackRow = "<div class=\"row result-container-row align-items-center\">"
    + "  <a class=\"col-md-auto offset-md-1\" href=\"" + trackUrl + "\">"
    + "    <i class=\"col-md-auto offset-md-1 fa fa-play-circle-o fa-lg\"></i>"
    + "  </a>"
    + "  <span class=\"col-md-auto\">" + number +"</span>"
    + "  <span class=\"col-md-3\">" + trackName +"</span>"
    + "  <span class=\"col-md-2\">" + artist + "</span>"
    + "  <img class=\"col-md-1\" src=\"" + albumArt +"\" />"
    + "  <span class=\"col-md-1\">" + listener +"</span>"
    + "  <span class=\"col-md-1\">" + length +"</span>"
    + "</div>";

    $("#result-container").append(trackRow);
  }

};

function getTrackArray(response) {
  if (response.results !== undefined
    && response.results.trackmatches != undefined
    && response.results.trackmatches.track != undefined) {
      return response.results.trackmatches.track
  }

  return response;
};

function getAlbumArtSource(imageArray) {
  if (imageArray === undefined) {
    return "";
  }

  if (imageArray !== null && imageArray.length > 1) {
      return imageArray[1]["#text"];
  }

  return "";
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  if(title.length <= 0) return null;

  $.ajax({
    url: "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title +"&api_key=" + API_KEY +"&format=json",
    datatype: "jsonp",
    success: Trackster.renderTracks
  });
};
