import { Snake } from './modules/Snake.js';
import { Food } from './modules/Food.js';
import { Canvas } from './modules/Canvas.js';
import { activate } from './components/popup.js'

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

// COLOR ////////////////////

const c_primary = 'hsl(73, 97%, 39%)';

var rows;
let cols;
let direction;
let gameState;
let speed;

let food;
let snake;
let canvas;
let score;
let allowTurn = true;

const canvasFrame = document.querySelector('canvas.frame');
const scoreboard = document.querySelector('#score');
const mute = document.querySelector('.mute');

//AUDIO /////////////////////////
const eatingAudio = new Audio('./audio/move.mp3');
const gameOverAudio = new Audio('./audio/gameover.mp3');
const highScoreAudio = new Audio('./audio/highscore.mp3');


document.body.addEventListener('keydown', keyPressed);
mute.addEventListener('click', toggleSound);

let dataPromise = getData();

function getData() {
    let request = new Request("./json/data.json");

    return fetch(request)
    .then(function(resp) {
        return resp.json();
    })
    .then(function (data) {
        rows = data.dimensions[0];
        cols = data.dimensions[1];

        initGameState();

        canvas = new Canvas(canvasFrame);
        canvas.setSize(rows*cellSize, cols*cellSize);
        canvas.setColor(c_primary);
        canvas.setCellSize(cellSize);

        snake = new Snake(data.snake);

        food = new Food(generateRandomCoordinate());

        canvas.draw(food, snake);
        playGame();
        
    })
    .catch(function(err) {
        console.log(err);
    });

}

// SPECIFIC SETUP

function initGameState() {

    gameState = INIT;
    direction = RIGHT;

    score = 0;
    speed = 5;

}

function playGame() {

    if(gameState == PLAYING) {
        if(checkColision()) {
            gameState = GAME_OVER;
        }
        if(checkFoodEaten()) {
            snake.growSnake(direction);
        } else {
            snake.move(direction);
        }
        canvas.draw(food, snake);
    }

    allowTurn = true

    if(gameState == GAME_OVER) {
        if(isNewHighscore()){
            highScoreAudio.play();
            canvas.newHighscore();
        } else {
            gameOverAudio.play();
            canvas.gameOver();
        }
        setTimeout(() => {
            activate();
            getData();  
            scoreboard.textContent = "0000";
        }, 2000);
    } else { 
        setTimeout(playGame, 1000/speed);
    }
}

function checkFoodEaten() {
    if(snake.head[0] + direction[0] == food.x && snake.head[1] + direction[1] == food.y){
        food = new Food(generateRandomCoordinate());
        addScore();
        addSpeed();

        eatingAudio.play();

        return true;
    }
    return false;
}

function checkColision() {
    let collided = false;
    //check off-grid value
    if(snake.head[0] < 0 || snake.head[0] >= rows|| snake.head[1] < 0 || snake.head[1] >= cols) {
        collided = true;
    }
    //check head with body or tails
    for(const s of snake.body){
        if(snake.head[0] == s[0] && snake.head[1] == s[1]) {
            collided = true;
        }
    }

    if(snake.head[0]==snake.tail[0] && snake.head[1] == snake.tail[1]) {
        collided = true;
    }

    return collided

}

function addSpeed() {
    speed += 0.3;
}

function addScore() {
    score++;
    scoreboard.textContent = ("0000" + score).slice(-4);
}

function keyPressed(event) {
    if(allowTurn){
        switch(event.code){
            case "ArrowRight":
                if((direction == UP || direction == DOWN) && gameState == PLAYING){
                    direction = RIGHT;
                }
    
                break;
            
            case "ArrowLeft":
                if ((direction == UP || direction == DOWN) && gameState == PLAYING){
                    direction = LEFT;
                }
                break;
    
            case "ArrowUp":
                if ((direction == LEFT || direction == RIGHT) && gameState == PLAYING){
                    direction = UP;
                }
                break;
    
            case "ArrowDown":
                if((direction == LEFT || direction == RIGHT) && gameState == PLAYING){
                    direction = DOWN;
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

// UTILITIES ////////////////////////////////

function generateRandomCoordinate(){
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * cols);

    return [x,y];
}

function isNewHighscore(){
    const storage = window.localStorage;
    let highest = storage.getItem("score");

    if(highest == undefined){
        highest = 0;
    }

    if(highest < score){
        storage.setItem("score", score);
        return true;
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
