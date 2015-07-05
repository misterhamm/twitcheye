$(document).ready(function() {

$.getJSON('http://www.giantbomb.com/api/game/3030-4725/?api_key=62aa06d41a05735519c6863554fdb36fbbb347e4&format=jsonp&field_list=genres,name&json_callback=?', function(data) {
    console.log(data);
    console.log('database working');
});

$.getJSON('https://api.twitch.tv/kraken/channels/sevadus&callback=?', function(data) {
    console.log(data.streams);
    console.log('twitch working');
});


$.getJSON('http://www.giantbomb.com/api/search?api_key=62aa06d41a05735519c6863554fdb36fbbb347e4&format=jsonp&query=Minecraft&resources=game&json_callback=?', function(data) {
    console.log(data);
    console.log('database search working');
});


});
