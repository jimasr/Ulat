class Canvas{
    constructor(canvas, cellSize){
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
    }

    setSize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
    }

    setColor(color){
        this.color = color;
    }

    setCellSize(size){
        this.cellSize = size;
    }

    draw(food, snake){
        this.clearCanvas();
        this.drawFood(food);
        this.drawSnake(snake);    
    }
    
    drawSnake(snake){
        this.ctx.drawImage(snake.getHeadImage(), snake.head[0] * this.cellSize, snake.head[1] * this.cellSize, this.cellSize, 10);
        for(const s of snake.body) {
            this.ctx.drawImage(snake.getBodyImage(), s[0] * this.cellSize, s[1] * this.cellSize, this.cellSize, 10);
        }
        this.ctx.drawImage(snake.getTailImage(), snake.tail[0] * this.cellSize, snake.tail[1] * this.cellSize, this.cellSize, 10); 

    }
    
    drawFood(food){
        this.ctx.drawImage(food.getImage(), food.x * this.cellSize, food.y * this.cellSize, 15, 15); 
    }
    
    clearCanvas(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    gameOver(){
        this.clearCanvas();
        this.ctx.font = "bold 98px Chalkduster, fantasy";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game", this.canvas.width/2, this.canvas.height/2 - 50);
        this.ctx.fillText("Over!", this.canvas.width/2, this.canvas.height/2 + 60);

    }
    
}

export { Canvas }