// Exporting class sprite which specifies the dimensions of the obstacles
export class Sprite {
    constructor(img, x, y, width, height) {
        this.img = img;
        this.x = x * 2;
        this.y = y * 2;
        this.width = width * 2;
        this.height = height * 2;
    }
}

// add prototype property to add draw function to sprite object
Sprite.prototype.draw = function (context, x, y) {
    context.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
};



