$(document).ready(function() {

$.getJSON('https://api.twitch.tv/kraken/search/streams?q=minecraft&type=suggestion&live=true&callback=?', function(data) {
    console.log(data);
    console.log('twitch working');
});

    var gameArray;

    //Search Function
    $('.search').submit(function(event) {
        event.preventDefault();
        $('.results').html("");
        var searchTerms = $('.search-terms').val();
        getRequest(searchTerms);
        $('.search-terms').val("");
    });

    
    
    
    //Click Function to fill detail element
    $('body').on('click', '.game-header', function(e){
        e.preventDefault();
        
        //Variables to pull index to define which search result was clicked
        var newArray = $(this);
        var newIndex = newArray[0].dataset.type;
        gameSelection = gameArray[newIndex];
     
        
        //Fill Game header
        displayBoxArt = '<img src="http://static.giantbomb.com' + gameSelection.image.super_url + '"class="boxart">';
        displayTitle = '<div class="detail-text"><h1 class="detail-title">' + gameSelection.name + '</h1>';
        displayRelease = '<p class="detail-release"> Release Date: ' + gameSelection.original_release_date + '</p>';
        displayDeck = '<p class="detail-deck">' + gameSelection.deck + '</p></div>';
        $('.results').hide();
        $('.back').show();
        $('.details').show();
        $('.detail-header').html(displayBoxArt + displayTitle + displayRelease + displayDeck);
     
        
        //Fill full game review
        displayOverview = gameSelection.description;
        $('.detail-body').html(displayOverview);
 
        
        //Fill Twitch sidebar
        $.getJSON('https://api.twitch.tv/kraken/search/streams?q=' + gameSelection.name + '&type=suggestion&live=true&limit=5&callback=?', function(data) {
            console.log(data.streams);
            $.each(data.streams, function(index, value) {
                streamThumb = '<a href="' + value.channel.url + '"><img src="' + value.preview.medium + '" class="stream-img">'
                streamStatus = '<p class="stream-status">' + value.channel.status + '</p>'
                streamName = '<p class="stream-name"><strong>' + value.channel.name + '</strong></p>'
                $('.twitch').append(streamThumb + streamStatus + streamName);
        console.log(gameSelection);
            /*streamSet = data.streams.slice[0]; //check out slice() to grab indexes 0-4
            $('.twitch').append( 
                '<a href="' +
                streamSet.channel.url + 
                '"><img src="' +
                streamSet.preview.medium + 
                '" class="stream-img"><p class="stream-status">' +
                streamSet.channel.status + 
                '</p><p class="stream-name">' +
                streamSet.channel.name + '</a></p>');
            console.log(streamSet);*/
            });
        });
        
        $('.all-streams').html('<a href="http://www.twitch.tv/directory/game/' + gameSelection.name + '" class="twitch-header">Click here to see all <br><strong>' + gameSelection.name + ' Live Streams</strong>.</a>');
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
        displayName = '<div class="results-text"><h1 class="results-game-title"><a href="#" class="game-header" data-type=' + index + '>' + value.name + '</a></h1>';
        displayDeck = '<p class="results-deck">' + value.deck + '</p></div></div>';
        displayThumb = '<div class="result-box"><img class="results-img" src="http://static.giantbomb.com' + value.image.thumb_url + '">';
        $('.results').append(displayThumb + displayName + displayDeck);
    });
}




