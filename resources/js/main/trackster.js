$(document).ready(function() {

  // clicking the search button
  $("#search-btn").click(function() {

    var input = $("header input").val();

    Trackster.searchTracksByTitle(input);
  });



});

const API_KEY ="903d0083304a4f424f3ff649aef0380f";

var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(trackmatches) {
  //console.log(tracks);
  // var x = tracks.length;
  // console.log(x);
  // ab hier passt was nicht
  // console.log(tracks.length);
  var tracks = trackmatches.track;

  for (var i = 0; i < tracks.length; i++) {

    var number = i;
    var trackName = tracks[i].name;
    var artist = tracks[i].artist;
    var albumArt =tracks[i].image[1]["#text"];
    var listener =tracks[i].listeners;
    var length = "n/A";

    var trackRow = "<div class=\"row result-container-row align-items-center\">"
      +"<i class=\"col-md-auto offset-md-1 fa fa-play-circle-o fa-lg\"></i>"
      +"<span class=\"col-md-auto\">" + number +"</span>"
      +"<span class=\"col-md-3\">" + trackName +"</span>"
      +"<span class=\"col-md-2\">" + artist + "</span>"
      +"<img class=\"col-md-1\" src=\"" + albumArt +"\" />"
      +"<span class=\"col-md-1\">" + listener +"</span>"
      +"<span class=\"col-md-1\">" + length +"</span>"
      +"</div>";

    $("#result-container").append(trackRow);
  }

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  if(title.length <= 0) return null;

  $.ajax({
    url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title +"&api_key=" + API_KEY +"&format=json",
    datatype: "jsonp",
    success: function(data) {
      //console.log(data);
      Trackster.renderTracks(data.results.trackmatches);
    }
  });
};
