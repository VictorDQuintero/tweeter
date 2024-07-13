/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  $('#post-tweet').on('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission

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
      },
      error: function(error) {
        // Handle the error response
        console.log('Error posting tweet:', error);
      }
    });
  });
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

const renderTweets = function(tweets) {
  tweets.forEach((tweetData) => { 
    const $tweet = createTweetElement(tweetData);
    $('#tweets-container').prepend($tweet);
  });
}

const createTweetElement = function(tweetData){
      // Your code here
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
        <span class="created-at">${tweetData.created_at}</span>
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


renderTweets(data);

});
