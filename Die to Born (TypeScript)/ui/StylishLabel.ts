module MCGE.UI {
    export class StylishLabel extends Label {
        constructor(text: string, x: number, y: number, size: number, font: string, color: string) {
            super(text, x, y, size, font, color);
        }

        draw() {
            this.context.save();
            this.context.beginPath();
            var blur = 5;
            var mWidth = this.width + blur * 2;
            this.context.font = this.size + "pt " + this.font;
            this.context.fillStyle = this.color;
            this.context.textBaseline = "top";
            this.context.shadowColor = "#fff"
            this.context.shadowOffsetX = 2;
            this.context.shadowOffsetY = 2;
            this.context.shadowBlur = blur;
            this.context.fillText(this.text, this.x, this.y);
            this.context.closePath();
            this.context.restore();
        }
    }
} 