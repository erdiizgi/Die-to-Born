module MCGE.UI {
    
    export class Movable extends Drawable {
       
        public Key = {
            _pressed: {},

            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,

            isDown: function (keyCode) {
                return this._pressed[keyCode];
            },

            onKeydown: function (event) {
                this._pressed[event.keyCode] = true;
            },

            onKeyup: function (event) {
                delete this._pressed[event.keyCode];
            }
        };
        
        constructor(x: number, y: number) {
            super(x, y);

            document.addEventListener("keydown", function (event) {
                this.Key.onKeydown(event);
            }.bind(this), false);

            document.addEventListener("keyup", function (event) {
                this.Key.onKeyup(event);
            }.bind(this), false);
        }

        draw() {}

        update() { }
    }
} 