$(document).ready(function() {
  // --- our code goes here ---
  // $('#tweet-text').input(function() {
  //   console.log("input");
  // });
  $('#tweet-text').on('input', function() {
    const charCount = $(this).val().length;
    const remainingChars = 140 - charCount;
       

    if(remainingChars < 0 ){
      $(this).parent().find('output').addClass('counter-negative');
    } else {
      $(this).parent().find('output').removeClass('counter-negative');
    }
    
    $(this).parent().find('output').text(remainingChars)
  });

 
});