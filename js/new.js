$(document).ready(function(){
	$('.leftSide').addClass('leftShow');
	$('.dontshow').addClass('show');
	setTimeout(function(){
		$('canvas').css({opacity: 1});
		$('.centered').css({opacity: 1});
	}, 2000);

	$(document).scroll(function(){
        var top = $(this).scrollTop();
        console.log(top);
        if(top >= 100){
        	hideLanding();
        } else 
        	showLanding();
    });

    function hideLanding(){
        $('canvas').css({opacity: 0});
        $('.nav').addClass('showNav');
        $('.top').addClass('hideTop');
    }

    function showLanding(){
    	$('canvas').css({opacity: 1});
        $('.nav').removeClass('showNav');
        $('.top').removeClass('hideTop');
    }
});