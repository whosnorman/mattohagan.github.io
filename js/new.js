$(document).ready(function(){
	$('.leftSide').addClass('leftShow');
	$('.dontshow').addClass('show');
	setTimeout(function(){
		$('canvas').css({opacity: 1});
		$('.centered').css({opacity: 1});
		$('.arrow').css({opacity: 1});
	}, 2000);

	$('.arrow span').on('click', function(){
		$('html, body').animate({
        scrollTop: $("#port").offset().top - 80
    }, 1500);
	});

	var fired = false;
	$(document).scroll(function(){
        var top = $(this).scrollTop();
        if(top >= 200) {
        	fired = true;
        	hideLanding();
        } else {
        	fired = true;
        	showLanding();
        }
    });

    function hideLanding(){
	    $('.dontshow').removeClass('show');
    		$('canvas').css({opacity: 0});
	        $('.arrow').css({opacity: 0});
	        $('.nav').addClass('showNav');
        	$('.leftSide').removeClass('leftShow');
    }

    function showLanding(){
    	$('canvas').css({opacity: 1});
		$('.arrow').css({opacity: 1});
        $('.nav').removeClass('showNav');
        $('.leftSide').addClass('leftShow');
		$('.dontshow').addClass('show');
    }
});