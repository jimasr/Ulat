/***************** PATH *******************/

const path = 'img/';
const pathHead = path + 'head/';
const pathBody = path + 'body/';
const pathTail = path + 'tail/';
const pathFood = path + 'food/';
const extension = '.png';

/***************** IMG *******************/

const bodyLeft = new Image()
const bodyRight = new Image();
const bodyUp = new Image();
const bodyDown = new Image();

const headLeft = new Image();
const headRight = new Image();
const headUp = new Image();
const headDown = new Image();

const tailLeft = new Image();
const tailRight = new Image();
const tailUp = new Image();
const tailDown = new Image();

const imgFood = new Image();

bodyLeft.src = pathBody + 'body-left' + extension;
bodyRight.src = pathBody + 'body-right' + extension;
bodyUp.src = pathBody + 'body-up' + extension;
bodyDown.src = pathBody + 'body-down' + extension;

headLeft.src =  pathHead + 'head-left' + extension;
headRight.src = pathHead + 'head-right' + extension;
headUp.src = pathHead + 'head-up' + extension;
headDown.src = pathHead + 'head-down' + extension;

tailLeft.src = pathTail + 'tail-left' + extension;
tailRight.src = pathTail + 'tail-right' + extension;
tailUp.src = pathTail + 'tail-up' + extension;
tailDown.src = pathTail + 'tail-down' + extension;

imgFood.src = pathFood + 'food' + extension;


class Canvas {
    constructor(canvas, cellSize) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    setColor(color) {
        this.color = color;
    }

    setCellSize(size) {
        this.cellSize = size;
    }

    setWalls(walls) {
        this.walls = walls;
    }

    draw(food, snake, direction) {
        this.clearCanvas();
        this.drawWall();
        this.drawFood(food);
        this.drawSnake(snake , direction);    
    }
    
    drawSnake(snake, direct) {
        let direction = this.translateDirection(direct[0], direct[1]);
        let image = this.getHeadImage(direction);
        //draw head
        this.ctx.drawImage(
            image, 
            snake.head[0] * this.cellSize, 
            snake.head[1] * this.cellSize, 
            this.cellSize , 
            this.cellSize
        );

        let i = -1
        let j = i + 1;

        while(j < snake.body.length) {
            if(i<0) {
                //draw first part of body
                if(snake.body.length < 2) {
                    direction = this.getDirection(snake.head, snake.body[j])
                    image = this.getBodyImage(direction);
                } else {
                    //snake.body[1] is the second last body part
                    direction = this.getDirection(snake.body[1], snake.body[j])
                    image = this.getBodyImage(direction);
                }
 
            } else {
                direction = this.getDirection(snake.body[j], snake.body[i]);
                image = this.getBodyImage(direction);
            }

            this.ctx.drawImage(
                image,
                snake.body[j][0] * this.cellSize, 
                snake.body[j][1] * this.cellSize, 
                this.cellSize, 
                this.cellSize);

            i++;
            j++;
        }

        //draw tail
        direction = this.getDirection(snake.body[0], snake.tail);
        image = this.getTailImage(direction)

        this.ctx.drawImage(
            image, 
            snake.tail[0] * this.cellSize, 
            snake.tail[1] * this.cellSize, 
            this.cellSize, 
            this.cellSize
        ); 

    }
    
    drawFood(food) {

        this.ctx.drawImage(
            imgFood, 
            food.x * this.cellSize, 
            food.y * this.cellSize, 
            this.cellSize, 
            this.cellSize
        ); 
    }

    drawWall() {
        for(const wall of this.walls) {
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(wall[0] * this.cellSize, wall[1] * this.cellSize, this.cellSize, this.cellSize);
        }
    }
    
    clearCanvas() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameOver() {
        this.clearCanvas();
        this.ctx.font = "bold 80px Chalkduster, fantasy";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game", this.canvas.width/2, this.canvas.height/2 - 50);
        this.ctx.fillText("Over!", this.canvas.width/2, this.canvas.height/2 + 60);

    }

    newHighscore() {
        this.clearCanvas();
        this.ctx.font = "bold 80px Chalkduster, fantasy";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("New", this.canvas.width/2, this.canvas.height/2 - 50);
        this.ctx.fillText("Highscore!", this.canvas.width/2, this.canvas.height/2 + 60);
    }

    //reverse search of direction for snake parts
    //c1 for before and c2 for after
    getDirection(c1, c2) {
        let x1 = c1[0];
        let y1 = c1[1];

        let x2 = c2[0];
        let y2 = c2[1];

        let deltaX = x1 - x2;
        let deltaY = y1 - y2;

        return this.translateDirection(deltaX, deltaY);
    }

    translateDirection(deltaX, deltaY) {
        let direction;
        if(deltaX == 1 && deltaY == 0) {
            direction = "right";
        } else if(deltaX == -1 && deltaY == 0) {
            direction = "left"
        } else if(deltaX == 0 && deltaY == 1) {
            direction = "down";
        } else {
            direction = "up";
        }
        return direction;
    }

    getBodyImage(direction) {
        switch(direction) {
            case "up":
                return bodyUp;
            case "down":
                return bodyDown;
            case "left":
                return bodyLeft;
            case "right":
                return bodyRight;
        }       
    }

    getHeadImage(direction) {
        switch(direction) {
            case "up":
                return headUp;
            case "down":
                return headDown;
            case "left":
                return headLeft;
            case "right":
                return headRight;
        }    
    }


    getTailImage(direction) {
        switch(direction) {
            case "up":
                return tailUp;
            case "down":
                return tailDown;
            case "left":
                return tailLeft;
            case "right":
                return tailRight;
        }    
    }
    
}

export { Canvas }