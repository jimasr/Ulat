class Snake{
    /**
     * Constructor Snake
     * @param {Array} coordinates Position of snake
     */
    constructor(coordinates){
        this.head = coordinates[0];
        this.body = coordinates.slice(1, coordinates.length-1);
        this.tail = coordinates[coordinates.length-1];
    }

    /**
     * This method grow snake
     * @param {Array} direction An array of x and y
     */
    growSnake(direction){
        this.body.push(this.head);
        this.head = [this.head[0] + direction[0], this.head[1] + direction[1]];
    }

    /**
     * This method moves snakes based on the direction
     * @param {Array} direction An array of x and y
     */
    move(direction){
        //permute tail and head
        this.body.push(this.head);
        this.head = [this.head[0] + direction[0], this.head[1] + direction[1]];
        this.tail = this.body.shift();
    }
}

export { Snake };


