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
        $('.details').hide();
        $('.results').show();
        $('.twitch').html('<p class="all-streams"></p>');
    });

    
    
    
    //Click Function to fill detail element
    $('body').on('click', '.game-header', function(e){
        e.preventDefault();
        
        //Variables to pull index to define which search result was clicked
        var newArray = $(this);
        var newIndex = newArray[0].dataset.type;
        gameSelection = gameArray[newIndex];
     
        
        //Fill Game header
        if(gameSelection.image){ //Nested ifs to fall back to smaller and smaller photos
            if(gameSelection.image.super_url){
                displayBoxArt = '<img src="' + gameSelection.image.super_url + '"class="boxart">';
            }
            else if(gameSelection.image.medium_url) {
                displayBoxArt = '<img src="' + gameSelection.image.medium_url + '"class="boxart">';
            }
            else if(gameSelection.image.small_url) {
                displayBoxArt = '<img src="' + gameSelection.image.small_url + '"class="boxart">';
            }
            else if(gameSelection.image.tiny_url) {
                displayBoxArt = '<img src="' + gameSelection.image.tiny_url + '"class="boxart">';
            }
        }
        else {
            displayBoxArt = '<img src="../no-img-placeholder.jpg" class="boxart">';
        }
        
        //releaseDate = moment(gameSelection.original_release_date).format(MMMM Do YYYY);
        //console.log(releaseDate);
        //console.log(moment(gameSelection.original_release_date).format(MMMM Do YYYY));
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
            $.each(data.streams, function(index, value) {
                streamThumb = '<a href="' + value.channel.url + '"><img src="' + value.preview.medium + '" class="stream-img">'
                streamStatus = '<p class="stream-status">' + value.channel.status + '</p>'
                streamName = '<p class="stream-name"><strong>' + value.channel.name + '</strong></p>'
                $('.twitch').append(streamThumb + streamStatus + streamName);
            });
        });
        
        $('.all-streams').html('<h2 class="all-streams"><a href="http://www.twitch.tv/directory/game/' + gameSelection.name + '" class="twitch-header">Click here to see all <br><strong>' + gameSelection.name + ' Live Streams</strong></a></h2>');
    }); // END Click Detail Element
        
        
    

    
    //Back to search results from detail view
    $('body').on('click', '.back', function() {
        $('.detail-header').html("");
        $('.detail-body').html("");
        $('.details').hide();
        $('.results').show();
        $('.twitch').html('<p class="all-streams"></p>')
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
        console.log(value)
        displayName = '<div class="results-text"><h1 class="results-game-title"><a href="#" class="game-header" data-type=' + index + '>' + value.name + '</a></h1>';
        displayDeck = '<p class="results-deck">' + value.deck + '</p></div></div>';
        if(value.image){
            if(value.image){ //Nested ifs to fall back to smaller and smaller photos
                if(value.image.super_url){
                    displayThumb = '<div class="result-box"><img src="' + value.image.super_url + '"class="results-img">';
                }
                else if(value.image.medium_url) {
                    displayThumb = '<div class="result-box"><img src="' + value.image.medium_url + '"class="results-img">';
                }
                else if(value.image.small_url) {
                    displayThumb = '<div class="result-box"><img src="' + value.image.small_url + '"class="results-img">';
                }
                else if(value.image.tiny_url) {
                    displayThumb = '<div class="result-box"><img src="' + value.image.tiny_url + '"class="results-img">';
                }
            }  
        }
        else {
                displayThumb = '<div class="result-box"><img src="../no-img-placeholder.png" class="results-img">';
            }
        $('.results').append(displayThumb + displayName + displayDeck);

        
    });
}
