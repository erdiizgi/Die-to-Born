module MCGE.Component {
    export class StoryTeller {
        private _scene: Scene;
        private _stories: string[];
        private _storyIndex: number = 0;
        private _width: number;
        private _height: number;
        private currentStory: Story;
        private isNext = false;
        private _cnt: number = 0;
        private alpha = 1;  
        private delta = 0.02;
        private _hasNext: boolean;

        constructor(scene: Scene, width: number, height: number) {
            this._scene = scene;
            this._width = width;
            this._height = height;
            this._stories = [];
            this._hasNext = true;
        }

        addStoryText(storyText: string) {
            this._stories[this._stories.length] = storyText;
        }

        removeAll() {
            this._stories = [];
            this._storyIndex = 0;
        }

        init() {
            this.currentStory = new Story(this._stories[this._storyIndex], this._scene, this._width, this._height);
            this._scene.addDrawable(new Graphics.Square(10, 10, this._width - 14, this._height - 14, 2));
        }

        get hasNext(): boolean {
            return this._hasNext;
        }

        set cnt(c: number) {
            this._cnt = c;
        }

        get scene(): Scene {
            return this._scene;
        }

        next() {
            if(this.isNext == false)
            this.isNext = true;
        }

        initSplashScreen() {
            var circle = new Graphics.Circle(this._width / 3, this._height / 2, 100, "#66808F", true, 1);
            var circle2 = new Graphics.Circle(this._width / 3, this._height / 2, 130, "#495555", true, 1);
            var circle3 = new Graphics.Circle(this._width / 3, this._height / 2, 180, "#D2F1F3", true, 1);
            var circle4 = new Graphics.Circle(this._width / 3, this._height / 2, 450, "#3A3A32", true, 1);
            var circle5 = new Graphics.Circle(this._width / 3, this._height / 2, 470, "#C0D3D9", true, 1);
            var circle6 = new Graphics.Circle(this._width / 3, this._height / 2, 650, "#FFFFFF", true, 1);
            var label = new Label("Die to Born", 3, this._height - 5, 90, "Impact, Charcoal, sans-serif", "#FFF");
            var label2 = new Label("Start", 200, 325, 50, "Impact, Charcoal, sans-serif", "#FFF");

            this._scene.removeDrawables();
            this._scene.addDrawable(circle6);
            this._scene.addDrawable(circle5);
            this._scene.addDrawable(circle4);
            this._scene.addDrawable(circle3);
            this._scene.addDrawable(circle2);
            this._scene.addDrawable(circle);
            this._scene.addDrawable(label);
            this._scene.addDrawable(label2);
            this._hasNext = false;
        }

        clean(width: number, height: number) {
            this._scene.clean(width, height);
        }

        draw() {
            for (var i: number = 0; i < this._scene.elements.length; i++) {
                this._scene.elements[i].draw();
            }
        }
        

        update() {
            for (var i: number = 0; i < this._scene.elements.length; i++) {
                this._scene.elements[i].update();
            }
            
            if (this.isNext == true) {

                this._cnt++;
                if (this._cnt <= 50) {
                    this.alpha -= this.delta;
                    this._scene.ctx.globalAlpha = this.alpha;
                }

                else if (this._cnt == 51) {
                    this._scene.removeDrawables();
                    if (this._stories[this._storyIndex + 1] != null) {
                        this._storyIndex++;
                        this.init();
                    }
                    else {
                        this.initSplashScreen();
                    }
                }

                else if (this._cnt >= 51 && this._cnt <= 101) {
                    this.alpha += this.delta;
                    this._scene.ctx.globalAlpha = this.alpha;
                }

                else if (102) {
                    this.alpha = 1;
                    this._scene.ctx.globalAlpha = this.alpha;
                    this._cnt = 0;
                    this.isNext = false;
                }
            }
        }
    }
} 