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
const s_head = 'hsl(73, 79%, 30%)';
const s_body = 'green';
const s_tail = 'green';
const c_food = 'yellow';

let row;
let cols;
let dir;
let gameState;
let speed = 5;


let food;
let snake;
let score = 0;


const canvas = document.querySelector('canvas.frame');
const ctx = canvas.getContext('2d');
const scoreboard = document.querySelector('#score');

// CLASS //////////////////////////////////////////////

class Snake{
    constructor(array){
        this.head = array[0];
        this.body = array.slice(1, array.length-1);
        this.tail = array[array.length-1];
    }
}

class Food{
    constructor(coordinate){
        this.x = coordinate[0];
        this.y = coordinate[1];
    }
}

// MAIN SETUP //////////////////////////////////////////////

let request = new Request("json/data.json");


fetch(request)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){

        //create canvas
        row = data.dimensions[0];
        cols = data.dimensions[1];

        snake = new Snake(data.snake);
        food = new Food(generateRandomCoordinate());

        createCanvas(row*cellSize, cols*cellSize);
        initGameState();
    })
    .catch(function(err){
        console.log(err);
    });

// DEBOUNCE FUNC, source : https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf //////////

const debounce = (func, delay) => {
    let inDebounce
    return function() {
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

document.body.addEventListener('keydown',keyPressed);

// SPECIFIC SETUP

function initGameState(){
    gameState = INIT;
    direction = RIGHT;


    gameState = PAUSED;
    drawSnake();
    drawFood();

    draw();
}

// MAIN DRAW ///////////////////////////////////////////////

function draw(){
    clearCanvas();
    if(gameState == PLAYING){
        moveSnake();
        foodEaten();
        checkColision();
    }

    drawFood();
    drawSnake();    
    setTimeout(draw, 1000/speed);
}

function drawSnake(){
    ctx.fillStyle = s_head;
    ctx.fillRect(snake.head[0] * cellSize, snake.head[1] * cellSize, cellSize, cellSize);

    ctx.fillStyle = s_body;
    for(const s of snake.body){
        ctx.fillRect(s[0] * cellSize, s[1]*cellSize, cellSize, cellSize);
    }

    ctx.fillRect(snake.tail[0] * cellSize, snake.tail[1] * cellSize, cellSize, cellSize);
}

function moveSnake(){
    //permute tail and head
    snake.body.push(snake.head);
    snake.head = [snake.head[0] + direction[0], snake.head[1] + direction[1]];
    snake.tail = snake.body.shift();
}

function growSnake(){
    snake.body.unshift(snake.tail);
    snake.tail = [snake.tail[0] - direction[0], snake.tail[1] - direction[1]];
}

function drawFood(){
    ctx.fillStyle = c_food;
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

function createCanvas(width, height){
    canvas.width = width;
    canvas.height = height;
}

function clearCanvas(){
    ctx.fillStyle = c_primary;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// EVENT ////////////////////////////////

function foodEaten(){
    if(snake.head[0] == food.x && snake.head[1] == food.y){
        food = new Food(generateRandomCoordinate());
        growSnake();
        addScore();
        addSpeed();
        
    }
}

function checkColision(){
    //check off-grid value
    if(snake.head[0]<0 || snake.head[0]>cols || snake.head[1] < 0 || snake.head[1]>row){
        console.log("Out of bound"); 
    }
    //check head with body or tails
    for(const s of snake.body){
        if(snake.head[0] == s[0] && snake.head[1] == s[1]){
            console.log("Stop eating yourself");
        }
    }

    if(snake.head[0]==snake.tail[0] && snake.head[1] == snake.tail[1]){
        console.log('Dont bite the tail!');
    }

}

function addSpeed(){
    speed += 0.3;
}

function addScore(){
    score++;
    scoreboard.textContent = score;
}

function keyPressed(event){
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
            if(gameState == PAUSED){
                gameState = PLAYING;
            } else{
                gameState = PAUSED;
            }

            break;
    }

}

// UTILITIES ////////////////////////////////

function generateRandomCoordinate(){
    let x = Math.floor(Math.random() * row);
    let y = Math.floor(Math.random() * cols);

    return [x,y];
}