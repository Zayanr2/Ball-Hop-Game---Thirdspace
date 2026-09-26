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
const gamePlatforms = document.querySelectorAll(".gamePlatform");


//variables For ingame time calculation 
let startTime;//stores the time when the timer starts 
let elapsedTime = 0;// stores the time that has passed in the game
let gameTimer; // this is what changes the elapsed time every second
let pauseStartTime; //stors the amount of time the game was paused using the button
let platformTimer;


// vriables for moving the ball using the keys 
let ballY = 75; // bals y cordinat
let ballX = 50;//bals x cotdinart
let ballSpeed = 10// the speed the abll will move at
let jumping = false// is the ball currently moving
let BallGoingDown = false;// checks if the pall is going down or not after jumping


// variables for the platform movment and duplication
let platforms = [
    {
        x:56,
        startX:56,
        y:65,
        width:18,
        height:20,
        speed:0.9,
        direction:1,

    },
    {
        x:35,
        startX:35,
        y:52,
        width:13,
        height:18,
        speed:1,
        direction:-1,

    }
];
platforms.forEach(function(platform, index) {
    gamePlatforms[index].style.left = platform.x + "%";// uspdated platforms left position 
    gamePlatforms[index].style.top = platform.y + "%";// updates platforms top position 
    gamePlatforms[index].style.width = platform.width + "%";// updates platoforms widtch
    gamePlatforms[index].style.height = platform.height + "px"; // updates platforms height 
});// updates platforms 

function getBallBottom() {//finds the bottom edge of the ball
    return ballY + 3.2;// give the bottom edge of the ball
}
function LandingOnPlatform(platform) {
    let platformLeft = platform.x;
    let platformRight = platform.x + platform.width;

    return ballX >= platformLeft && ballX <= platformRight && getBallBottom() >= platform.y;
}
function LandingCheck() {
    for (let platform of platforms) {
        if(BallGoingDown && LandingOnPlatform(platform)) {
            ballY = platform.y -3.2;
            gameball.style.top = ballY + "%";
            jumping = false;
            return true;
        }
    }
    return false;
}
function jump(direction) { // this is how the ball will jump
    let horizontalMovement =0; // sets a variable that meadure horizontal movement
    BallGoingDown = false; //ball isn't curving back yet

    if(direction === "left"){// if jump function is with left specification
        horizontalMovement = -1.5;// the value of horizontal movement is -1.5
    }

    else if (direction === "right"){ //if jump is with right  specification
        horizontalMovement = 1.5; // the value of the horizontal movement is 1.5
    }

    else if (direction === "up"){ //if the jump specification is Up 
        horizontalMovement = 0; // the value of the horizontal movement is o
    }

    ballY -=3;// moves ball up by 3
    ballX += horizontalMovement; //move ball left or right if there is horizontal movement
    gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
    gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball


    setTimeout(function() {
        ballY -=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

        
    },50);

    setTimeout(function() {
        ballY -=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

        
    },100);

    setTimeout(function() {
        ballY -=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

        
    },150);

    setTimeout(function() {
        ballY -=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

    },200);
    BallGoingDown = true; // ball started going back down after the jump
    setTimeout(function() {
        ballY +=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball
     
        if (LandingCheck()) {
        return;// Finish function
        }
    
    },250);

    setTimeout(function() {
        if (!jumping) return;
        ballY +=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

        if (LandingCheck()) {
        return;
        }
    },300);

    setTimeout(function() {

        if (!jumping) return;
        ballY +=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

        if (LandingCheck()) {
        return;// end function 
        }
    },350);

    setTimeout(function() {

        if (!jumping) return;
        ballY +=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

        if (LandingCheck()) {
        return;// end function 
        }
    },400);

    setTimeout(function() {

        if (!jumping) return;
        ballY +=3;// moves ball up by 3
        ballX += horizontalMovement; //move ball left or right if there is horizontal movement
        gameBall.style.left = ballX + "%"; // links the ballx variable to left property of the ball
        gameBall.style.top = ballY +"%";// links the ballY variable to the top property of the ball

         if (LandingCheck()) {// checks if the pall has landed 
        return;//end the function 
        }
    },450);// refreshes at this time 

}// jump function 

function platformMovment() {
    platforms.forEach(function(platform, index){
        platform.x += platform.speed * platform.direction;

        if (platform.x >=75 || platform.x <= 10) {
            platform.direction *= -1; // reverse direction when reaching the edges
        }

        gamePlatforms[index].style.left = platform.x + "%";
        gamePlatforms[index].style.top = platform.y + "%";
        gamePlatforms[index].style.width= platform.width + "%";
        gamePlatforms[index].style.height= platform.height + "px";
    });
}


document.addEventListener("keydown", function(event) { // assigns W, A and D keys jump directions
    if(event.key === "d") {//if d is press 
        
        jumping = true;// jump is in progress
        jump("right");// jump function with right mechanics 
    }

     if(event.key === "a") {//if a is press 
        jumping = true;// jumps is in progress 
        jump("left");//jump function with the left mechanics
    }

    if(event.key === "w") {//if d is press and the pall isnt moving
        jumping = true;// jump is in progress 
        jump("up");// jump with the up mechanics 
    }
}); // key functions 

