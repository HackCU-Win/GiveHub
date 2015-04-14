$(document).ready(function(){
  $('a[href*=#]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target
      || $('[name=' + this.hash.slice(1) +']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body')
        .animate({scrollTop: targetOffset}, 1000);
       return false;
      }
    }
  });
});

$(document).ready(function(){
  $('#howToButton').click(function() {
    $('#howToDiv').toggle("slow");
  });
});

$(document).ready(function(){
  $('#new-tweet-btn').click(function() {
    if($('#re-li').attr('class') === 'active'){
        $('#howToTweet').toggle("slow");
        $('#howToRetweet').toggle("slow");
    }
    $('#new-li').toggleClass('active',true);
    $('#re-li').toggleClass('active',false);
  });
});

$(document).ready(function(){
  $('#retweet-btn').click(function() {
    if($('#new-li').attr('class') === 'active'){
        $('#howToRetweet').toggle("slow");
        $('#howToTweet').toggle("slow");
    }
    $('#new-li').toggleClass('active',false);
    $('#re-li').toggleClass('active',true);
  });
});
