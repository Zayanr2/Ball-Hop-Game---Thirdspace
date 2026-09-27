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
    let guidePath = document.querySelector(".guidePath")
    const platformHolder = document.querySelector(".platformHolder");// these are the platforms that the ball will land on
    const scoreDisplay = document.querySelector(".score"); // the score display on the game screen


    //variables For ingame time calculation 
    let startTime;//stores the time when the timer starts 
    let elapsedTime = 0;// stores the time that has passed in the game
    let gameTimer; // this is what changes the elapsed time every second
    let pauseStartTime; //stors the amount of time the game was paused using the button
    let platformTimer;


    // vriables for moving the ball using the keys 
    let ballY = 75; // bals y cordinat
    let ballX = 50;//bals x cotdinart
    let jumping = false// is the ball currently moving
    let landedPlatform = null;// the ball hasn't landed on any platforms 

    // game variables
    let gameWorking = true;// the game is working right now  soo all  the controls will work 
    let score = 0; // this variable will keep track of the score  and will be used to displat it 
    let platformMoveY = 0;// this will keep track of how far the platforms have move up and down 
    let platformMoveDistance = 0;// this will keep track of how far the platforms have move up and down 

    // these are the platforms and there basic attributes 
    let platforms = []; // where the platforms are stored 

    function makePlatforms(x,y,width,height, opacity, speed, direction) {// this function will make platforms 
        let platform = document.createElement("div");// this will make divs in the html 
        platform.className = "gamePlatform";// this is the class that will be assigned to the divis

        platform.style.left = x + "%"; // links to the left attripute of the function 
        platform.style.top = y + "%"; // links to the top attribute of the funcions 
        platform.style.width = width + "%"; // links ot the width attriptue of the platforms 
        platform.style.height = height + "px"; //height attribute gets linked 
        platform.style.opacity = opacity; // links to the opacity attribute of the platforms

        platformHolder.appendChild(platform); // this adds platfoms to holder to show on screen

        let scale = 0.7 +((y-43)/22);// the scale of the platform is identitical to the on eing used in the moving platform function 
        platform.style.width = (width * scale) + "%";// shows the true size and scale of the platform 
        platform.style.height = (height *scale) + "px";// shows the tru size and scale of the platform 

        platforms.push({
            element: platform, // the elemnt that was created
            x: x, //x value
            startX: x, //starting x value 
            y: y, //y value 
            width: width,  // width value
            height: height, // height value
            speed: speed, // speed 
            direction: direction,// directin 
            opacity: opacity // opacity value
        })
    }

    makePlatforms(56,65,12,18,1, 0.9,1);// makes the first platform
    makePlatforms(35,54,12,18,0.5, 1,-1);// makes the first platform
    makePlatforms(55,43,12,18,0.4, 1.1,1);// makes the first platform

    function landingCheck() {// this function checks if the platfom landed 
        for(let platform of platforms) {// in platforms look at platform 
            let scale = 0.7 + ((platform.y - 43) / 22);
            let platformWidth = platform.width *scale;  
            let platformLeft = platform.x;// the left is the x cordinate 
            let platformRight = platform.x + platformWidth;// the right is the left plus the wides 

            if (ballX >= platformLeft && ballX <= platformRight){// if the ball is inside the platform 
                
                if(ballY >= platform.y - 3.2 && ballY <= platform.y + 3.2){// and if the ball is on the platform

                    ballY = platform.y - 3.2;// the ball is in the center of the platform(ontop)
                    gameBall.style.top = ballY +"%";// links the tip atribute iwht the y axis 

                    landedPlatform = platform// the landed platform is this platfomr
                    
                    platformMoveY = 0.5
                    platformMoveDistance = 30;
                    score += 1; // the score increaces py on if u land succesfull on the platfomr 
                    scoreDisplay.textContent = "SCORE:" + score; // the score display shos score and what ever the number is s
                    return true;// yess landed 
                }   

            }       
        }
    return false;// no landed
    }// end of function 

    function resetBall() {// resets the ball tot he original position 
        ballX = 50;// setts the balls x back to 50
        ballY = 75;// sets the balls y back to 50 
        jumping  = false;// sets the jumping variable to no 

        gameBall.style.left = ballX + "%";// links balls x to the balls x attribuite 
        gameBall.style.top = ballY + "%";// links the balls y to the y attribute 
    }

    function getBallBottom() {//finds the bottom edge of the ball
        return ballY + 3.2;// give the bottom edge of the ball
    }
 
    function ShowGuidePath(direction) {// this function shows the guild path 
        
        let horizontalMovement = 0; // how much the ball moves sideways 

        if (direction === "left"){// if the direction is left 
            horizontalMovement = -1.5;// move -1.5 ( moveing left)
        }
        else if (direction === "right"){// if the direction is right  
            horizontalMovement = 1.5;// mov3 1.5 left 
        }
        else if (direction === "up"){// if its up 
            horizontalMovement = 0;// don't move any sides 
        }

        let horizontalDistance = horizontalMovement * 8;// total distance 

        let jumpStartX = ballX;// balls x is where the jum start 
        let jumpStartY = ballY;// pal y is where the jump start
        let jumpHeight = 15;// the arch of the ball
        let verticalDistance = -11;// how far the ball will go upward 
        
        for (let i = 0; i < 13; i++) {// maxe the dots for the paths (10 dots)
            let dot = document.createElement("div");// lets the code make divs in the HTML 
            dot.className = "guideDot";// this will be the class name 

            let progress = i /13;// how far along the jump the dot is 
            let verticalOffset = Math.sin(progress * Math.PI) * jumpHeight; // the math that gives the jump curve 

            let  dotY = jumpStartY +(verticalDistance * progress) - verticalOffset;// where the dots go on the screen  (y)
            let dotX = jumpStartX + (horizontalDistance * progress); // where the dots go horrizontally 

            dot.style.top = dotY + "%";// links to the top attripute 
            dot.style.left = dotX + "%";// links to the  left attrupute 

            guidePath.appendChild(dot);// ads the dot to the quildpath so its on the screen 
        }
    }
    function ShowPaths() {// draws all the paths together 
        ShowGuidePath("left") // use the gide function left 
        ShowGuidePath("right")// use the guide function right 
        ShowGuidePath("up")// use the guild function up 
        }// shows all the paths the pall can take 

    function jump(direction) {// this si how the ball jumps 
        if (!gameWorking) return; // basicaly if the game ising working then the  jumps wont work, this is usefull fpre after the game has eneded 
        if (jumping) return;// if  your juming then 
        jumping = true;// jumping is in progres 
        landedPlatform = null;

        let horizontalMovement = 0;// horizontal movment is 0

        if (direction === "left"){// if the direction is left 
            horizontalMovement = -1.5;// then the movment is twards left 
        }
        else if (direction === "right"){// if th direction  is right 
            horizontalMovement = 1.5;// then the movment is twards the right 
        }
        else if (direction === "up"){// if the direction is only up 
            horizontalMovement = 0;// then the movment side to side is none 
        }

        let horizontalDistance = horizontalMovement * 8;// this calculates the total horizontal distance 

        let jumpStartX = ballX;// the balls current x is where the jump will start 
        let jumpStartY = ballY;// the balls current y is where the jump will stard 
        let jumpHeight = 15;// the balls arch 
        let jumpProgress = 0;// how much of the jump as happend 
        let verticalDistance = -11;// total distance up 

        let jumpTimer = setInterval(function() { // does the jump ever 15 seconds 
        jumpProgress += 0.1;// 10 percent each times 
        if (jumpProgress >1){// the jump stops at 100 percent 
            jumpProgress =1;//cant go over 
        }

        let verticalOffset = Math.sin(jumpProgress * Math.PI) * jumpHeight;// the curve of the jump, the math behind it 

        ballY = jumpStartY + (verticalDistance * jumpProgress) - verticalOffset;// where the ball will be now y position 
        gameBall.style.top = ballY + "%";//inks to the acctual ball y attribute 

        ballX = jumpStartX + (horizontalDistance*jumpProgress);// where the x of the ball will be after the jump 
        gameBall.style.left = ballX + "%";// links to the acctual ball x attribute 

        if (jumpProgress >=1) {// if the jump has reached the final position
            clearInterval(jumpTimer)// stops the jump 
            jumping = false;// yhour not jumping 

            guidePath.innerHTML = "";// removes the old path

            if(!landingCheck()) {// it the ball missed the platform 
                gameWorking = false;// the game has finish/ended 
                clearInterval(platformTimer);// this will stop the platforms
                clearInterval(gameTimer);// the timer will stop iff u miss 

                elapsedTime = Date.now() - startTime;// finds out the toal amount of time played
                
            }
            else {
                ShowPaths();// shows the guild paths
            }
        }
        }, 30);// every 30 milliseconds 
    }

    function platformMovment() {// move the platforms 
        platforms.forEach(function(platform, index){// each platform 
            platform.x += platform.speed * platform.direction;// platforms x cordinate changes based on the speed , and direction 

            if (platform.x >=75 || platform.x <= 10) {// if the platfrom is at on edge or the other edge 
                platform.direction *= -1; // reverse direction when reaching the edges
                
            }

            if (platformMoveY > 0) {
                platform.y +=platformMoveY;
                platformMoveDistance -= platformMoveY;
                    if (platformMoveDistance <= 0) {
                        platformMoveY = 0;
                        platformMoveDistance = 0;
                }
            }

            let scale = 0.7 +((platform.y -43)/22);
            let newOpacity = 0.4 +((platform.y -43) / 22) *0.6;

            platform.element.style.left = platform.x + "%";// link left to the x attribute 
            platform.element.style.top = platform.y + "%";// links top to the y attripute 
            platform.element.style.width= (platform.width * scale) + "%";// links width to the width attribut 
            platform.element.style.height= (platform.height * scale) + "px";// inks height to the height attripute 
            platform.element.style.opacity= Math.min(newOpacity, 1);// links ipacity to the platforms opacity atribute 

            if (landedPlatform === platform) {// if the laded platform is a platfomr 
                let scale = 0.7 + ((platform.y - 43) / 22);
                let platformWidth = platform.width *scale;

                ballX = platform.x + platformWidth /2;// then the bals x valy becaome the sma e as the platfoms x value 
                gameBall.style.left = ballX + "%"// lins the left function witht he bals x cordinate 
                
                ballY = platform.y -3.2;
                gameBall.style.top = ballY + "%";

                guidePath.innerHTML = "";// remove old pats 
                ShowPaths();// shows current paths 
            
            }// this will make the ball move lefte anrd right witht he platform after landing 

        });// every platform oves 
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
        ShowPaths()// shows the balls baths that can be taken right now 
        elapsedTime = 0 // resets the timer back to 0 to restart the time
        startTimer();// start the timer function again 
        gameWorking= true;// the game will work
        platformTimer = setInterval(platformMovment, 30); // starts the platform movement function every 30 milliseconds
        
    });

    pauseButton.addEventListener("click", function() {// pause button directions
        pauseMenu.style.display = "block";// display the pause menu
        pauseOverlay.style.display = "block";// display the pause overlayy screen
        gameWorking = false; // the controls wont work 
        clearInterval(gameTimer); //stops the timer
        pauseStartTime = Date.now();// stores the time when the game was paused so that we can calculate how much time has passed since the game was paused and add it to the start time so that the timer continues from where it left off
        clearInterval(platformTimer);// stops the platforms from  moving
    });

    resumeButton.addEventListener("click", function() {// resume button directions
        pauseMenu.style.display = "none";// dont display the pause menu
        pauseOverlay.style.display = "none"; // dontdisplay the pause overlay 
        gameWorking = true;// the game will work again 
        startTime += Date.now() - pauseStartTime;// calculates the time that has passed since the game was paused and adds it to the start time so that the timer continues from where it left off
        startTimer();// start the timer asgians 
        platformTimer = setInterval(platformMovment,30);
    });

    quitButton.addEventListener( "click", function() {// quit button directions
        
        showScoreScreen();// show the score screen
        gameWorking = false;// the controls wont work anymore 
        score = 0; //  the score restes 
        document.querySelector(".score").textContent = "Score: 0";
    });

    playAgainButton.addEventListener("click", function() {// play again button directions
        scoreScreen.style.display="none";// dont show the score screen
        gameScreen.style.display = "block"// display the gamescreen
        gameOverlay.style.display="Flex";// display the overlay
        pauseButton.style.display = "none";// dont show the pause button

        platforms.forEach(function(platform) {// resers platforms to the original position 
            platform.x = platform.startX;// gets the original position 
        });//reset
        score = 0; //  the score restes 
        scoreDisplay.textContent = "SCORE: 0";// resets the score display
        gameWorking = true;// the game will work again 
        platformMovment();// runs the platform movment function
        resetBall();// this resets the ball to the original position 
        landedPlatform = null// there is no landed platform
        guidePath.innerHTML = "";// removes the old guild path
        elapsedTime = 0;//resets the timer 
        liveTimer.textContent = "TIME:00:00"; // resets the timer display

    });

    mainMenuButton.addEventListener("click", function() {// main menu button directions 
        scoreScreen.style.display="none";// dont schow the score screen
        gameScreen.style.display="none";// dont show the gamescreen
        startScreen.style.display = "block"; // show startscreen
        gameWorking = false; // the controls won wok 
        resetBall();// resets the ball to the original position 
        score = 0; //  the score restes 
        scoreDisplay.textContent = "SCORE: 0";// resets the score display
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

         score = 0; //  the score restes 
        scoreDisplay.textContent = "SCORE: 0";// resets the score display

        gameWorking = true;// the game is playables 
        platformMovment();// runs the platform movment function
        resetBall();//this resets the ball to the pikining position 
        guidePath.innerHTML = ""; // remvoed the old paths from the screen 
        landedPlatform = null// there is no landed platform
        elapsedTime = 0;// resets the timer 
        liveTimer.textContent = "TIME:00:00";// resets the timer display
    });

    // scorscreen directions
    function showScoreScreen() {//

        //more time suff 
        clearInterval(gameTimer); // stops tracking the time 
        
        clearInterval(gameTimer); // stops tracking the time
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
        finalScore.textContent = score;// the final score diasplay gets the valu from the score variable 
        pauseMenu.style.display = "none";// dont display the pause menu
        pauseOverlay.style.display = "none";// dont display the paus overlay
        gameOverlay.style.display = "none";// dont display the overlay
        pauseButton.style.display = "none";// dont display the bpause button 
        scoreScreen.style.display = "flex";// display the scorescreen 
    }
