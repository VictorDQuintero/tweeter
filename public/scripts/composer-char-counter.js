$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length; // counts characters in textarea
    const remainingChars = 140 - charCount; // counts remaining characters
       

    if(remainingChars < 0 ){ // if negative characters add class to counter, which in css will be turned red
      $(this).parent().find('output').addClass('counter-negative');
    } else {
      $(this).parent().find('output').removeClass('counter-negative');
    }
    
    $(this).parent().find('output').text(remainingChars) // displays remainingChars
  });

 
});