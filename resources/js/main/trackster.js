$(document).ready(function() {
  // clicking the search button
  $("#search-btn").click(function() {
    getInputAndSearchTracksByTitle();
  });

  $("th").click(function() {
    var index = $(this).index();
    console.log(index);
    var sorted = sortedByIndex(index);
    $("#result-rows").empty();
    $("#result-rows").append(sorted);
  });

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
  $("#result-rows").empty();

  var trackArray = getTrackArray(tracks);

  for (var i = 0; i < trackArray.length; i++) {
    $("#title-text").toggleClass("newColor");

    var trackRow = createTrackRow(trackArray[i], i);
    $("#result-rows").append(trackRow);

  }
  $("#title-text").removeClass("newColor");

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

function createTrackRow(trackItem, i) {
  var number = i + 1;
  var trackUrl = trackItem.url;
  var trackName = trackItem.name;
  var artist = trackItem.artist;
  var albumArt = getAlbumArtSource(trackItem.image);
  var listener = numeral(trackItem.listeners);
  var length = "n/A";

  return "<tr>"
  + "  <td></td>"
  + "  <td>"
  + "    <a href=\"" + trackUrl + "\">"
  + "      <i class=\"fa fa-play-circle-o fa-lg\"></i>"
  + "    </a>"
  + "  </td>"
  + "  <td scope=\"row\" id=\"field-no\">" + number + "</td>"
  + "  <td>" + trackName + "</td>"
  + "  <td>" + artist + "</td>"
  + "  <td><img src=\"" + albumArt +"\" /></td>"
  + "  <td>" + listener.format("0,0") + "</td>"
  + "  <td></td>"
  + "</tr>";
};

function sortedByIndex(index){
  // keine Ahnung
  // var d = $("#result-rows").find("td#field-no");
  var trackRows = $("#result-rows").find("tr");

  return trackRows.sort(function(a, b) {
    //const col = 4; // 4 artist // 3 song title

    var valueA = a.getElementsByTagName('td')[index].innerHTML;
    var valueB = b.getElementsByTagName('td')[index].innerHTML;

    return valueA.localeCompare(valueB);
  });
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
