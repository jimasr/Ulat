import { Snake } from './modules/Snake.js';
import { Food } from './modules/Food.js';
import { Canvas } from './modules/Canvas.js';

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
let speed = 5;

let food;
let snake;
let canvas;
let score = 0;
let allowTurn = true;

const canvasFrame = document.querySelector('canvas.frame');
const scoreboard = document.querySelector('#score');

const snakeHead = document.querySelector('img.snake-head');
const snakeBody = document.querySelector('img.snake-body');
const snakeTail = document.querySelector('img.snake-tail');
const foodImage = document.querySelector('img.food');

document.body.addEventListener('keydown', keyPressed);
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

        snake = new Snake(data.snake, [snakeHead, snakeBody, snakeTail]);

        food = new Food(generateRandomCoordinate(), foodImage);

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

}

function playGame() {
    if(gameState == PLAYING) {
        snake.move(direction);

        checkFoodEaten();
        checkColision();

        canvas.draw(food, snake);
    }
    allowTurn = true

    if(gameState == GAME_OVER) {
        canvas.gameOver();
        console.log("Game over");
    }

    setTimeout(playGame, 1000/speed);

}

function checkFoodEaten() {

    if(snake.head[0] == food.x && snake.head[1] == food.y){
        food = new Food(generateRandomCoordinate(), foodImage);
        snake.growSnake(direction);
        addScore();
        addSpeed();
    }

}

function checkColision() {

    //check off-grid value
    if(snake.head[0] < 0 || snake.head[0] >= rows|| snake.head[1] < 0 || snake.head[1] >= cols) {
        console.log("Out of bound"); 
        gameState = GAME_OVER;
    }
    //check head with body or tails
    for(const s of snake.body){
        if(snake.head[0] == s[0] && snake.head[1] == s[1]) {
            console.log("Stop eating yourself");
            gameState = GAME_OVER;
        }
    }

    if(snake.head[0]==snake.tail[0] && snake.head[1] == snake.tail[1]) {
        console.log('Dont bite the tail!');
        gameState = GAME_OVER;
    }

}

function addSpeed(){
    speed += 0.3;
}

function addScore(){
    score++;
    scoreboard.textContent = ("0000" + score).slice(-4);
}

function keyPressed(event){
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
                } else{
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
