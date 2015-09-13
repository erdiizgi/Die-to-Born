module MCGE.UI {
    export class Label extends Drawable {
        text: string;
        size: number;
        font: string;
        color: string;
        
        constructor(text: string, x: number, y: number, size: number, font: string, color: string) {
            super(x, y);
            this.size = size;
            this.font = font;
            this.color = color;
            this.text = text;
            this.height = this.size;
        }

        setContext(context: CanvasRenderingContext2D) {
            this.context = context;
            this.context.beginPath();
            this.context.font = this.size + "pt " + this.font;
            var metrics = this.context.measureText(this.text);
            this.width = metrics.width;
            this.context.closePath();
        }

        draw() {
            this.context.beginPath();
            this.context.font = this.size + "pt " + this.font;
            this.context.fillStyle = this.color;
            this.context.fillText(this.text, this.x, this.y);
            this.context.closePath();
        }
    }
} 