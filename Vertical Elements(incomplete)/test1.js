	/*************************************************************************
	 A LOT OF (READ ALMOST ALL) OF MY STUFF IS BASED ON A 500X500 BOARD SO THIS 
	 MIGHT BE HARD TO GET TO WORK WITH A VARIABLE SIZED CANVAS
	 *************************************************************************/
	var canvas, ctx; //canvas, canvas context
	var letterArray = new Array(); // array of letter image sprites
	var letterSpeedTimer = null; //timer
	var letterVal; //decides which image is respawned
	var letterSpeed = 3; //moves 3px down every timer tick
	var letterTickRate = 25; //timer tick every 25ms
	
	/**
	 * X value for the image, random number between 0 and 460
	 */
	var letterX = Math.floor(Math.random() * 460); 
	var letter1X = Math.floor(Math.random() * 460);
	var letter2X = Math.floor(Math.random() * 460);
	var letter3X = Math.floor(Math.random() * 460);
	/**
	 * Y value for images, letterY at -50 will spawn it first so the game starts immediately.
	 */
	var letterY = -50;
	var letter1Y = (Math.floor(Math.random() * -600));
	var letter2Y = (Math.floor(Math.random() * -600));
	var letter3Y = (Math.floor(Math.random() * -600));
	/**
	 * Decides which letter drops. 0=A, 1=B 24= Y, etc.
	 */
	var letterIndex = Math.floor(Math.random() * 26);
	var letter1Index = Math.floor(Math.random() * 26);
	var letter2Index = Math.floor(Math.random() * 26);
	var letter3Index = Math.floor(Math.random() * 26);
	
	/**
	 * Clears the whole canvas so there aren't image trails, cause I'm lazy.
	 */
	function clearRect() {
		ctx.clearRect(0,0,500,500);
	}
	/**
	 * Based on letterVal, the letter image will be replaced with a new letter,
	 * and spawn at a random height above the screen, except for letterY, which will
	 * be set to 50 so it always has 1 image on the screen.
	 */
	function newValues() {
	
		if (letterVal == 1 ) {
			letterX = Math.floor(Math.random() * 460);
			letterY = -50;
			letterIndex = Math.floor(Math.random() * 26);
		}
		if (letterVal == 2) {
			letter1X = Math.floor(Math.random() * 460);
			letter1Y = (Math.floor(Math.random() * -100));
			letter1Index = Math.floor(Math.random() * 26);
		}
		if (letterVal == 3) {
			letter2X = Math.floor(Math.random() * 460);
			letter2Y = (Math.floor(Math.random() * -100));
			letter2Index = Math.floor(Math.random() * 26);
		}
		if (letterVal == 4) {
			letter3X = Math.floor(Math.random() * 420);
			letter3Y = (Math.floor(Math.random() * -100));
			letter3Index = Math.floor(Math.random() * 26);
		}
	}
	/**
	 * Makes letters move, checks if they're off the screen, and then calls
	 * newValues() to spawn a new random letter.
	 */
	function drawLetter() {
			clearRect();

			ctx.drawImage(letterArray[letterIndex], letterX, letterY);
			ctx.drawImage(letterArray[letter1Index], letter1X, letter1Y);
			ctx.drawImage(letterArray[letter2Index], letter2X, letter2Y);
			ctx.drawImage(letterArray[letter3Index], letter3X, letter3Y);

			letterY += letterSpeed;
			letter1Y += letterSpeed;
			letter2Y += letterSpeed;
			letter3Y += letterSpeed;
			
			if (letterY > 500) {
				letterVal = 1;
				newValues();
			}
			
			if (letter1Y > 500) {
				letterVal = 2;
				newValues();
			}
			
			if (letter2Y > 500) {
				letterVal = 3;
				newValues();
			}
			if (letter3Y > 500) {
				letterVal = 4;
				newValues();
			}
	}
	/**
	 * Calls draw letter every letterTickRate(25ms), and moves them 
	 * setInterval pixels(3).
	 */
	function draw() {
		clearRect();
		letterSpeedTimer = setInterval('drawLetter();', letterTickRate);
	}
	/**
	 * Populates the letterArray with images, if there's a better way to do this than
	 * 26 cases, pls change.
	 */
	function addletter() {
		for (var i = 0; i < 26; i++) {
			switch(i) {
			case 0:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/A.png';
			break;
			case 1:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/B.png';
			break;
			case 2:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/C.png';
			break;
			case 3:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/D.png';
			break;
			case 4:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/E.png';
			break;
			case 5:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/F.png';
			break;
			case 6:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/G.png';
			break;
			case 7:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/H.png';
			break;
			case 8:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/I.png';
			break;
			case 9:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/J.png';
			break;
			case 10:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/K.png';
			break;
			case 11:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/L.png';
			break;
			case 12:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/M.png';
			break;
			case 13:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/N.png';
			break;
			case 14:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/O.png';
			break;
			case 15:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/P.png';
			break;
			case 16:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/Q.png';
			break;
			case 17:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/R.png';
			break;
			case 18:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/S.png';
			break;
			case 19:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/T.png';
			break;
			case 20:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/U.png';
			break;
			case 21:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/V.png';
			break;
			case 22:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/W.png';
			break;
			case 23:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/X.png';
			break;
			case 24:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/Y.png';
			break;
			case 25:
				letterArray[i] = new Image();
				letterArray[i].src = './Letters/Z.png';
			break;
			}
		}
		drawLetter();
	}
	/**
	 * "Driver" for the falling letters, starts on page load. 
	 */
	function init() {
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		draw();
		addletter();
	}

	window.onload = init();