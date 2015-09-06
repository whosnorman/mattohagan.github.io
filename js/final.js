
var color = '#1d1d1d';
var bg = $('body').css('background-color');
var lastTime = Date.now();
var bubbleArr = [];
var xArr = [];
var squareArr = [];
var multiplier = 2;

var numCircles = 8;
var numX = 6;
var numSquares = 8;

var squareRange = {
	max: 15,
	min: 10
};
var circleRange = {
	max: 17,
	min: 10
};
var xRange = {
	max: 9,
	min: 5
};

var bctx;
var canvas;

$(document).ready(function(){
	/*var notify = $('#notifyText');
	$('.alone-nav a').hover(function(){
		$(notify).addClass('show');
	},function(){
		$(notify).removeClass('show');
	}); 

	$('.proj').each(function() {
	  var attr = $(this).attr('data-img');

	  $(this).mouseenter(function() {
	    $(this).css('background', 'url('+attr+')');
	  }).mouseleave(function() {
		$(this).css("background", bg);
	  });

	}); */

	init();
});

function init(){
	canvas = document.getElementById('effects');
	canvas.width = document.getElementById('landing').offsetWidth;
	canvas.height = window.innerHeight * 1;

	bctx = canvas.getContext('2d');

	initShape(numCircles, drawCircle, bubbleArr, circleRange);
	initShape(numX, drawX, xArr, xRange);
	initShape(numSquares, drawSquare, squareArr, squareRange);

	var updateInterval = window.setInterval(function(){
		var currTime = Date.now();
		if(currTime - lastTime < 100){
			update(currTime - lastTime)
		}

		lastTime = currTime;
	}, 30);

}


function initShape(numShape, drawFunc, arr, range){
	for(var i = 0; i < numShape; i++){
		var r = randomSize(range);

		if(i < numShape * 0.33){
			var x = getXinField(0.2, 0);
		} else if (i < numShape * 0.66){
			var x = getXinField(0.6, 0.2);
		} else {
			var x = getXinField(0.2, 0.8);
		}

		var y = Math.random() * window.innerHeight;
		var opacity = 0.35;

		drawFunc(x, y, r, color, opacity);
		arr.push({
			x: x,
			y: y,
			size: r,
			dr: 0,
			c: color,
			hover: false,
			opacity: opacity,
			popped: false,
			smiley: false
		});
	}
}

function update(delta){
	bctx.clearRect(0, 0, canvas.width, canvas.height);
	updateShape(delta, xArr, drawX);
	updateShape(delta, bubbleArr, drawCircle);
	updateShape(delta, squareArr, drawSquare);
}

function updateShape(delta, arr, drawFunc){

	// update each circle
	for(var i = 0; i < arr.length; i++){
		// set circle speeds
		if (i % 5 == 0){
			arr[i].y = arr[i].y - (1.5 / 30 * delta * multiplier);
		} else if (i % 2 == 0){
			arr[i].y = arr[i].y - (0.9 / 30 * delta * multiplier);
		} else {
			arr[i].y = arr[i].y - (0.3 / 30 * delta * multiplier);
		}

		// if bubble is off the screen, randomly respawn more
		if(arr[i].y < -65 && window.scrollY <= 500 && Math.random() < 0.01){
			arr[i].y = window.innerHeight + 50;
			arr[i].dr = 0;
		}

		drawFunc(arr[i].x, arr[i].y, arr[i].size + arr[i].dr, arr[i].c, arr[i].opacity);
	}
}


// Returns a random x coordinate with the specified portion of the window 
var getXinField = function(width, offset) {
	return canvas.width * (offset + (Math.random() * width));
}

function randomSize(range){
	return Math.random() * (range.max - range.min) + range.min;
}

function drawCircle(x, y, radius, color, opacity){
	bctx.beginPath();
	bctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	bctx.closePath();
	bctx.strokeStyle = color;
	bctx.lineWidth = 4.5;
	bctx.globalAlpha = opacity;
	bctx.stroke();
}

function drawX(x, y, size, color, opacity) {
    bctx.beginPath();
    bctx.moveTo(x - size, y - size);
    bctx.lineTo(x + size, y + size);
    bctx.moveTo(x + size, y - size);
    bctx.lineTo(x - size, y + size);
    bctx.lineWidth = 4;
    bctx.strokeStyle = color;
    bctx.globalAlpha = opacity;
    bctx.stroke();
}


function drawSquare(x, y, size, color, opacity) {
	bctx.beginPath();
	bctx.rect(x, y, size, size);
    bctx.lineWidth = 3.5;
    bctx.strokeStyle = color;
    bctx.globalAlpha = opacity;
    bctx.stroke();
}


