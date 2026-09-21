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
let gameBall=document.querySelector(".gameBall");//this is the ball
const gamePlatform = document.querySelector(".gamePlatform");


//variables For ingame time calculation 
let startTime;//stores the time when the timer starts 
let elapsedTime = 0;// stores the time that has passed in the game
let gameTimer; // this is what changes the elapsed time every second
let pauseStartTime; //stors the amount of time the game was paused using the button


// vriables for moving the ball using the keys 
let ballY = 75; // bals y cordinat
let ballX = 50;//bals x cotdinart
let ballSpeed = 10// the speed the abll will move at
let jumping = false// is the ball currently moving
let BallGoingDown = false;// checks if the pall is going down or not after jumping


// variables for the platform movment and duplication
let platformX = 56 // x value of the platform
let platformY = 65 // y value of the platform

function getBallBottom() {
    return ballY + 3.2;// give the bottom edge of the ball
}

function getPlatformDistance() {// gets the distance between the ball and the platform
    return platformX-ballX;// platfroms bositionn minus the balls position
}
function landingWidth() {// checks if the ball landed on the platform
    let platformLeft = platformX;// the left side of the platform is the x cordinat 
    let platformRight = platformX + 18;// the right side of the platform is left side plus 18 percent

    return ballX >= platformLeft && ballX <= platformRight;// this will chek if the ball is on the platform or not


}

function landingHeight() {
    return getBallBottom() >= platformY;// if the height is on the platform too.
}



function jump(direction) {
    let horizontalMovement =0;
    BallGoingDown = false;
    if(direction === "left"){// if its left
        horizontalMovement = -1.5;// the falue of horizontal movement is -2
    }

    else if (direction === "right"){ //if its right 
        horizontalMovement = 1.5; // the value of the horizontal movement is 2
    }

    else if (direction === "up"){ //if its right 
        horizontalMovement = 0; // the value of the horizontal movement is 2
    }

    ballY -=3;// moves ball up
    ballX += horizontalMovement; //move ball left or right if there is horizontal movement
    gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
    gameBall.style.top = ballY +"%";// links the ballY variable to the actual position of the ball


    setTimeout(function() {
        ballY -= 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";

        
    },50);

    setTimeout(function() {
        ballY -= 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";

        
    },100);

    setTimeout(function() {
        ballY -= 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";// links the bally variable to the actual position of the balll

        
    },150);

    setTimeout(function() {
        ballY -= 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";// links the bally variable to the actual position of the balll

    },200);
    BallGoingDown = true;
    setTimeout(function() {
        ballY += 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%"; // links the bally variable to the actual position of the balll
    },250);

    setTimeout(function() {
        ballY += 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";// links the bally variable to the actual position of the balll

        
    },300);

    setTimeout(function() {
        ballY += 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";// links the bally variable to the actual position of the balll

        
    },350);

    setTimeout(function() {
        ballY += 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";// links the bally variable to the actual position of the balll

        
    },400);

    setTimeout(function() {
        ballY+= 3;
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to the actual position of the balll
        gameBall.style.top = ballY +"%";// links the bally variable to the actual position of the balll

        jumping=false;
    },450);

}// jump function 

document.addEventListener("keydown", function(event) {
    if(event.key === "d") {//if d is press 
        
        jumping = true;
        jump("right");
    }

     if(event.key === "a") {//if d is press 
        jumping = true;
        jump("left");
    }

    if(event.key === "w"&& !jumping) {//if d is press and the pall isnt moving
        jumping = true;
        jump("up");
    }
}); // key functions 



function startTimer(){// starts and calculates the timer in the game
    startTime = Date.now() - elapsedTime; // timer continues from where it left of before pausing
    gameTimer = setInterval(function() { 
        elapsedTime = Date.now() - startTime; // checks how much time has passes in milliseconds since u started

        let seconds = Math.floor(elapsedTime/1000);// checks for the number of seconds
        let minutes = Math.floor(seconds/60);// checks for the number of minutes 
        seconds = seconds % 60;// calculates the seconds remaining after the minutes

        if(seconds<10) {
            seconds = "0" + seconds;}// ads a zer if its 0-9 seconds 
 
        liveTimer.textContent = "TIME:" + minutes + ":" + seconds;// displays the time
    }, 1000); // runs once every second
}// timmer function 


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
    pauseStartTime = Date.now();
});


// resume button directions
resumeButton.addEventListener("click", function() {
    pauseMenu.style.display = "none";
    pauseOverlay.style.display = "none";

    startTime += Date.now() - pauseStartTime;
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

    elapsedTime = 0;//resets the timer 
    liveTimer.textContent = "TIME:00:00"; // resets the timer display

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

    elapsedTime = 0;// resets the timer 
    liveTimer.textContent = "TIME:00:00";// resets the timer display
});

// scorscreen directions

function showScoreScreen() {

    //more time suff 
    clearInterval(gameTimer); // stops tracking the time 
     if (pauseStartTime) 
        {elapsedTime = pauseStartTime - startTime; }// collects the final time that was tracked when u were paused
     else{
        elapsedTime= Date.now() - startTime;
     }
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

