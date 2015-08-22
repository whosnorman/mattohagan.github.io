var support = { animations : Modernizr.cssanimations };
var animEndEventNames = {
    'WebkitAnimation' : 'webkitAnimationEnd',
    'OAnimation' : 'oAnimationEnd',
    'msAnimation' : 'MSAnimationEnd',
    'animation' : 'animationend'
};
var animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

$(document).ready(function(){
    setPhrase();

    // beginning animations
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
                            $('.beforeList').addClass('show');
                            setTimeout(function(){
                                $('.arrow').css({opacity: 1});
                                $('.tooltip').css({opacity: 1});
                                startScroll();
                            }, 450);
                        }, 125);
                    }, 550);
                }, 150);
            }, 250);
        }, 1200);
    }, 500);

    // listener for arrow
	$('.arrow .inner').on('click', function(){
		$('html, body').animate({
            scrollTop: $("#port").offset().top - 80
        }, 1500);
	});


    var landing = {
        hide: function(){
            $('.arrow').css({opacity: 0});
            $('.nav').addClass('showNav');
        },

        show: function(){
            $('.arrow').css({opacity: 1});
            $('.nav').removeClass('showNav');
        }
    };

    // on scroll
    $(document).scroll(function(){
        var top = $(this).scrollTop();
        if(top >= 200) {
            landing.hide();
        } else {
            landing.show();
        }
    });

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
        $('#phrasetwo').text(str);
    }

    function startScroll(){
        scroller.setItems('infoScroll');
        scroller.start();
    }
});

var scroller = {
    items: null,
    current: 0,
    delay: 1000,
    tid: null,

    setItems: function(id){
        var cont = document.getElementById(id);
        this.items = cont.querySelector('ul.itemwrap').children;
    },

    start: function(){
        var self = this;
        this.tid = setTimeout(function(){ self.scrill(self)}, this.delay);
    },

    // pass self otherwise this would be window from setTimeout
    scrill: function(self){
        //clearTimeout(self.tid);
        var currentItem = self.items[self.current];

        // always going to next item
        self.current = self.current < self.items.length - 1 ? self.current + 1 : 0;
        
        var nextItem = self.items[self.current];

        self.addClasses(currentItem, nextItem);

        var onEndAnimationNextItem = function() {
            this.removeEventListener(animEndEventName, onEndAnimationNextItem);
            
            self.removeClasses(currentItem, nextItem);
            self.start();
        }
    
        if(support.animations) {
            nextItem.addEventListener(animEndEventName, onEndAnimationNextItem);
        } else {
            console.log('no support for animations');
            onEndAnimationItem();
        }
    },

    addClasses: function(current, next) {
        $(current).addClass('move-out');
        $(next).addClass('show-next');
        $(next).addClass('current');
    },

    removeClasses: function(current, next) {
        $(current).removeClass('current');
        $(current).removeClass('move-out');
        $(next).removeClass('show-next');
    }

};