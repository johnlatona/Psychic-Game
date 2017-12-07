
var computerChoices = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"];

var computerLetter = '';

var guesses;
var wins = 0;
var losses = 0;
var userInputDisplay = '';
var userInput;
var winsText = document.getElementById("wins");
var lossesText = document.getElementById("losses");
var userGuessText = document.getElementById("guesses-so-far");
var guessesLeftText = document.getElementById("guesses-left");

var lose = new Audio("./assets/audio/lose.mp3");
var win = new Audio("./assets/audio/win.mp3");
var backgroundMusic = new Audio("./assets/audio/background-music.mp3");
backgroundMusic.loop = true;

function clickPulseInit() {
	$(".click").animate({opacity: "0.5"}, "normal");
	$(".click").animate({opacity: "1.0"}, "normal", clickPulseInit);
};

clickPulseInit();

function chooseLetter() {
	computerLetter = computerChoices[Math.floor(Math.random() * computerChoices.length)];
	console.log(computerLetter);
};

function showStartScreen() {
	document.getElementById("gameOverMsg").style.display = "none";
	document.getElementById("game-content").style.display = "none";
	document.getElementById("initialBox").style.display = "block";
	$("#initialBox").on("click", function() {
		document.getElementById("initialBox").style.display = "none";
		document.getElementById("game-content").style.display = "block";
		backgroundMusic.play();
	});
}

function showGameScreen() {
	document.getElementById("initialBox").style.display = "none";
	document.getElementById("game-content").style.display = "block";
}

function showWinScreen() {
	document.getElementById("game-content").style.display = "none";
	$("#gameOverMsg").empty().prepend('<h1>YOU WIN!</h1><br><br><h3>My letter was ' + computerLetter.toUpperCase() + '. You are a Psychic!</h3><br><br><h2 class="click">CLICK HERE TO PLAY AGAIN!</h2>');
	document.getElementById("gameOverMsg").style.display = "block";
	$("#gameOverMsg").on("click", function() {
		document.getElementById("gameOverMsg").style.display = "none";
		document.getElementById("game-content").style.display = "block";
		chooseLetter();
		win.pause();
		backgroundMusic.play();
	});
}

function showLoseScreen() {
	document.getElementById("game-content").style.display = "none";
	$("#gameOverMsg").empty().prepend('<h1>YOU LOSE</h1><br><br><h3>Better Luck Next Time!</h3><br><br><h2 class="click">CLICK HERE TO PLAY AGAIN!</h2>');
	document.getElementById("gameOverMsg").style.display = "block";
	$("#gameOverMsg").on("click", function() {
		document.getElementById("gameOverMsg").style.display = "none";
		document.getElementById("game-content").style.display = "block";
		chooseLetter();
		lose.pause();
		backgroundMusic.play();
	});
}

function startGameInit() {
	chooseLetter();
	guesses = 9;
	guessesLeftText.textContent = 9;
	userGuessText.textContent = '';
	userInputDisplay = '';
	showStartScreen();
};

function startGameWin(){
	showWinScreen();
	backgroundMusic.pause();
	win.play();
	guesses = 9;
	guessesLeftText.textContent = 9;
	userGuessText.textContent = '';
	userInputDisplay = '';
	wins++;
};

function startGameLose() {
	showLoseScreen();
	backgroundMusic.pause();
	lose.play();
	guesses = 9;
	guessesLeftText.textContent = 9;
	userGuessText.textContent = '';
	userInputDisplay = '';
	losses++;
}

document.addEventListener("DOMContentLoaded", startGameInit);

document.onkeyup = function(event) {

	userGuessText.textContent = userInputDisplay;

	userInput = event.key;

	userInputDisplay += userInput + ", ";

	userGuessText.textContent = userInputDisplay;
	
	guessesLeftText.textContent = guesses;

	winsText.textContent = wins;

	lossesText.textContent = losses;

	if(guesses != 0) {
		guesses--;
	}
	else if(guesses === 0){
		guessesLeftText.textContent = 0;
		startGameLose();
	}

	if(userInput === computerLetter) {
		startGameWin();
	}
};





