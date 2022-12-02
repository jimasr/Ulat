import { Snake } from './modules/Snake.js';
import { Food } from './modules/Food.js';
import { Canvas } from './modules/Canvas.js';
import { toggleModal, toggleGameMode, toggleHighscore, goBack } from './components/popup.js'
import { displayHighscore, setHighscore, getHighscore } from './components/highscore.js'


//enum game state
const INIT = 1;
const PLAYING = 2;
const PAUSED = 3;
const GAME_OVER = 4;

const cellSize = 20;
const UP = [0, -1];
const RIGHT = [1, 0];
const DOWN = [0, 1];
const LEFT = [-1, 0];

const c_primary = 'hsl(73, 97%, 39%)';

let rows;
let cols;
let walls;
let direction;
let gameState;
let speed;

let food;
let snake;
let canvas;
let score;
let allowTurn;

const canvasFrame = document.querySelector('canvas.frame');
const scoreboard = document.querySelector('#score');
const mute = document.querySelector('.mute');
const play = document.getElementById('play');
const mode = document.getElementById('mode');
const back = document.getElementById('return');
const highscore = document.getElementById('highscore');
/************ AUDIO *************/

const eatingAudio = new Audio('./audio/move.mp3');
const gameOverAudio = new Audio('./audio/gameover.mp3');
const highScoreAudio = new Audio('./audio/highscore.mp3');

mode.addEventListener('click', toggleGameMode);
back.addEventListener('click', goBack);
mute.addEventListener('click', toggleSound);
highscore.addEventListener('click', ()=> {
    toggleHighscore();
    displayHighscore();
});

play.addEventListener('click', ()=> {
    document.body.addEventListener('keydown', keyPressed);
    setup();
    toggleModal();
});


function setup() {
    let jsonURL = "./json/" + getGameMode() + '.json'
    let request = new Request(jsonURL);

    return fetch(request)
    .then(function(resp) {
        return resp.json();
    })
    .then(function (data) {
        rows = data.dimensions[0];
        cols = data.dimensions[1];
        speed = data.speed;
        walls = data.walls;

        initGameState();



        canvas = new Canvas(canvasFrame);
        canvas.setSize(rows*cellSize, cols*cellSize);
        canvas.setColor(c_primary);
        canvas.setCellSize(cellSize);
        canvas.setWalls(walls);

        snake = new Snake(data.snake);

        food = new Food(generateRandomCoordinate());

        canvas.draw(food, snake, direction);

        playGame();
        
    })
    .catch(function(err) {
        console.log(err);
    });

}

function initGameState() {

    gameState = INIT;
    direction = RIGHT;
    allowTurn = true;

    score = 0;

}

function playGame() {

    if(gameState == PLAYING) {
        if(checkColision()) {
            gameState = GAME_OVER;
        }
        if(checkFoodEaten()) {
            snake.growSnake(direction);

            food = new Food(generateRandomCoordinate());
            addScore();
            addSpeed();
            eatingAudio.play();
        } else {
            snake.move(direction);
        }
        canvas.draw(food, snake, direction);
    }

    allowTurn = true

    if(gameState == GAME_OVER) {
        let scores = getHighscore();
        if(isNewHighscore(scores)){
            canvas.newHighscore();
            highScoreAudio.play();
            
            setTimeout(() => {
                let name = prompt("New Highscore! Enter your name")
                setHighscore(scores, score, name);   
            }, 20);
        } else {
            gameOverAudio.play();
            canvas.gameOver();
        }
        setTimeout(() => {
            scoreboard.textContent = "0000";
            canvas.clearCanvas();
            toggleModal();
        }, 3000);
    } else { 
        setTimeout(playGame, 1000/speed);
    }
}

function checkFoodEaten() {
    if(snake.head[0] + direction[0] == food.x && snake.head[1] + direction[1] == food.y){
        return true;
    }
    return false;
}

