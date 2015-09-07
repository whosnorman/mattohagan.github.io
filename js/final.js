
var color = '#1d1d1d';
var bg = $('body').css('background-color');
var lastTime = Date.now();
var bubbleArr = [];
var xArr = [];
var squareArr = [];
var popArr = [];
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

var popRange = {
	max: 25,
	min: 5
};

var bctx;
var canvas;

var clickEvent = false;
var cursorX = -1000;
var cursorY = -1000;
var pagePosition = 0;

$(document).ready(function(){
	init();
});

function init(){
	canvas = document.getElementById('effects');
	canvas.width = document.getElementById('landing').offsetWidth;
	canvas.height = window.innerHeight * 1;

	bctx = canvas.getContext('2d');

	// Listeners
	document.onmousemove = function(e) {
		updateCursorLocation(e);
	}

	document.onclick = function(e) {
		clickEvent = true;
	}

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


var updateCursorLocation = function(e) {
	cursorX = e.pageX;
	cursorY = e.pageY;
}

var isHovered = function(arr, i, x, y) {
	var distance = calculateDistance(x, y, arr[i].x, arr[i].y);
	if (distance < arr[i].size) {
		return true;
	}
	return false;
}

var calculateDistance = function(x1, y1, x2, y2) {
	return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function initPop(x, y){
	for(var i = 0; i < 2; i++){
		
		var size = randomSize(popRange);
		var opacity = 0.35;


		var start = 1.6 * Math.PI;
		var end = (Math.random() * (0.6 - 0.3) + 0.3) * Math.PI;
		// 50% chance of either direction happening
    	var dirY = (i % 2) ? 1 : -1;
    	var dirX = (i % 2) ? 1 : -1;

    	x += size * dirX;

		drawPop(x, y, size, start, end, opacity, color, dirX);

		popArr.push({
			x: x,
			y: y,
			size: size,
			start: start,
			end: end,
			dr: 0,
			c: color,
			opacity: opacity,
			dirY: dirY,
			dirX: dirX,
			done: false
		});
	}
}

function updatePops(delta){
	for(var i = 0; i < popArr.length; i++){
		// update pop settings here
		// and then draw
		// start goes up
		// then end goes down
		
		console.log(Math.sqrt(Math.random() * 0.2));
		popArr[i].end -= Math.sqrt(Math.random() * 0.1);
		popArr[i].start -= Math.sqrt(Math.random() * 0.01);
		//popArr[i].y += Math.random() + 3 * popArr[i].dirY;
		//popArr[i].x += Math.random() + 2 * popArr[i].dirX;
		//
		
		popArr[i].size += 1;


		drawPop(popArr[i].x, popArr[i].y, popArr[i].size, popArr[i].start, popArr[i].end, popArr[i].opacity, popArr[i].c, popArr[i].dirX);
	
		var test = popArr[i].end - popArr[i].start;
		console.log(popArr[i].end);
		console.log(popArr[i].start);
		console.log(test);
		console.log('------');
		if(test <= -5.7){
			popArr.splice(i, 1);
		}

	}
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
	updatePops(delta);
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
	

		if (arr[i].popped) {
			
			if (arr[i].opacity > 0) {
				arr[i].opacity -= 0.1;
				if (arr[i].opacity < 0) {
					initPop(arr[i].x, arr[i].y);

					arr[i].opacity = 0;
					arr[i].popped = false;
					arr[i].y = -65;
					arr[i].dr = 0;
					arr[i].opacity = 0.35; 

					console.log(arr[i].x + ' ' + arr[i].y);
					// init pop
				}
			}
		} else {
			// Hover effects
			if (isHovered(arr, i, cursorX, cursorY)) {
				arr[i].hover = true;
			}

			if(arr[i].hover){
				if(arr[i].size + arr[i].dr < 1){
					console.log('pop!');
					arr[i].popped = true;
					arr[i].hover = false;
				} else {
					arr[i].dr -= 1;
				}
			}
		}
	}

	clickEvent = false;
}


// Returns a random x coordinate with the specified portion of the window 
var getXinField = function(width, offset) {
	return canvas.width * (offset + (Math.random() * width));
}

function randomSize(range){
	return Math.random() * (range.max - range.min) + range.min;
}

function drawPop(x, y, radius, startAngle, endAngle, opacity, color, dirX){
	bctx.beginPath();
	var test = false;
	if(dirX < 0){
		test = true;
		//bctx.translate(bctx.width / 2, 0);
		//bctx.scale(-1, 1);
	}
	bctx.arc(x, y, radius, startAngle, endAngle, test);
	bctx.strokeStyle = color;
	bctx.lineWidth = 4;
	bctx.globalAlpha = opacity;
	bctx.lineCap = 'round';


	bctx.stroke();
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


