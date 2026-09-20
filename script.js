// game screens 
const startScreen = document.getElementById("startScreen");// this is the main  screen or the first on eyou see
const instructionScreen =document.querySelector(".instructionScreen");// this is the screen with the instructions 
const gameScreen = document.querySelector(".game");// game screen where we will build the game
const scoreScreen = document.getElementById("scoreScreen");// score screen where you go after loosing or quitting the game

// game buttons
const startButton = document.querySelector(".startButton");//  takes you to the game screen
const instructionButton = document.querySelector(".instructionButton");//  takes you to the instruction screen
const backButtonInstructionScreen = document.querySelector(".BackButtonInstructionScreen");//  returns you from instruction screen to the main screen
const pauseButton = document.querySelector(".pauseButton"); //pauses the game, shows a menu
const resumeButton = document.querySelector(".resumeButton");// in the pause menu, resumes the game
const restartButton = document.querySelector(".restartButton");// in the pause menu, restarts the game
const quitButton = document.querySelector(".quitButton");// in the pause menu, takes you to the score screen
const playAgainButton = document.getElementById("playAgainButton");// in the score screen , takes you to the game
const mainMenuButton = document.getElementById("mainMenuButton");// take you to the main screen from the score screen


// other game elements
const pauseMenu = document.querySelector(".pauseMenu");// where all the pause buttons are
const pauseOverlay = document.querySelector(".pauseOverlay");// blurs the game when paused
const gameOverlay = document.querySelector(".gameOverlay");// tells you to click to begin the timer and game
const finalScore = document.getElementById("finalScore");//keeps trak of the final score
const finalTime =  document.getElementById("finalTime");// final time display
const liveTimer = document.querySelector(".liveTimer");//live timer display

//variables For ingame time calculation 
let startTime;
let elapsedTime = 0;

let gameTimer;

function startTimer(){
    startTime = Date.now() - elapsedTime;
    gameTimer = setInterval(function() { 
        elapsedTime = Date.now() - startTime;

        let seconds = Math.floor(elapsedTime/1000);
        let minutes = Math.floor(seconds/60);
        seconds = seconds % 60;

        if(seconds<10) {
            seconds = "0" + seconds;}

        liveTimer.textContent = "TIME:" + minutes + ":" + seconds;
    }, 1000);
}


// instruction button directions
instructionButton.addEventListener("click", function() {
    startScreen.style.display = "none";
    instructionScreen.style.display="block";});    

// back button directions
backButtonInstructionScreen.addEventListener("click", function() {
    instructionScreen.style.display="none"; 
    startScreen.style.display = "block"});

// start button directions
startButton.addEventListener("click", function(){
    startScreen.style.display="none";
    gameScreen.style.display = "block";
    gameOverlay.style.display = "flex";
    pauseButton.style.display = "none";
});
    

// game overlay directions
gameOverlay.addEventListener("click", function() { 
    gameOverlay.style.display="none";
    pauseButton.style.display="block";
    
    elapsedTime = 0
    startTimer();
});


// pause button directions
pauseButton.addEventListener("click", function() {
    pauseMenu.style.display = "block";
    pauseOverlay.style.display = "block";

    clearInterval(gameTimer); //stops the timer
});


// resume button directions
resumeButton.addEventListener("click", function() {
    pauseMenu.style.display = "none";
    pauseOverlay.style.display = "none";

    startTimer();
});


// quit button directions
quitButton.addEventListener( "click", function() {
    
    showScoreScreen();
});

// play again button directions
playAgainButton.addEventListener("click", function() {
    scoreScreen.style.display="none";
    gameScreen.style.display = "block"
    gameOverlay.style.display="Flex";
    pauseButton.style.display = "none";

    elapsedTime = 0;
    liveTimer.textContent = "TIME:00:00"; 

});

// main menu button directions
mainMenuButton.addEventListener("click", function() { 
    scoreScreen.style.display="none";
    gameScreen.style.display="none";
    startScreen.style.display = "block";
})

// restart button directions
restartButton.addEventListener("click", function() {
    pauseMenu.style.display ="none";
    pauseOverlay.style.display = "none";
    gameScreen.style.display = "block";
    gameOverlay.style.display = "flex";
    pauseButton.style.display = "none"
    scoreScreen.style.display = "none"

    elapsedTime = 0;
    liveTimer.textContent = "TIME:00:00";
});

// scorscreen directions

function showScoreScreen() {

    //more time suff 
    clearInterval(gameTimer); // stops tracking the time 
    elapsedTime = Date.now() - startTime; // collects the final time that was tracked

        //for rounding to seconds
    let seconds = Math.floor(elapsedTime/1000);//converts milisecons to seconds 

        //for rounding to minutes
    let minutes = Math.floor(seconds/60); // convers seconds to minutes 
    seconds = seconds % 60;// gets the remaining seconds 

    let displaySeconds = seconds;
    if(seconds <10) {
        displaySeconds = "0" + seconds;
    }//add a 0 when sconds are less the 10
    finalTime.textContent = minutes+ ":" + displaySeconds;

    pauseMenu.style.display = "none";
    pauseOverlay.style.display = "none";
    gameOverlay.style.display = "none";
    pauseButton.style.display = "none";
    scoreScreen.style.display = "flex";
}