function checkColision() {
    let collided = false;
    //check off-grid value
    if(snake.head[0] < 0 || snake.head[0] >= rows|| snake.head[1] < 0 || snake.head[1] >= cols) {
        collided = true;
    } else if(snake.head[0]==snake.tail[0] && snake.head[1] == snake.tail[1]) {
            collided = true;
    } else {
        //check head with body or tails
        for(const s of snake.body){
            if(snake.head[0] == s[0] && snake.head[1] == s[1]) {
                collided = true;
            }
        }

        for(const wall of walls){
            if(snake.head[0] == wall[0] && snake.head[1] == wall[1]) {
                collided = true;
            }
        }
    }

    return collided

}

function addSpeed() {
    speed += 0.1;
}

function addScore() {
    score++;
    scoreboard.textContent = ("0000" + score).slice(-4);
}

function keyPressed(event) {
    if(allowTurn && gameState != GAME_OVER){
        switch(event.code){
            case "ArrowRight":
                if((direction == UP || direction == DOWN) && gameState == PLAYING){
                    direction = RIGHT;
                }

                if(gameState == INIT) {
                    gameState = PLAYING;
                }
    
                break;
            
            case "ArrowLeft":
                if ((direction == UP || direction == DOWN) && gameState == PLAYING){
                    direction = LEFT;
                }

                if(gameState == INIT) {
                    gameState = PLAYING;
                }
                break;
    
            case "ArrowUp":
                if ((direction == LEFT || direction == RIGHT) && gameState == PLAYING){
                    direction = UP;
                }

                if(gameState == INIT) {
                    gameState = PLAYING;
                }
                break;
    
            case "ArrowDown":
                if((direction == LEFT || direction == RIGHT) && gameState == PLAYING){
                    direction = DOWN;
                }

                if(gameState == INIT) {
                    gameState = PLAYING;
                }
                break;
            
            case "Space":
                if(gameState == PAUSED || gameState == INIT){
                    gameState = PLAYING;
                } else {
                    gameState = PAUSED;
                }
                break;
        }
        allowTurn = false;
    }
}

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) - min);
}

function generateRandomCoordinate(){
    let x = generateRandomNumber(0, rows);
    let y = generateRandomNumber(0, cols);

    //quick scan
    if(!verifyCoordinate([x,y])) {
        let i = 0;
        let j = 0;
        while(i<rows) {
            while(j<cols) {
                if(verifyCoordinate([i,j])) {
                    return [i,j];
                }
                j++;
            }
            i++;
        }
    }
    return [x,y];
}

function verifyCoordinate(coordinate) {
    let x = coordinate[0];
    let y = coordinate[1];
    let verified = true;
    if((snake.head.x === x && snake.head.y === y )) {
        verified = false;
    } else if((snake.tail.x === x && snake.tail.y == y)) {
        verified = false;
    } else {
        for(const body of snake.body) {
            if(body[0] === x && body[1] === y) {
                verified = false;
            }
        }

        for(const wall of walls) {
            if(wall[0] == x && wall[1] == y) {
                verified = false;
            }
        }
    }
    return verified;
}

function isNewHighscore(scores){
    for(let s of scores) {
        if(s == null || s == 'undefined') {
            s = {
                name:"Unknown",
                score: 0
            };
        }
        if(s.score <= score){
            return true;
        }
    
    }

    return false;
}

function toggleSound(){
    const paths = mute.querySelectorAll('path');
    for(const path of paths){
        path.classList.toggle('hide');
    }

    if(eatingAudio.muted && gameOverAudio.muted && highScoreAudio.muted) {
        eatingAudio.muted = false;
        gameOverAudio.muted = false;
        highScoreAudio.muted = false;
    } else {
        eatingAudio.muted = true;
        gameOverAudio.muted = true;
        highScoreAudio.muted = true;
    }
}

function getGameMode() {
    const selected = document.querySelector('.selected');

    return selected.value;
}
