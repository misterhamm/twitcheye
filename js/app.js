$(document).ready(function() {

/*$.getJSON('https://api.twitch.tv/kraken/channels/sevadus&callback=?', function(data) {
    console.log(data.search);
    console.log('twitch working');
});*/

    var gameArray;

    //Search Function
    $('.search').submit(function(event) {
        event.preventDefault();
        $('.results').html("");
        var searchTerms = $('.search-terms').val();
        getRequest(searchTerms);
    });

    //Click Function to fill detail element
    $('body').on('click', '.game-header', function(e){
        e.preventDefault();
        var newArray = $(this);
        var newIndex = newArray[0].dataset.type

        console.log(gameArray[newIndex]) // start changing this console.log to fill detail view
    })
    //API Get Request
    function getRequest(searchTerms) {
        $.getJSON('https://www.giantbomb.com/api/search?api_key=62aa06d41a05735519c6863554fdb36fbbb347e4&format=jsonp&query=' + searchTerms + '&resources=game&json_callback=?', function(data) {
            showResults(data.results);
            gameArray = data.results;
            console.log(gameArray);
            return gameArray
        });
    }


});

//Search Results Printed to HTML
function showResults(results) {
    var displayName = "";
    $.each(results, function(index, value) {
        displayName = '<h1><a href="#" class="game-header" data-type=' + index + '>' + value.name + '</a></h1>';
        displayDeck = '<p>' + value.deck + '</p>';
        displayThumb = '<p><img class="detail-img" src="http://static.giantbomb.com' + value.image.thumb_url + '"></p>';
        console.log(value.deck);
        $('.results').append(displayName + displayDeck + displayThumb);
    });
}




