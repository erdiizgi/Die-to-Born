module MCGE.Component {
    export class Story {
        private _texts: string[];
        public labels: Label[];
        public lineSpace: number = 10;

        constructor(text: string, scene: Scene, canvasWidth, canvasHeight) {
            this._texts = [];
            this.labels = [];
            this._texts = text.split('&');
          
            for (var i: number = 0; i < this._texts.length; i++) {
                this.labels[this.labels.length] = new Label(this._texts[i], 0, 0, 20, "Verdana", "black");
                scene.addDrawable(this.labels[i]);
            }

            for (var j: number = 0; j < scene.elements.length; j++) {
                var width = scene.elements[j].width;
                var height = scene.elements[j].height + this.lineSpace;
                var x = (canvasWidth - width) / 2;
                var y = ((canvasHeight - height * scene.elements.length) / 2) + j * height;
                scene.elements[j].setPosition(x, y);

                console.log(width, height, canvasWidth, canvasHeight, x, y);
            }
        }
    }
} 