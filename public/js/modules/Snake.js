class Snake{
    constructor(coordinates){
        this.head = coordinates[0];
        this.body = coordinates.slice(1, coordinates.length-1);
        this.tail = coordinates[coordinates.length-1];
    }

    growSnake(direction){
        this.body.push(this.head);
        this.head = [this.head[0] + direction[0], this.head[1] + direction[1]];
    }

    move(direction){
        //permute tail and head
        this.body.push(this.head);
        this.head = [this.head[0] + direction[0], this.head[1] + direction[1]];
        this.tail = this.body.shift();
    }
}

export { Snake };


