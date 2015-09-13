module MCGE.Helper {
    export class Utils {
        static containerCss(container: HTMLDivElement, width, height){
            container.style.position = "absolute";
            container.style.left = "50%";
            container.style.top = "50%";
            container.style.marginTop = -height / 2 + 'px';
            container.style.marginLeft = -width / 2 + 'px';
        }

        static canvasCss(scene: HTMLCanvasElement, width, height, scaledWidth, scaledHeight, color?: string) {
            scene.style.width = scaledWidth + "px";
            scene.style.height = scaledHeight + "px";
            scene.style.position = "absolute";
            scene.width = width;
            scene.height = height;
            scene.style.backgroundColor = color;
        }

        static randomBetween(a: number, b: number) {
            return Math.floor(Math.random() * (b - a + 1)) + a;
        }
    }
} 