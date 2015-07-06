$(document).ready(function() {

/*$.getJSON('https://api.twitch.tv/kraken/channels/sevadus&callback=?', function(data) {
    console.log(data.search);
    console.log('twitch working');
});*/



    $('.search').submit(function(event) {
        event.preventDefault();
        $('.results').html("");
        var searchTerms = $('.search-terms').val();
        console.log(searchTerms);
        getRequest(searchTerms);
    });

    $.getJSON('http://www.giantbomb.com/api/game/30475/?api_key=62aa06d41a05735519c6863554fdb36fbbb347e4&format=jsonp&json_callback=?', function(data) {
        console.log(data.name);
    });
});



function getRequest(searchTerms) {
    $.getJSON('http://www.giantbomb.com/api/search?api_key=62aa06d41a05735519c6863554fdb36fbbb347e4&format=jsonp&query=' + searchTerms + '&resources=game&json_callback=?', function(data) {
        showResults(data.results);
    });
}

function showResults(results) {
    var displayName = "";
    $.each(results, function(index, value) {
        displayName = '<h1><a href="detail.html">' + value.name + '</a></h1>';
        displayDeck = '<p>' + value.deck + '</p>';
        displayThumb = '<p><a href="detail.html"><img src="' + value.image.thumb_url + '"></a></p>';
        console.log(value.deck);
        $('.results').append(displayName + displayDeck + displayThumb);
    });
}

/*
var headerFill = function(index, value) {
    displayArt = '<img src="' + value.image.super_url + '">';
    displayTitle = '<h1>' + value.name + '</h1>';
    displayDeck = '<p>' + value.deck + '</p>';
    $('.detail-header').html(displayArt + + displayTitle + displayDeck);
}
*/




