import {Sprite} from './sprite.js'; // Import sprite class from script.js to use for obstacles dimensions

// define Game states to define specific actions to be carried out at different stages of the game
const state = {
    // both current and the game_begin are set to 0 to change game state using them as the base state
    current: 0,
    game_begin: 0,
    game_playing: 1,
    game_over:2,
}

// Display the bird at the home screen
const Level = document.getElementsByClassName("playgame");
let b;
for (b = 0; b < Level.length; b++) {
    Level[b].innerHTML = "<img src=\"../Images/displaybird.png\" class='starterBirdImage'/>";
}


// set default value of frames to 0, this is to be incremented to simulate moving pipes
let frames = 0;
let score = 0;



// Creation of the main function containing the game
function SoarHigh() {
    document.getElementById('eszlevel').addEventListener("click", function () {
        playgame();
    });

    // Get the Game Canvas to be used for the game by the ID
    const GameCanvas = document.getElementById("StarterCanvas");

    // Create a variable context that gives access to the use of 2d drawing tools
    const context = GameCanvas.getContext("2d");
    context.canvas.width = 600; // specify width of canvas
    context.canvas.height = 780; // specify height of canvas


    // Create new html image element instances
    const gamebackground = new Image();
    gamebackground.src = "../Images/flappy-submarine-game-over.png";

    const gameContent = new Image();
    gameContent.src = "../Images/pinkbird.png";

    const gamebackgroundBase = new Image();
    gamebackgroundBase.src = "../Images/LA.png";

    const startGameIcon = new Image();
    startGameIcon.src = "../Images/GetReadyTitle.png";

    const restartGameIcon = new Image();
    restartGameIcon.src = "../Images/GameOver.png";

    const Tpipe = new Image();
    Tpipe.src = "../Images/coralTop.png";

    const Bpipe = new Image();
    Bpipe.src = "../Images/coral.png";

    function playgame() {

        const remdiv = document.getElementById('Title');
        remdiv.replaceChildren(); // Remove the title from the canvas

        const remdiv1 = document.getElementById('ControlEz');
        remdiv1.replaceChildren(); // Remove the play button from the canvas

        const remdiv2 = document.getElementById('LinkToLB');
        remdiv2.replaceChildren(); // Remove the leaderboard button from the canvas


        // Use an event listener to navigate through the game states by clicking on the canvas and running  the functions accordingly
        GameCanvas.addEventListener("click", function (evt) {
            switch (state.current) {
                case state.game_begin:
                    state.current = state.game_playing;
                    break;
                case state.game_playing:
                    avatar.ControlBird();
                    break;
                case state.game_over:
                    pipes.reset();
                    score.reset();
                    state.current = state.game_begin;
                    break;
            }
        })

        // Create the img variable which displays a start button representation to begin the game
        let startGame = {
            // this function draws the referenced image using specific dimensions provided
            draw: function () {

                // Use an if statement to only draw the image if the game state is in the game begin state
                if (state.current === state.game_begin) {
                    context.drawImage(startGameIcon,
                        0,      // X position of the start of the image in img file
                        0,      // Y position of the start of the image in img file
                        6090,   // Width of the image in file
                        3570,    // Height of image in file
                        120,    // X position on canvas
                        300,    // Y position on canvas
                        350,    // Width of image on canvas
                        200)     // Height of the image on the canvas
                }
            }

        }

        // Use an if statement to only draw the image if the game state is in the game over state
        // This then prompts the use to click the screen again to restart the game
        let restartGame = {
            draw: function () {
                if (state.current === state.game_over) {
                    context.drawImage(restartGameIcon,
                        0,      // X position of the start of the image in img file
                        0,      // Y position of the start of the image in img file
                        6580,   // Width of the image in file
                        3710,    // Height of image in file
                        120,    // X position on canvas
                        300,    // Y position on canvas
                        350,    // Width of image on canvas
                        200)     // Height of the image on the canvas
                }
            }

        }

        // Creating a variable to draw the background for the game
        let b_Ground = {
            draw: function () {
                context.drawImage(gamebackground, 300, 0, 640, 780, 0, 0, GameCanvas.width + 20, GameCanvas.height - 80);
            }
        }

        // variable that contains functions to draw and constantly move the background
        let Moving_Ground = {
            w: gamebackgroundBase.width, // width of the image file
            x: 0, // X position of the image
            h: GameCanvas.height - 150, // height of the image
            speed: 2,

            // this function draws the referenced image using specific dimensions provided
            draw: function () {
                context.drawImage(gamebackgroundBase, 0, 0, gamebackgroundBase.width, 250, this.x, this.h, GameCanvas.width, GameCanvas.height - 200);
                context.drawImage(gamebackgroundBase, 0, 0, gamebackgroundBase.width, 250, this.x + gamebackgroundBase.width, GameCanvas.height - 150, GameCanvas.width, GameCanvas.height - 200);
            },
            // this function constantly updates the image being used
            update: function () {
                // If statement to only move the ground if the game state is not over or not in the beginning state
                if (state.current !== state.game_over && state.current !== state.game_begin) {
                    // Decrement the x position by the speed until it is equal to half the width, then set the X position back to 0 and repeat
                    this.x = (this.x - this.speed) % (this.w / 2);
                }
            }
        }

        let VelocityY = 0; // variable used in implementing gravity

        const avatar = { // Constant used to draw and update bird
            x: 30,  // X position of the bird on the canvas
            y: 150, // Y position of the bird on the canvas
            w: 50,  // width position of the bird on the canvas
            h: 38,  // height position of the bird on the canvas
            gravity: 0.25, // number used in implementing gravity
            jump: 5.6, // jump variable to move the player up by 5.6 when canvas is clicked
            radius: 12, // the radius of the bird

            draw: function () {

                context.drawImage(gameContent, 0, 0, 34, 24, this.x, this.y /* Y position */, this.w /* width */, this.h);
            },

            // when canvas is game starts the player will move down and when clicked the player then goes up again
            ControlBird: function () {
                VelocityY = -this.jump;
            },

            changeY: function () {
                // Set the start height of the player
                if (state.current === state.game_begin) {
                    this.y = (GameCanvas.height / 2) - 100;
                }
                else if (state.current === state.game_playing) {

                    // if the player is at the same level with the ground, initiate game over
                    if (this.y === 600) {
                        state.current = state.game_over;
                    } else if (this.y > 600) {
                        this.y = 600;
                        VelocityY = 0;
                    } else { // Add the velocity to the y position of the player
                        this.y += VelocityY;
                        VelocityY += this.gravity;

                    }
                }
            }
        }

        // Using the imported class to get the dimensions of the obstacles
        let coralNorth = new Sprite(Bpipe, 0, 0, 26, 200);
        let coralSouth = new Sprite(Tpipe, 0, 0, 26, 200);


        const pipes = {
            // create an array to store the x, y, width and the height of the pipes
            _pipes: [],
            // reset function is called to restart the obstacle positions
            reset: function () {
                this._pipes = [];
            },

            update: function () {
                if (state.current !== state.game_playing) return;

                // after every 100 frames push a new pipe into the array
                if (frames % 100 === 0) {
                    let _y = 1000 - (coralSouth.height + Moving_Ground.h + 200 * Math.random());

                    this._pipes.push({
                        x: 600,
                        y: _y,
                        width: coralSouth.width,
                        height: coralSouth.height
                    });
                }
                for (let i = 0, len = this._pipes.length; i < len; i++) {
                    let p = this._pipes[i];

                    // Collision Detection
                    if (i === 0) { // This references the next pipe approaching the player
                        let cx = Math.min(Math.max(avatar.x + 35, p.x), p.x + p.width); // specifying the contact point on the x-axis
                        let cy1 = Math.min(Math.max(avatar.y + 10, p.y), p.y + p.height); // specifying the contact point on the y-axis for the top pipe
                        // specifying the contact point on the y-axis for the bottom pipe
                        let cy2 = Math.min(Math.max(avatar.y + 25, p.y + p.height + 160), p.y + 2 * p.height + 160);

                        let dx = avatar.x + 35 - cx;  // Gets the difference between the distance on the x position
                        let dy1 = avatar.y + 10 - cy1; // Gets the difference between the distance on the y position of top pipe
                        let dy2 = avatar.y + 25 - cy2; // Gets the difference between the distance on the y position of bottom pipe

                        let d1 = dx * dx + dy1 * dy1;
                        let d2 = dx * dx + dy2 * dy2;
                        let r = avatar.radius * avatar.radius;
                        if (r > d1 || r > d2) {
                            state.current = state.game_over;
                        }
                    }

                    // Moves the pipes from right to left
                    p.x -= 2;

                    // if the x position of the pipe is outside the canvas, remove the pipe from the array
                    if (p.x < -50) {
                        this._pipes.splice(i, 1);

                        // Adds to score each time an obstacle is passed
                        score.value += 1;

                        // gets the highest value
                        score.best = Math.max(score.value, score.best);

                        // gets the information saved under the current user logged in in the session storage
                        let score_ = sessionStorage.getItem("User_logged_in");
                        let newScore_ = JSON.parse(score_); // parse the info retrieved

                        // match the username gotten from the session storage to the corresponding user in the localstorage
                        let Currentscore_ = localStorage.getItem(newScore_[0].Username);
                        let ArrScore = JSON.parse(Currentscore_);

                        // Substitute the value of Score saved in the database, only if the score in the database is less than the user current best score
                        for (const obj of ArrScore) {
                            if (score.best > obj.Score) {
                                obj.Score = score.best;
                            }
                        }

                        // Update the user information
                        localStorage[newScore_[0].Username] = JSON.stringify(ArrScore);
                        i--;
                        len--;
                    }
                }
            },

            // Draw the pipes
            draw: function () {
                for (let i = 0, len = this._pipes.length; i < len; i++) {
                    let pipeX = this._pipes[i];
                    coralNorth.draw(context, pipeX.x, pipeX.y + 160 + pipeX.height);
                    coralSouth.draw(context, pipeX.x, pipeX.y);
                }
            }
        }

        // Initialize constant to display score
        const score = {
            best: parseInt(sessionStorage.getItem("best")) || 0,
            value: 0,

            draw: function () {
                context.fillStyle = "#FFF";
                context.strokeStyle = "#000";

                if (state.current === state.game_playing) {
                    context.lineWidth = 2;
                    context.font = "55px Montserrat";
                    context.fillText(this.value, GameCanvas.width / 2, 50);
                    context.strokeText(this.value, GameCanvas.width / 2, 50);

                }
            },

            reset: function () {
                this.value = 0;
            }
        }

        function draw() {
            b_Ground.draw(); // draw the background
            pipes.draw(); // draw the pipes
            Moving_Ground.draw(); // draw the ground
            avatar.draw(); // draw the player avatar
            startGame.draw(); // draw the startGame img
            restartGame.draw();  // draw the restart img
            score.draw(); // draw the score()
        }

        function update() {
            Moving_Ground.update(); // run function that moved the ground
            avatar.changeY(); // updating the players score
            pipes.update();
        }

        function loop() {
            update();
            draw();
            frames++;
            requestAnimationFrame(loop);
        }

        loop();

    }
}

SoarHigh();
