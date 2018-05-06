$(document).ready(function(){

// on click of search

var apiLink = 'https://hackathon.philamuseum.org/api/v0/collection/object/location?'


$('form').on('submit', function(e) {
    e.preventDefault();

    var userInput = $('#galleryIDsearch').val();
  
  	$('input').removeClass('error');
    $('.error-message').remove();

    if (userInput === "") {
        $('#galleryIDsearch').addClass('error');
        $('#galleryIDsearch').after('<p class="error-message">You did not enter a number. Try again.</p>');
    } else {
        $('#idList').append('<li>' + userInput + '</li>');
      	var galleryLink = 'https://hackathon.philamuseum.org/api/v0/collection/object/location?name=' + userInput + '&api_token=3PrN3yS0N4IyZrTRBA6lsoa6COUnIvX5ZUuwrqmFOLPZZLDgJIe6MXE5ylms';
    	$('#galleryLink').append('<li>' + galleryLink + '</li>');
    	
      $.ajax({
  			dataType: "json",
  			url: apiLink,
        data: {
          name: userInput,
          api_token: '3PrN3yS0N4IyZrTRBA6lsoa6COUnIvX5ZUuwrqmFOLPZZLDgJIe6MXE5ylms',
        },

        error: function() {
          alert("There was an error getting hackathon API data.");
         },

  			success: function ( response ) {
  				$('#response').html(response.GalleryDetailed + '<br>  floor: ' + response.Floor + "<br> objects are: " + response.ObjectIDs);
          var objectIDs = response.ObjectIDs;
          var objectURL = 'https://hackathon.philamuseum.org/api/v0/collection/object?'
          
          for (var i = 0; i < objectIDs.length; i++) {
            console.log (i, objectIDs[i]);
            $.ajax({
                dataType: "json",
                url: objectURL,
                data: {
                  query: objectIDs[i],
                  api_token: '3PrN3yS0N4IyZrTRBA6lsoa6COUnIvX5ZUuwrqmFOLPZZLDgJIe6MXE5ylms',

                },
              success: function( response ) {
                  $('#objectInfo').append('<p>ObjectID: ' + response.ObjectID + '<br>  Title: ' + response.Title + "<br> Style: " + response.Style + '<br>' + '<image src="' + response.Thumbnail + '" class=thumbnail>' + ' <br></p>');
              },
              error: function() {
                alert("There was an error getting ObjectID data.");
              }
              }); // ajax
            } // for

            
          } // success
  			
    
		}); // ajax
    } //else
}); //on click

$('#idList').on('click', '.delete', function () {
  $(this).parent().remove();
}); // isolated



// call the API
// get the input from the box
// get the objects associatated with the gallery ID
// display the list of objects


// on click of reset query
// hide all content (delete the div)




}); // ready fn