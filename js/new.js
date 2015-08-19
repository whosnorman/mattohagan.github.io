$(document).ready(function(){
    setPhrase();

    setTimeout(function(){
        $('.centered').css({opacity: 1});
        setTimeout(function(){
            $('.top').addClass('final');                
            setTimeout(function(){
                $('.left').addClass('final');
                setTimeout(function(){
                    $('.bottom').addClass('final');
                    $('.right').addClass('final');
                    setTimeout(function(){
                        $('.before').addClass('hide');
                        $('.inside').addClass('final');
                        setTimeout(function(){
                            $('.arrow').css({opacity: 1});
                            $('.tooltip').css({opacity: 1});
                        }, 600);
                    }, 550);
                }, 150);
            }, 250);
        }, 1200);
    }, 500);

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
	        $('.arrow').css({opacity: 0});
	        $('.nav').addClass('showNav');
    }

    function showLanding(){
		$('.arrow').css({opacity: 1});
        $('.nav').removeClass('showNav');
    }

    function setPhrase(){
        var rand = Math.floor((Math.random() * 3 - 1) + 1);
        var str;
        switch(rand){
            case 0: str = 'hey there!';
                break;
            case 1: str = 'hello!';
                break;
            default: str = 'welcome!';
                break;
        }

        $('#phrase').text(str);
    }
});