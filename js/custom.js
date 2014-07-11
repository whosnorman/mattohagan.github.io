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
		// set timeouts
		hid = setTimeout(hackTimer, hackDelay);
		//sid = setTimeout(function(){ scroll('student'); }, 3000);
		sid = setTimeout(stuTimer, stuDelay);
		did = setTimeout(dabbleTimer, dabbleDelay);

		aboutBtn.addEventListener( 'click', function( ev ) { ev.preventDefault(); slide( 'about' ); } );
		resumeBtn.addEventListener( 'click', function( ev ) { ev.preventDefault(); slide( 'resume' ); } );
		portBtn.addEventListener( 'click', function( ev ) { ev.preventDefault(); slide( 'port' ); } );
		
	}

	function hackTimer() {
		console.log('hack check');
		if (contentCurrent === 0) {
			scroll('hackathons');
		}
		else {
			clearTimeout(hid);
		}
	}

	function stuTimer() {
		console.log('stu check');
		if (contentCurrent === 0) {
			scroll('student');
		}
		else {
			clearTimeout(sid);
		}
	}

	function dabbleTimer() {
		console.log('dabble check');
		if (contentCurrent === 0) {
			scroll('dabble');
		}
		else {
			clearTimeout(did);
		}
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
				
				console.log('hack set');
				hid = setTimeout(hackTimer, hackDelay);

				//clearInterval(hid);
				//hid = setInterval(timer, 3000);
				/*++cntAnims;
				if( cntAnims === 2) {
					isAnimating = false;
				}*/
			}
		
			if (support.animations) {
				console.log('hid ' + hid);
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
				//console.log('end animation2');
				classie.removeClass( currentItem, 'current');
				classie.removeClass( currentItem, 'move-out');
				classie.removeClass( nextItem, 'show-next');
				
				sid = setTimeout(stuTimer, stuDelay);
				//sid = setInterval(timer('s'), 2000);
				/*++cntAnims;
				if( cntAnims === 2) {
					isAnimating = false;
				}*/
			}
		
			if (support.animations) {
				console.log('sid ' + sid);
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
				
				did = setTimeout(dabbleTimer, dabbleDelay);
				//sid = setInterval(timer('s'), 2000);
				/*++cntAnims;
				if( cntAnims === 2) {
					isAnimating = false;
				}*/
			}
		
			if (support.animations) {
				console.log('did ' + did);
				//stid = setInterval(onEndAnimationItem, 2000);
				nextItem.addEventListener( animEndEventName, onEndAnimationNextItem );
			}
			else {
				console.log('no support');
				onEndAnimationItem();
			}

		}
	}

	function slide(cont) {
		
		if(cont === 'resume') {
			if (contentCurrent != 1) {
				//clearAllTimeouts();

				classie.addClass(resumeBtn, 'current');
				classie.removeClass(aboutBtn, 'current');
				classie.removeClass(portBtn, 'current');

				var currentView = contentItems[ contentCurrent ];
				contentCurrent = 1;
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
		else if (cont === 'about') {
			if (contentCurrent != 0) {
				//clearAllTimeouts();
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
				//clearAllTimeouts();
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

	function clearAllTimeouts() {
		clearTimeout(hid);
		clearTimeout(sid);
		clearTimeout(did);
		console.log('hid: ' + hid + ' sid: ' + sid + ' did: ' + did);
	}

	init();
})();