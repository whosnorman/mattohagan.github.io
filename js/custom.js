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
	hid, tid, sid,
	hackDelay = 2000,
	stuDelay = 3500,
	dabbleDelay = 1500,
	content = document.getElementById( 'content' ),
	contentItems = content.querySelector( 'ul.contentwrap').children,
	contentCount = contentItems.length,
	contentCurrent = 0,
	navBar = document.getElementById( 'fauxNav' ),
	navBtns = navBar.querySelector( 'ul.nav' ),
	aboutBtn = navBtns.querySelector( '.about' ),
	resumeBtn = navBtns.querySelector( '.resume' ),
	portBtn = navBtns.querySelector( '.port' );


	function init() {
		// set starting timeouts
		hid = setTimeout(hackTimer, hackDelay);
		sid = setTimeout(stuTimer, stuDelay);
		did = setTimeout(dabbleTimer, dabbleDelay);

		// nav bar listeners
		aboutBtn.addEventListener( 'click', function( ev ) { ev.preventDefault(); slide( 'about' ); } );
		//resumeBtn.addEventListener( 'click', function( ev ) { ev.preventDefault(); slide( 'resume' ); } );
		//portBtn.addEventListener( 'click', function( ev ) { ev.preventDefault(); slide( 'port' ); } );
		
	}

	/* seperate timer for each scrolling box */
	function hackTimer() {
		console.log('hack check');
		clearTimeout(hid);
		if (contentCurrent === 0) {
			scroll('hackathons');
		}
	}
	function stuTimer() {
		console.log('stu check');
		clearTimeout(sid);
		if (contentCurrent === 0) {
			scroll('student');
		}
	}
	function dabbleTimer() {
		console.log('dabble check');
		clearTimeout(did);
		if (contentCurrent === 0) {
			scroll('dabble');
		}
	}

	// little bit repetitive but each scrolling box needs its own
	// onEndAnimation in its own scope 
	function scroll(line) {
		if (line === 'hackathons') {
			var currentItem = hackItems[ hackCurrent ];

			// always going to next item
			hackCurrent = hackCurrent < hackCount - 1 ? hackCurrent + 1 : 0;
			
			var nextItem = hackItems[ hackCurrent ];

			classesAdd(currentItem, nextItem);

			var onEndAnimationNextItem = function() {
				this.removeEventListener( animEndEventName, onEndAnimationNextItem );
				
				classesRemove(currentItem, nextItem);
				
				hid = setTimeout(hackTimer, hackDelay);

				/*++cntAnims;
				if( cntAnims === 2) {
					isAnimating = false;
				}*/
			}
		
			if (support.animations) {
				nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
			}
			else {
				console.log('no support for animations');
				onEndAnimationItem();
			}

		}
		else if (line === 'student') {
			var currentItem = stuItems[ stuCurrent ];

			// always going to next item
			stuCurrent = stuCurrent < stuCount - 1 ? stuCurrent + 1 : 0;

			var nextItem = stuItems[ stuCurrent ];

			classesAdd(currentItem, nextItem);

			var onEndAnimationNextItem = function() {
				this.removeEventListener( animEndEventName, onEndAnimationNextItem );
				
				classesRemove(currentItem, nextItem);
				
				sid = setTimeout(stuTimer, stuDelay);

				/*++cntAnims;
				if( cntAnims === 2) {
					isAnimating = false;
				}*/
			}
		
			if (support.animations) {
				nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
			}
			else {
				console.log('no support for animations');
				onEndAnimationItem();
			}

		}
		else if (line === 'dabble') {
			var currentItem = dabbleItems[ dabbleCurrent ];

			// always going to next item
			dabbleCurrent = dabbleCurrent < dabbleCount - 1 ? dabbleCurrent + 1 : 0;

			var nextItem = dabbleItems[ dabbleCurrent ];

			classesAdd(currentItem, nextItem);

			var onEndAnimationNextItem = function() {
				this.removeEventListener( animEndEventName, onEndAnimationNextItem );
				
				classesRemove(currentItem, nextItem);
				
				did = setTimeout(dabbleTimer, dabbleDelay);

// something with this needed for sliding content pages
				/*++cntAnims;
				if( cntAnims === 2) {
					isAnimating = false;
				}*/
			}
		
			if (support.animations) {
				nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
			}
			else {
				console.log('no support for animations');
				onEndAnimationItem();
			}

		}
	}

	/* classie functions for scrolling boxes */
	function classesAdd(current, next) {
		classie.addClass(current, 'move-out');
		classie.addClass(next, 'show-next');
		classie.addClass(next, 'current');
	}
	function classesRemove(current, next) {
		classie.removeClass(current, 'current');
		classie.removeClass(current, 'move-out');
		classie.removeClass(next, 'show-next');
	}


	function slide(cont) {
		
		if(cont === 'resume') {
			if (contentCurrent != 1) {

				// update nav bar
				classie.addClass(resumeBtn, 'current');
				classie.removeClass(aboutBtn, 'current');
				classie.removeClass(portBtn, 'current');

				// update variables
				var currentView = contentItems[ contentCurrent ];
				contentCurrent = 1;
				var nextView = contentItems[ contentCurrent ];

				// start animations
				classie.addClass(currentView, 'slide-out');
				classie.addClass(nextView, 'slide-next');
				classie.addClass(nextView, 'current');

				var onEndAnimationNextView = function() {
					this.removeEventListener( animEndEventName, onEndAnimationNextView );

					classie.removeClass(currentView, 'slide-out');
					classie.removeClass(currentView, 'current');
					classie.removeClass(nextView, 'slide-next');
				}

				if (support.animations) {
					nextView.addEventListener( animEndEventName, onEndAnimationNextView );
				}
				else {
					console.log('no support for animations/transitions');
					onEndAnimationNextView();
				}
			}
		}
		else if (cont === 'about') {
			if (contentCurrent != 0) {
				classie.addClass(aboutBtn, 'current');
				classie.removeClass(resumeBtn, 'current');
				classie.removeClass(portBtn, 'current');

				var currentView = contentItems[ contentCurrent ];
				contentCurrent = 0;
				var nextView = contentItems[ contentCurrent ];
				classie.addClass(currentView, 'slide-out');
				classie.addClass(nextView, 'slide-next');
				classie.addClass(nextView, 'current');

				var onEndAnimationNextView = function() {
					this.removeEventListener( animEndEventName, onEndAnimationNextView );

					classie.removeClass(currentView, 'slide-out');
					classie.removeClass(currentView, 'current');
					classie.removeClass(nextView, 'slide-next');

					hid = setTimeout(hackTimer, hackDelay);
					sid = setTimeout(stuTimer, stuDelay);
					did = setTimeout(dabbleTimer, dabbleDelay);


				}

				if (support.animations) {
					nextView.addEventListener( animEndEventName, onEndAnimationNextView );
				}
				else {
					console.log('no support for animations/transitions');
					onEndAnimationNextView();
				}
			}
			
		}
		else if (cont === 'port') {
			if (contentCurrent != 2) {
				classie.addClass(portBtn, 'current');
				classie.removeClass(aboutBtn, 'current');
				classie.removeClass(resumeBtn, 'current');

				var currentView = contentItems[ contentCurrent ];
				contentCurrent = 2;
				var nextView = contentItems[ contentCurrent ];
				classie.addClass(currentView, 'slide-out');
				classie.addClass(nextView, 'slide-next');
				classie.addClass(nextView, 'current');

				var onEndAnimationNextView = function() {
					this.removeEventListener( animEndEventName, onEndAnimationNextView );

					classie.removeClass(currentView, 'slide-out');
					classie.removeClass(currentView, 'current');
					classie.removeClass(nextView, 'slide-next');

				}

				if (support.animations) {
					nextView.addEventListener( animEndEventName, onEndAnimationNextView );
				}
				else {
					console.log('no support for animations/transitions');
					onEndAnimationNextView();
				}
			}
			
		}
			
	}

	// currently unused 
	function clearAllTimeouts() {
		clearTimeout(hid);
		clearTimeout(sid);
		clearTimeout(did);
		console.log('hid: ' + hid + ' sid: ' + sid + ' did: ' + did);
	}

	init();
})();