$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length; // counts characters in textarea
    const remainingChars = 140 - charCount; // counts remaining characters
    const output = $(this).parent().find('output').text(remainingChars);

    if (remainingChars < 0) { // if negative characters add class to counter, which in css will be turned red
      output.addClass('counter-negative');
    } else {
      output.removeClass('counter-negative');
    }
    
    output.text(remainingChars); // displays remainingChars
  });

 
});