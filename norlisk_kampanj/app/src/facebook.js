document.getElementById('shareBtn').onclick = function() {

  FB.ui({
    app_id: '1796712503977559',
    redirect_uri: 'https://studiogodmode.se/kampanj',
    link: 'https://studiogodmode.se/kampanj',
    method: 'feed',
    link: 'https://studiogodmode.se/kampanj',
    caption: 'Min ',
    quote: "Jag fick " + (correctAnswer / quiz.length) * 100 + " % rätt på frågesporten om Norilsk. Pröva du också!",
    hashtag: "#visitnorilsk"
  }, function(response){});

}