function startTimer(){// the function the will keep track of the time
    startTime = Date.now() - elapsedTime; // if the timer was paused, this will make sure the time is acurate
    gameTimer = setInterval(function() { // updats time every 1000 mliseconds 
        elapsedTime = Date.now() - startTime; // checks how much time has passes in milliseconds since u started

        let seconds = Math.floor(elapsedTime/1000);// checks for the number of seconds
        let minutes = Math.floor(seconds/60);// checks for the number of minutes 
        seconds = seconds % 60;// calculates the seconds remaining after the minutes

        if(seconds<10) {// if the time is less then 10s
            seconds = "0" + seconds;}// ads a zer if its 0-9 seconds 
 
        liveTimer.textContent = "TIME:" + minutes + ":" + seconds;// displays the time
    }, 1000); // runs once every second
};

instructionButton.addEventListener("click", function() {// instruction button directions
    startScreen.style.display = "none";// dont display the start screen
    instructionScreen.style.display="block"; // display the instruction screen
});       

backButtonInstructionScreen.addEventListener("click", function() {// back button diraxctions 
    instructionScreen.style.display="none"; // dont display the instruction screen anymore 
    startScreen.style.display = "block";// display the staart/main screen now
});

startButton.addEventListener("click", function(){// start button directions
    startScreen.style.display="none";// dont disply the scren
    gameScreen.style.display = "block";// display the game screen
    gameOverlay.style.display = "flex";// display the overlay
    pauseButton.style.display = "none"; // dont display the pause button 
});
    
gameOverlay.addEventListener("click", function() {// game overlay directions 
    gameOverlay.style.display="none"; // dont display the overlay anymore
    pauseButton.style.display="block";// display the pause button now 
    
    elapsedTime = 0 // resets the timer back to 0 to restart the time
    startTimer();// start the timer function again 
    platformTimer = setInterval(platformMovment, 30); // starts the platform movement function every 30 milliseconds
});

pauseButton.addEventListener("click", function() {// pause button directions
    pauseMenu.style.display = "block";// display the pause menu
    pauseOverlay.style.display = "block";// display the pause overlayy screen

    clearInterval(gameTimer); //stops the timer
    pauseStartTime = Date.now();// stores the time when the game was paused so that we can calculate how much time has passed since the game was paused and add it to the start time so that the timer continues from where it left off
    clearInterval(platformTimer);// stops the platforms from  moving
});

resumeButton.addEventListener("click", function() {// resume button directions
    pauseMenu.style.display = "none";// dont display the pause menu
    pauseOverlay.style.display = "none"; // dontdisplay the pause overlay 

    startTime += Date.now() - pauseStartTime;// calculates the time that has passed since the game was paused and adds it to the start time so that the timer continues from where it left off
    startTimer();// start the timer asgians 
    platformTimer = setInterval(platformMovment,30);
});

quitButton.addEventListener( "click", function() {// quit button directions
    
    showScoreScreen();// show the score screen
});

playAgainButton.addEventListener("click", function() {// play again button directions
    scoreScreen.style.display="none";// dont show the score screen
    gameScreen.style.display = "block"// display the gamescreen
    gameOverlay.style.display="Flex";// display the overlay
    pauseButton.style.display = "none";// dont show the pause button

    platforms.forEach(function(platform) {// resers platforms to the original position 
        platform.x = platform.startX;// gets the original position 
    });//reset

    platformMovment();// runs the platform movment function
    elapsedTime = 0;//resets the timer 
    liveTimer.textContent = "TIME:00:00"; // resets the timer display

});

mainMenuButton.addEventListener("click", function() {// main menu button directions 
    scoreScreen.style.display="none";// dont schow the score screen
    gameScreen.style.display="none";// dont show the gamescreen
    startScreen.style.display = "block"; // show startscreen
})

restartButton.addEventListener("click", function() {// restart button directions
    pauseMenu.style.display ="none"; // dont display to pause menu
    pauseOverlay.style.display = "none";// dont display the pause overlay 
    gameScreen.style.display = "block";// ddisplay the gamescreen
    gameOverlay.style.display = "flex";// display the overlay
    pauseButton.style.display = "none";// dont show the pause button
    scoreScreen.style.display = "none";// not show the score screen

    platforms.forEach(function(platform) {// resers platforms to the original position 
        platform.x = platform.startX;// gets the original position 
    });//reset

    platformMovment();// runs the platform movment function
    elapsedTime = 0;// resets the timer 
    liveTimer.textContent = "TIME:00:00";// resets the timer display
});

// scorscreen directions
function showScoreScreen() {//

    //more time suff 
    clearInterval(gameTimer); // stops tracking the time 
     if (pauseStartTime) // if the game was paused
        {elapsedTime = pauseStartTime - startTime; }// collects the final time that was tracked when u were paused
     else{//everything else 
        elapsedTime= Date.now() - startTime;//colects the time u were playing the game
     }
        //for rounding to seconds
    let seconds = Math.floor(elapsedTime/1000);//converts milisecons to seconds 

        //for rounding to minutes
    let minutes = Math.floor(seconds/60); // convers seconds to minutes 
    seconds = seconds % 60;// gets the remaining seconds 

    let displaySeconds = seconds;// sets the display seconds to the seconds variable
    if(seconds <10) {//if its less than 10
        displaySeconds = "0" + seconds;// adds a 0 in front of the seconds 
    }//add a 0 when sconds are less the 10
    finalTime.textContent = minutes+ ":" + displaySeconds;// displays the final time on scorescreen 

    pauseMenu.style.display = "none";// dont display the pause menu
    pauseOverlay.style.display = "none";// dont display the paus overlay
    gameOverlay.style.display = "none";// dont display the overlay
    pauseButton.style.display = "none";// dont display the bpause button 
    scoreScreen.style.display = "flex";// display the scorescreen 
}

