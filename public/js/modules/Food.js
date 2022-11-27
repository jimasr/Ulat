
class Food{
    constructor(coordinate, image){
        this.x = coordinate[0];
        this.y = coordinate[1];
        this.image = image;
    }

    getImage(){
        return this.image;
    }
}

export { Food };