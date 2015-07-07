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

        gameSelection = gameArray[newIndex];

        //Fill Game header
        displayBoxArt = '<img src="http://static.giantbomb.com' + gameSelection.image.super_url + '"class="boxart">';
        displayTitle = '<h1 class="detail-title">' + gameSelection.name + '</h1>';
        displayRelease = '<p class="detail-release">' + gameSelection.original_release_date + '</p>';
        displayDeck = '<p class="detail-deck">' + gameSelection.deck + '</p>';
        $('.results').hide();
        $('.back').show();
        $('.details').show();
        $('.detail-header').html(displayBoxArt + displayTitle + displayRelease + displayDeck);

        //Fill full game review
        displayOverview = gameSelection.description;
        $('.detail-body').html(displayOverview);
    });

    //Back to search results from detail view
    $('body').on('click', '.back', function() {
        $('.detail-header').html("");
        $('.detail-body').html("");
        $('.details').hide();
        $('.results').show();
    });


    //API Get Request
    function getRequest(searchTerms) {
        $.getJSON('https://www.giantbomb.com/api/search?api_key=62aa06d41a05735519c6863554fdb36fbbb347e4&format=jsonp&query=' + searchTerms + '&resources=game&json_callback=?', function(data) {
            showResults(data.results);
            gameArray = data.results;
            return gameArray
        });
    }


});

//Search Results Printed to HTML
function showResults(results) {
    var displayName = "";
    $.each(results, function(index, value) {
        displayName = '<h1 class="results-game-title"><a href="#" class="game-header" data-type=' + index + '>' + value.name + '</a></h1>';
        displayDeck = '<p class="results-deck">' + value.deck + '</p>';
        displayThumb = '<img class="results-img" src="http://static.giantbomb.com' + value.image.thumb_url + '">';
        $('.results').append(displayName + displayDeck + displayThumb);
    });
}




