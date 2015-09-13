module MCGE.Core {
    export class Scene {
        private canvas: HTMLCanvasElement;
        private context: CanvasRenderingContext2D;
        private id: string;
        private drawables: UI.Drawable[];

        constructor(name: string) {
            this.id = name;
            this.canvas = document.createElement("canvas");
            this.canvas.setAttribute('id', this.id);
            this.context = this.canvas.getContext('2d');
            this.drawables = [];
        }

        addDrawable(drawable: UI.Drawable) {
            drawable.setContext(this.context);
            this.drawables.push(drawable);
        }

        removeDrawables() {
            this.drawables = null;
            this.drawables = [];
        }

        clean(x: number, y: number) {
            this.context.clearRect(0, 0, x, y);
        }

        get scene(): HTMLCanvasElement {
            return this.canvas;
        }

        get ctx(): CanvasRenderingContext2D{
            return this.context;
        }

        get name(): string {
            return this.id
        }

        get elements(): UI.Drawable[]{
            return this.drawables;
        }

    }
} 