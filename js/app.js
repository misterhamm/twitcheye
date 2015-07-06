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
});



function getRequest(searchTerms) {
    $.getJSON('http://www.giantbomb.com/api/search?api_key=62aa06d41a05735519c6863554fdb36fbbb347e4&format=jsonp&query=' + searchTerms + '&resources=game&json_callback=?', function(data) {
        showResults(data.results);
    });
}

function showResults(results) {
    var displayName = "";
    $.each(results, function(index, value) {
        displayName = '<p>' + value.name + '</p>';
        displayDeck = '<p>' + value.deck + '</p>';
        displayThumb = '<p><img src="' + value.image.thumb_url + '"></p>';
        console.log(value.deck);
        $('.results').append(displayName + displayDeck + displayThumb);
    });
}






