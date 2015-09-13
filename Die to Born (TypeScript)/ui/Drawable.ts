module MCGE.UI {
    export class Drawable {
        x: number;
        y: number;
        width: number;
        height: number;
        isVisible: boolean;
        context: CanvasRenderingContext2D;

        constructor(x: number, y: number, isVisible?:boolean) {
            this.x = x;
            this.y = y;
            this.isVisible = isVisible != undefined ? isVisible : true; 
        }

        setPosition(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        setContext(context: CanvasRenderingContext2D) {
            this.context = context;
        }

        draw(): void { }
        update(): void { }
    }
} 