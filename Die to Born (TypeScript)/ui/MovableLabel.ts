module MCGE.UI {
    export class MovableLabel extends Movable {
        text: string;
        size: number;
        font: string;
        color: string;
        speed: number;

        constructor(text: string, x: number, y: number, size: number, font: string, color: string, speed: number) {
            super(x, y);
            this.size = size;
            this.font = font;
            this.color = color;
            this.text = text;
            this.speed = speed;
        }

        moveLeft() {
            this.x -= this.speed;
        }
        moveRight() {
            this.x += this.speed;
        }
        moveUp() {
            this.y -= this.speed;
        }
        moveDown() {
            this.y += this.speed;
        }
           
        draw() {
            this.context.beginPath();
            this.context.font = this.size + "em " + this.font;
            this.context.fillStyle = this.color;
            this.context.fillText(this.text, this.x, this.y);
            this.context.closePath();
        }

        update() {
            if (this.Key.isDown(this.Key.UP)) this.moveUp();
            if (this.Key.isDown(this.Key.LEFT)) this.moveLeft();
            if (this.Key.isDown(this.Key.DOWN)) this.moveDown();
            if (this.Key.isDown(this.Key.RIGHT)) this.moveRight();
            }
        }
 }