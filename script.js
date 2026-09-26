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
    let currentPlatform = null;//


    // variables for the platform movment and duplication
    let platforms = [
        {
            x:56,// x value 
            startX:56,// starting x value helps to rested 
            y:65,// y value 
            width:18,//width 
            height:20,// height 
            speed:0.9,// speed that the platform moves 
            direction:1,// direction of the platform 
            opacity:1,// how clear the platform is 

        },
        {
            x:35,// x value 
            startX:35,// the first ex value of the platform helps to reset 
            y:52,// y value  
            width:13,// widthc 
            height:18,// height 
            speed:1,// speed of the platform 
            direction:-1,// direction of the platform 
            opacity: 0.5,// how clear is the platform 

        }// platforms 
    ];
    platforms.forEach(function(platform, index) {
        gamePlatforms[index].style.left = platform.x + "%";// uspdated platforms left position 
        gamePlatforms[index].style.top = platform.y + "%";// updates platforms top position 
        gamePlatforms[index].style.width = platform.width + "%";// updates platoforms widtch
        gamePlatforms[index].style.height = platform.height + "px"; // updates platforms height 
        gamePlatforms[index].style.opacity= platform.opacity; // updates the platforms transperency 

    });// updates platforms 

    function resetBall() {
        ballX = 50;// setts the balls x back to 50
        ballY = 75;// sets the balls y back to 50 
        jumping  = false;// sets the jumping variable to no 
        BallGoingDown =  false;// sets the ball is going downn variable to no 

        currentPlatform = null;
        gameBall.style.left = ballX + "%";// links balls x to the balls x attribuite 
        gameBall.style.top = ballY + "%";// links the balls y to the y attribute 
    }// resets the ball tot he original position 

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
                gameBall.style.top = ballY + "%";

                currentPlatform = platform;
                jumping = false;
                BallGoingDown = false;
                return true;
            }
        }
        return false;
    }
    
    function jump(direction) {
        if (jumping) return;

        jumping = true;
        BallGoingDown = false;

        let horizontalMovement = 0;

        if (direction === "left"){
            horizontalMovement = -1;
        }
        else if (direction === "right"){
            horizontalMovement = 1;
        }
        else if (direction === "up"){
            horizontalMovement = 0;
        }

        let horizontalDistance = horizontalMovement * 8;

        let jumpStartX = ballX;
        let jumpStartY = ballY;
        let jumpHeight = 15;
        let jumpProgress = 0;
        

        let jumpTimer = setInterval(function() {
        jumpProgress += 0.1;
        if (jumpProgress >1){
            jumpProgress =1;
        }

        let verticalOffset = Math.sin(jumpProgress * Math.PI) * jumpHeight;

        ballY = jumpStartY - verticalOffset;
        gameBall.style.top = ballY + "%";

        ballX = jumpStartX + (horizontalDistance*jumpProgress);
        gameBall.style.left = ballX + "%";

        if (jumpProgress >=1) {
            clearInterval(jumpTimer)
            jumping = false;
            BallGoingDown = false;
        }
        }, 30);
    }

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
            gamePlatforms[index].style.opacity= platform.opacity;
        });
    }


    document.addEventListener("keydown", function(event) { // assigns W, A and D keys jump directions
        if(event.key === "d") {//if d is press 
            
            jump("right");// jump function with right mechanics 
        }

        if(event.key === "a") {//if a is press 
            jump("left");//jump function with the left mechanics
        }

        if(event.key === "w") {//if d is press and the pall isnt moving
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
        resetBall();// this resets the ball to the original position 
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
        resetBall();//this resets the ball to the pikining position 
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

