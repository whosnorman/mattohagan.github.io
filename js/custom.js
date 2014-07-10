(function() {
	var support = { animations : Modernizr.cssanimations },
	animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	},

	animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
	container = document.getElementById( 'container' ),
	items = container.querySelector( 'ul.itemwrap' ).children,
	current = 0,
	itemsCount = items.length,
	isAnimating = false;

	function init() {
		// set timer
		tid = setInterval(timer, 1000);
		console.log(items);

	}

	function timer(){
		clearInterval(tid);
		navigate();
		console.log(current);
		//tid = setInterval(timer, 2000);
	}

	function navigate() {
		var cntAnims = 0;

		var currentItem = items[ current ];
		console.log(currentItem);
		// always going to next item
		current = current < itemsCount - 1 ? current + 1 : 0;
		//++current;

		var nextItem = items[ current ];
		classie.addClass(currentItem, 'move-out');
		classie.addClass(nextItem, 'show-next');
		classie.addClass(nextItem, 'current');

		//classie.removeClass( currentItem, 'current');
		//classie.removeClass( currentItem, 'move-out');
		//classie.addClass( nextItem, 'current');

/*
		var onEndAnimationCurrentItem = function() {
			//clearInterval(stid);
			this.removeEventListener( animEndEventName, onEndAnimationCurrentItem );
			console.log('end animation1');
			classie.removeClass( currentItem, 'current' );
			classie.removeClass( currentItem, 'move-out');
			//classie.addClass( nextItem, 'show-next');
			//classie.addClass( nextItem, 'current');
			nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
			//tid = setInterval(timer, 2000);
			/*++cntAnims;
			if( cntAnims === 2) {
				isAnimating = false;
			}
		} */

		var onEndAnimationNextItem = function() {
			//clearInterval(stid);
			this.removeEventListener( animEndEventName, onEndAnimationNextItem );
			console.log('end animation2');
			classie.removeClass( currentItem, 'current');
			classie.removeClass( currentItem, 'move-out');
			classie.removeClass( nextItem, 'show-next');
			
			tid = setInterval(timer, 2000);
			/*++cntAnims;
			if( cntAnims === 2) {
				isAnimating = false;
			}*/
		}
	
		if (support.animations) {
			console.log('support');
			//stid = setInterval(onEndAnimationItem, 2000);
			nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
		}
		else {
			console.log('no support');
			onEndAnimationItem();
		}

		//classie.addClass(currentItem, 'show-next');
		//classie.addClass(nextItem, 'show-next');


	}

	init();
})();