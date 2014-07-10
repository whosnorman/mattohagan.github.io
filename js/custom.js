(function() {
	var support = { animations : Modernizr.cssanimations },
	animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	},

	animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
	stuCont = document.getElementById( 'stuCont' ),
	hackCont = document.getElementById( 'hackCont' ),
	dabbleCont = document.getElementById( 'dabbleCont' ),
	stuItems = stuCont.querySelector( 'ul.itemwrap' ).children,
	hackItems = hackCont.querySelector( 'ul.itemwrap' ).children,
	dabbleItems = dabbleCont.querySelector( 'ul.itemwrap' ).children,
	stuCurrent = 0,
	hackCurrent = 0,
	dabbleCurrent = 0,
	stuCount = stuItems.length,
	hackCount = hackItems.length,
	dabbleCount = dabbleItems.length,
	hid, tid, sid;

	function init() {
		// set timeouts
		setTimeout(function(){ scroll('hackathons'); }, 2000);
		setTimeout(function(){ scroll('student'); }, 3000);
		setTimeout(function(){ scroll('dabble'); }, 1500);
	}

	function scroll(line) {
		if (line === 'hackathons') {
			var currentItem = hackItems[ hackCurrent ];
			//console.log(currentItem);
			// always going to next item
			hackCurrent = hackCurrent < hackCount - 1 ? hackCurrent + 1 : 0;
			//++current;

			var nextItem = hackItems[ hackCurrent ];
			classie.addClass(currentItem, 'move-out');
			classie.addClass(nextItem, 'show-next');
			classie.addClass(nextItem, 'current');

			var onEndAnimationNextItem = function() {
				//clearInterval(stid);
				this.removeEventListener( animEndEventName, onEndAnimationNextItem );
				//console.log('end animation2');
				classie.removeClass( currentItem, 'current');
				classie.removeClass( currentItem, 'move-out');
				classie.removeClass( nextItem, 'show-next');
				
				setTimeout(function(){ scroll('hackathons'); }, 2000);

				//clearInterval(hid);
				//hid = setInterval(timer, 3000);
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

		}
		else if (line === 'student') {
			var currentItem = stuItems[ stuCurrent ];
			//console.log(currentItem);
			// always going to next item
			stuCurrent = stuCurrent < stuCount - 1 ? stuCurrent + 1 : 0;
			//++current;

			var nextItem = stuItems[ stuCurrent ];
			classie.addClass(currentItem, 'move-out');
			classie.addClass(nextItem, 'show-next');
			classie.addClass(nextItem, 'current');

			var onEndAnimationNextItem = function() {
				//clearInterval(stid);
				this.removeEventListener( animEndEventName, onEndAnimationNextItem );
				console.log('end animation2');
				classie.removeClass( currentItem, 'current');
				classie.removeClass( currentItem, 'move-out');
				classie.removeClass( nextItem, 'show-next');
				
				setTimeout(function(){ scroll('student'); }, 3500);
				//sid = setInterval(timer('s'), 2000);
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

		}
		else if (line === 'dabble') {
			var currentItem = dabbleItems[ dabbleCurrent ];
			//console.log(currentItem);
			// always going to next item
			dabbleCurrent = dabbleCurrent < dabbleCount - 1 ? dabbleCurrent + 1 : 0;
			//++current;

			var nextItem = dabbleItems[ dabbleCurrent ];
			classie.addClass(currentItem, 'move-out');
			classie.addClass(nextItem, 'show-next');
			classie.addClass(nextItem, 'current');

			var onEndAnimationNextItem = function() {
				//clearInterval(stid);
				this.removeEventListener( animEndEventName, onEndAnimationNextItem );
				//console.log('end animation2');
				classie.removeClass( currentItem, 'current');
				classie.removeClass( currentItem, 'move-out');
				classie.removeClass( nextItem, 'show-next');
				
				setTimeout(function(){ scroll('dabble'); }, 1500);
				//sid = setInterval(timer('s'), 2000);
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

		}



	}

	init();
})();