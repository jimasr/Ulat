const INIT = 1;
const PLAYING = 2;
const PAUSED = 3;
const GAME_OVER = 4;

//3 block per second
const speed = 3;

const UP = [0, 1];
const RIGHT = [1, 0];
const DOWN = [0, -1];
const LEFT = [-1, 0];

let direction = RIGHT;
let gameState = 2;
let snake = []


let request = new Request("JSON/data.json");



// MAIN SETUP //////////////////////////////////////////////

class Snake{
    constructor(array){
        this.head = array[0];
        this.body = array.slice(1, array.length-1);
    }
}


function setup(request){

    fetch(request)
    .then(function(resp){
        return resp.json();
    })
    .then(function(data){
        initGame(data);
    })
    .catch(function(err){
        console.log(err);
    });
}
// SPECIFIC SETUP

function initGame(data){
    snake = data.snake;

    renderGrid(data.dimensions);
    drawSnake(snake);
    drawFood();

    moveSnake(snake)
}

function renderGrid(dimension){
    x = dimension[0];
    y = dimension[1];

    const frame = document.querySelector('div.frame');
    const grid = document.querySelector('div#hide');

    for(let i = 0; i<x; i++){
        for(let j=0; j<y ; j++){
            let clone = grid.cloneNode(false);
            clone.removeAttribute("id");
            frame.appendChild(clone);
        }
    }
}



// MAIN DRAW ///////////////////////////////////////////////




//Change game state
function updateScore(value){
    const score = document.querySelector('h1#score');
    score.textContent = score.textContent + value;
}

async function moveSnake(snake){
    while(gameState == 2){

        let head = snake[snake.length-1];
        snake.push([head[0] + direction[0], head[1] + direction[1]])
        snake.shift();

        console.log(snake);

        drawSnake(snake)
        await delay(speed);
    }
}

// Draw method to modify the grid
function drawSnake(snake){
    const grids = document.querySelectorAll('div.grid');

    //naive solution reset
    for(const grid of grids){
        if(grid.classList.contains('snake')){
            grid.classList.toggle('snake');
        }
    }

    for(const c of snake){
        let computedIndex = calculateIndex(c);
        grids[computedIndex].classList.toggle('snake');
    }
}

function drawFood(){
    let index = generateRandomFood(400);

    const grids = document.querySelectorAll('div.grid');
    grids[index].classList.toggle('food');
}




function generateRandomFood(size){
    return Math.floor(Math.random() * size);
}


//Function to convert 2D position to 1D array in grid
//Change here 

function calculateIndex(c){
    return c[1]*20 + c[0];
}

function delay(speed) {
    return new Promise(resolve => setTimeout(resolve, 1000/speed));
}

  