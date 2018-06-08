var lettersContainer = document.getElementById("lettersToGuess");
var winsContainer = document.getElementById("winsContainer");
var losesContainer = document.getElementById("losesContainer");
var guessesContainer = document.getElementById("guessesContainer");
var lettersUsedContainer = document.getElementById("lettersUsedContainer");
var videoPlay = document.getElementById("videoPlay");
lettersContainer.innerHTML = "<h5>Press any key to get started</h5>";

var currentGameData = {};
var gameData = [
    {songName: "Yesterday", link: "2uneYz201p0"},
    {songName: "Because", link: "EqV4ZKjM62o"},
    {songName: "Blackbird", link: "JiL5JpUtjqY"}
];
var Game = {
    wins: 0,
    loses: 0,
    guesses: 12,
    start: false,
    currentWord: 0,
    lettersUsed: [],
    lettersGuessed: [],
    numOfLettersGuessed: 0
};
document.addEventListener("keypress", getStarted);

function getStarted(event) {
    var currentLetter = "";
    if (event !== false && Game.start === true) {
        currentLetter = event.key.toUpperCase();
    }
    currentGameData = gameData[Game.currentWord];
    var currentWordLetters = currentGameData.songName.toUpperCase().split('');
    printInputs(currentWordLetters, currentLetter);
}

function printInputs(currentWordLetters, currentLetter) {
    lettersContainer.innerHTML = "";
    Game.numOfLettersGuessed = 0;
    if (currentLetter !== "") {
        Game.start = true;
        if (currentWordLetters.includes(currentLetter)) {
            if (!Game.lettersGuessed.includes(currentLetter)) {
                Game.lettersGuessed.push(currentLetter);
            }
        } else {
            if (!Game.lettersUsed.includes(currentLetter)) {
                Game.lettersUsed.push(currentLetter);
                Game.guesses--;
                if (Game.guesses === 0) {
                    Game.loses++;
                    printGameOver();
                }
            }
        }
    } else {
        Game.start = true;
    }
    for (var i = 0; i < currentWordLetters.length; i++) {
        if (Game.lettersGuessed.includes(currentWordLetters[i])) {
            Game.numOfLettersGuessed++;
            lettersContainer.append(currentWordLetters[i] + " ");
        } else {
            lettersContainer.append("_ ");
        }
    }

    if (Game.numOfLettersGuessed === currentWordLetters.length) {
        Game.wins++;
        printGameWin();
    }
    resetHtml();
}

function printGameOver() {
    resetGame();
    alert('Game Over');
    getStarted(false);
}

function printGameWin() {
    videoPlay.src = "https://www.youtube.com/embed/" + currentGameData.link + "?rel=0&autoplay=1";
    videoPlay.classList.remove("d-none");
    resetGame();
    alert('Game Won!');
    getStarted(false);
}

function resetHtml() {
    winsContainer.textContent = Game.wins;
    losesContainer.textContent = Game.loses;
    guessesContainer.textContent = Game.guesses;
    lettersUsedContainer.textContent = Game.lettersUsed.join(", ");
}

function resetGame() {
    currentGameData = {};
    Game.start = false;
    Game.guesses = 12;
    Game.lettersUsed = [];
    Game.lettersGuessed = [];
    Game.currentWord = Game.currentWord + 1;
    Game.numOfLettersGuessed = 0;
}