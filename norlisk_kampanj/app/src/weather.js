// Variables to set request
var lang = "lang=sv",
  units = "si",
  secret = "9d3826f159515dcc9d4ea2c4085c8366";

$.ajax({
  // Request to server for data
  url: "https://api.darksky.net/forecast/" +
    secret +
    "/69.3408703,87.956736?" +
    lang +
    "&" +
    units,

  dataType: "jsonp",
  success: function(data) { // Do stuff with the data here


    var currTemp = Math.floor(data.currently.temperature),
        currSum = data.currently.summary,
        daySum = data.hourly.summary,
        currIcon = data.currently.icon;

    $(".temperature").append(currTemp + " °C " + currSum);
    $(".summary").append(daySum);

    var skycons = new Skycons({"color": "black"});
      // on Android, a nasty hack is needed: {"resizeClear": true}

      // you can add a canvas by it's ID...
      skycons.add("icon", currIcon);

      // start animation!
      skycons.play();
  }

});
