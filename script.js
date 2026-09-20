const startScreen = document.getElementById("startScreen");

const instructionScreen =document.querySelector(".instructionScreen");
const instructionButton = document.querySelector(".instructionButton");
const backButtonInstructionScreen = document.querySelector(".BackButtonInstructionScreen");

const gameScreen = document.querySelector(".game");
const startButton = document.querySelector(".startButton");
const gameOverlay = document.querySelector(".gameOverlay");

const pauseButton = document.querySelector(".pauseButton");
const pauseMenu = document.querySelector(".pauseMenu");
const resumeButton = document.querySelector(".resumeButton");
const restartButton = document.querySelector(".restartButton");
const quitButton = document.querySelector(".quitButton");
const pauseOverlay = document.querySelector(".pauseOverlay");

const scoreScreen = document.getElementById("scoreScreen");
const finalScore = document.getElementById("finalScore");
const playAgainButton = document.getElementById("playAgainButton");
const mainMenuButton = document.getElementById("mainMenuButton");



instructionButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    instructionScreen.style.display="block";});    

backButtonInstructionScreen.addEventListener("click", function() {
    instructionScreen.style.display="none"; 
    startScreen.style.display = "block"});

startButton.addEventListener("click", function(){
    startScreen.style.display="none";
    gameScreen.style.display = "block";
    gameOverlay.style.display = "flex";
    pauseButton.style.display = "none";
});
    
    
gameOverlay.addEventListener("click", function() { 
    gameOverlay.style.display="none";
    pauseButton.style.display="block";
});

pauseButton.addEventListener("click", function() {
    pauseMenu.style.display = "block";
    pauseOverlay.style.display = "block";
});

resumeButton.addEventListener("click", function() {
    pauseMenu.style.display = "none";
    pauseOverlay.style.display = "none";
});

quitButton.addEventListener( "click", function() {
    
    showScoreScreen();
});

playAgainButton.addEventListener("click", function() {
    scoreScreen.style.display="none";
    gameScreen.style.display = "block"
    gameOverlay.style.display="Flex";
    pauseButton.style.display = "none";

});

mainMenuButton.addEventListener("click", function() { 
    scoreScreen.style.display="none";
    gameScreen.style.display="none";
    startScreen.style.display = "block";
})

function showScoreScreen() {
    pauseMenu.style.display = "none";
    pauseOverlay.style.display = "none";
    gameOverlay.style.display = "none";
    pauseButton.style.display = "none";
    scoreScreen.style.display = "flex";
}

