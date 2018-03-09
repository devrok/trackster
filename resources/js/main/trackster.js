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
Trackster.renderTracks = function(tracks) {

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
      console.log(data);
    }
  });
};
