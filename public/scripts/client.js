/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {

  $('#tweets-container').empty(); // clears tweets container

  tweets.forEach((tweetData) => { 
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').prepend($tweet);
  });
}

const createTweetElement = function(tweetData){
  
  const formattedTime = timeago.format(tweetData.created_at);
  const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="user-info">
          <img class="user-avatar" src="${tweetData.user.avatars}" />
          <span class="user-name">${tweetData.user.name}</span>
        </div>
        <span class="user-handle">${tweetData.user.handle}</span>
      </header>
      <div class="tweet-content">
        ${tweetData.content.text}
      </div>
      <footer>
        <span class="created-at">${formattedTime}</span>
        <div class="tweet-links">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
      </footer>
    </article>
  `);
  
  return $tweet;     
};

const loadTweets = function(){
  
$.ajax({
  type: 'GET', // The HTTP method to use for the request
  url: '/tweets', // The URL to which the request is sent
  dataType: 'json', // The type of data you're expecting back from the server
  success: renderTweets, // Callback function executed if the request succeeds
  error: function(error) { // Callback function executed if the request fails
    console.log('Error retrieving data:', error);
  }
});

};

const isTweetValid = function(tweetText){
  const maxTweetLength = 140;

  if(!tweetText){
    displayErrorMessage("Tweets must not be empty");
    return false;
  }

  if(tweetText.length > maxTweetLength){
    displayErrorMessage(`Tweet must not be longer than ${maxTweetLength} characters.`)
    return false;
  }

  return true;
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const displayErrorMessage = function (message){
  $('.error-message').text(message).show(); // Update and show the error message container
};

const clearErrorMessage = function() {
  $('.error-message').hide(); // Hide the error message container
};


$(document).ready(function() {

loadTweets();

  $('#post-tweet').on('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

    const tweetText = $("#tweet-text").val().trim();

     // Clear previous error message
     clearErrorMessage();
      
    // Validate tweet
    if (!isTweetValid(tweetText)) {
      return; // If the tweet is invalid, stop the form submission
    }
    
    // Serialize the form data
    const serializedData = $(this).serialize();

    // Log the serialized data to see what it looks like
    console.log(serializedData);

    // AJAX POST request to send the serialized data
    
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: serializedData,
      success: function(response) {
        // Handle the success response
        console.log('Tweet successfully posted:', response);

        // Clear the textarea and reset the character counter
        $('#tweet-text').val(''); // Clear the textarea
        $('.counter').text('140'); // Reset the character counter

        // Reload tweets to include the new tweet
        loadTweets();
      },
      error: function(error) {
        // Handle the error response
        console.log('Error posting tweet:', error);
      }
    });
  });
 

});
