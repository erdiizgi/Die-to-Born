var MCGE;
(function (MCGE) {
    var Core;
    (function (Core) {
        //this class keeps and sets the game state
        var GameState = (function () {
            function GameState(state) {
                this._state = state;
            }
            Object.defineProperty(GameState.prototype, "state", {
                get: function () {
                    return this._state;
                },
                set: function (state) {
                    this._state = state;
                },
                enumerable: true,
                configurable: true
            });
            return GameState;
        })();
        Core.GameState = GameState;
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Core;
    (function (Core) {
        //this class keeps the data related the screen size
        var Game = (function () {
            function Game(name, width, height) {
                //initialize the size
                this.width = width;
                this.height = height;
                this.aspectRatio = this.width / this.height;
                this.scaledHeight = window.innerHeight;
                this.scaledWidth = (this.scaledHeight * this.aspectRatio + 0.5) | 0;
                //Create an game state keeper
                this.gameState = new Core.GameState("StoryTeller");
            }
            Game.prototype.add2dWorld = function (world) {
                this.world = world;
            };
            Game.prototype.addPlayer = function (player) {
                this.player = player;
            };
            Game.prototype.reCalculate = function () {
                this.scaledHeight = window.innerHeight;
                this.scaledWidth = (this.scaledHeight * this.aspectRatio + 0.5) | 0;
            };
            return Game;
        })();
        Core.Game = Game;
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Core;
    (function (Core) {
        //a scene can contain drawable elements to draw
        var Scene = (function () {
            function Scene(name) {
                this.id = name;
                this.canvas = document.createElement("canvas");
                this.canvas.setAttribute('id', this.id);
                this.context = this.canvas.getContext('2d');
                this.drawables = [];
            }
            //adds a drawable to show
            Scene.prototype.addDrawable = function (drawable) {
                drawable.setContext(this.context);
                this.drawables.push(drawable);
            };
            //remove all the drawables
            Scene.prototype.removeDrawables = function () {
                this.drawables = null;
                this.drawables = [];
            };
            //clears the current canvas
            Scene.prototype.clean = function (x, y) {
                this.context.clearRect(0, 0, x, y);
            };
            Object.defineProperty(Scene.prototype, "scene", {
                get: function () {
                    return this.canvas;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "ctx", {
                get: function () {
                    return this.context;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "name", {
                get: function () {
                    return this.id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Scene.prototype, "elements", {
                get: function () {
                    return this.drawables;
                },
                enumerable: true,
                configurable: true
            });
            return Scene;
        })();
        Core.Scene = Scene;
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Core;
    (function (Core) {
        //this class used to keep collection of scenes
        var World = (function () {
            function World() {
                this.sceneDeck = [];
            }
            World.prototype.AddScene = function (scene) {
                this.sceneDeck.push(scene);
            };
            World.prototype.AddStroyScene = function (scene) {
                this.storyScene = scene;
            };
            Object.defineProperty(World.prototype, "Scenes", {
                get: function () {
                    return this.sceneDeck;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(World.prototype, "StoryScene", {
                get: function () {
                    return this.storyScene;
                },
                enumerable: true,
                configurable: true
            });
            return World;
        })();
        Core.World = World;
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Core;
    (function (Core) {
        //this class is the engine that includes all controlling functions and game state loop
        var Engine = (function () {
            //constructor
            function Engine(game) {
                this.aspectRatio = 4 / 3;
                this.game = game;
                this.world = game.world;
                this.width = game.width;
                this.height = game.height;
                this.aspectRatio = game.aspectRatio;
                this.gameStatus = new GameStatus();
                this.container = document.createElement("div");
                this.container.setAttribute("id", "container");
                Utils.containerCss(this.container, this.game.scaledWidth, this.game.scaledHeight);
            }
            //set a story teller to the engine to show
            Engine.prototype.setStoryTeller = function (storyTeller) {
                this.storyTeller = storyTeller;
                this.storyTeller.init();
            };
            //initializes the scenes and creates the events
            Engine.prototype.init = function () {
                //Append the canvas' to the page
                for (var i = 0; i < this.world.Scenes.length; i++) {
                    var scene = this.world.Scenes[i].scene;
                    Utils.canvasCss(scene, this.game.width, this.game.height, this.game.scaledWidth, this.game.scaledHeight, "#e7f8f6");
                    this.container.appendChild(scene);
                }
                Utils.canvasCss(this.world.StoryScene.scene, this.game.width, this.game.height, this.game.scaledWidth, this.game.scaledHeight);
                this.container.appendChild(this.world.StoryScene.scene);
                document.body.appendChild(this.container);
                window.addEventListener('resize', function (event) { this.resize(); }.bind(this), false);
                document.onmousedown = function (event) {
                    if (this.game.gameState.state == "StoryTeller" || this.game.gameState.state == "GameOver") {
                        if (this.storyTeller.hasNext) {
                            this.storyTeller.next();
                        }
                        else {
                            this.storyTeller.clean(this.width, this.height);
                            this.game.gameState.state = "Playing";
                        }
                    }
                }.bind(this);
            };
            //game loop
            Engine.prototype.run = function (grid) {
                var _this = this;
                switch (this.game.gameState.state) {
                    case "StoryTeller":
                        this.storyTeller.clean(this.width, this.height);
                        this.storyTeller.draw();
                        this.storyTeller.update();
                        break;
                    case "Playing":
                        this.gameStatus.start();
                        this.game.player.setDegree(this.gameStatus.speed * 50 / 8);
                        this.game.player.speed = this.gameStatus.speed;
                        for (var i = 0; i < this.world.Scenes.length; i++) {
                            this.world.Scenes[i].clean(this.width, this.height);
                            for (var j = 0; j < this.world.Scenes[i].elements.length; j++) {
                                this.world.Scenes[i].elements[j].update();
                                this.world.Scenes[i].elements[j].draw();
                            }
                        }
                        if (this.checkForCollision(grid, this.game.player.getLeftLegCoor(), this.game.player.getRightLegCoor())) {
                            this.game.player.isColliding = true;
                            this.gameStatus.decreaseSpeed();
                            this.gameStatus.speed = 5;
                            this.game.player.initDegrees();
                        }
                        else {
                            this.game.player.isColliding = false;
                        }
                        this.playerCheckEra(this.gameStatus.age);
                        this.gameStatus.update();
                        if (this.gameStatus.age == 0) {
                            this.game.gameState.state = "GameOver";
                            this.storyTeller.scene.removeDrawables();
                            this.storyTeller = new StoryTeller(this.storyTeller.scene, this.game.width, this.game.height);
                            this.gameStatus.stop();
                            this.storyTeller.addStoryText("");
                            this.storyTeller.addStoryText("You have tried to keep your memories alive&but you were born&like every living creature&&&Score: " + this.gameStatus.score);
                            this.setStoryTeller(this.storyTeller);
                            this.storyTeller.next();
                            this.gameStatus.reset();
                            this.game.player.setDegree(0);
                            this.game.player.changeEra(4);
                            this.game.player.initDegrees();
                            this.game.player.x = 300;
                            this.game.player.y = 100;
                            for (var i = 0; i < this.world.Scenes.length; i++) {
                                this.world.Scenes[i].clean(this.width, this.height);
                            }
                        }
                        grid.update(this.gameStatus.speed);
                        break;
                    case "GameOver":
                        this.storyTeller.clean(this.width, this.height);
                        this.storyTeller.update();
                        this.storyTeller.draw();
                        break;
                }
                window.requestAnimationFrame(function () { return _this.run(grid); });
            };
            //Collision control
            Engine.prototype.checkForCollision = function (grid, leftLeg, rightLeg) {
                var obstacle = grid.giveSpaceCoor();
                var result = false;
                if ((leftLeg[1] > obstacle[1] && leftLeg[1] < obstacle[1] + 30) || (rightLeg[1] > obstacle[1] && rightLeg[1] < obstacle[1] + 30)) {
                    if ((leftLeg[0] > obstacle[0] && leftLeg[0] < obstacle[0] + 150) && (rightLeg[0] > obstacle[0] && rightLeg[0] < obstacle[0] + 150)) {
                        result = false;
                    }
                    else {
                        result = true;
                    }
                }
                return result;
            };
            //Checks the age of the player and initializes the era of the player
            Engine.prototype.playerCheckEra = function (age) {
                var realAge = Math.floor(age / 1000);
                if (realAge < 75 && realAge >= 30) {
                    this.game.player.changeEra(4);
                }
                else if (realAge < 30 && realAge >= 18) {
                    this.game.player.changeEra(3);
                }
                else if (realAge < 18 && realAge >= 8) {
                    this.game.player.changeEra(2);
                }
                else {
                    this.game.player.changeEra(1);
                }
            };
            //resizes while keeping aspect ratio as the same
            Engine.prototype.resize = function () {
                this.game.reCalculate();
                Utils.containerCss(document.getElementById("container"), this.game.scaledWidth, this.game.scaledHeight);
                var scenes = document.getElementsByTagName("canvas");
                for (var i = 0; i < scenes.length; i++) {
                    Utils.canvasCss(scenes[i], this.game.width, this.game.height, this.game.scaledWidth, this.game.scaledHeight);
                }
            };
            return Engine;
        })();
        Core.Engine = Engine;
    })(Core = MCGE.Core || (MCGE.Core = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Helper;
    (function (Helper) {
        //contains useful static helper functions
        var Utils = (function () {
            function Utils() {
            }
            Utils.containerCss = function (container, width, height) {
                container.style.position = "absolute";
                container.style.left = "50%";
                container.style.top = "50%";
                container.style.marginTop = -height / 2 + 'px';
                container.style.marginLeft = -width / 2 + 'px';
            };
            Utils.canvasCss = function (scene, width, height, scaledWidth, scaledHeight, color) {
                scene.style.width = scaledWidth + "px";
                scene.style.height = scaledHeight + "px";
                scene.style.position = "absolute";
                scene.width = width;
                scene.height = height;
                scene.style.backgroundColor = color;
            };
            Utils.randomBetween = function (a, b) {
                return Math.floor(Math.random() * (b - a + 1)) + a;
            };
            return Utils;
        })();
        Helper.Utils = Utils;
    })(Helper = MCGE.Helper || (MCGE.Helper = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        //base class for the drawables
        var Drawable = (function () {
            function Drawable(x, y, isVisible) {
                this.x = x;
                this.y = y;
                this.isVisible = isVisible != undefined ? isVisible : true;
            }
            Drawable.prototype.setPosition = function (x, y) {
                this.x = x;
                this.y = y;
            };
            Drawable.prototype.setContext = function (context) {
                this.context = context;
            };
            Drawable.prototype.draw = function () { };
            Drawable.prototype.update = function () { };
            return Drawable;
        })();
        UI.Drawable = Drawable;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        //a label is a text can be adjusted according to the wish
        var Label = (function (_super) {
            __extends(Label, _super);
            function Label(text, x, y, size, font, color) {
                _super.call(this, x, y);
                this.size = size;
                this.font = font;
                this.color = color;
                this.text = text;
                this.height = this.size;
            }
            Label.prototype.setContext = function (context) {
                this.context = context;
                this.context.beginPath();
                this.context.font = this.size + "pt " + this.font;
                var metrics = this.context.measureText(this.text);
                this.width = metrics.width;
                this.context.closePath();
            };
            Label.prototype.draw = function () {
                this.context.beginPath();
                this.context.font = this.size + "pt " + this.font;
                this.context.fillStyle = this.color;
                this.context.fillText(this.text, this.x, this.y);
                this.context.closePath();
            };
            return Label;
        })(UI.Drawable);
        UI.Label = Label;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        //creates text with shadow
        var StylishLabel = (function (_super) {
            __extends(StylishLabel, _super);
            function StylishLabel(text, x, y, size, font, color) {
                _super.call(this, text, x, y, size, font, color);
            }
            StylishLabel.prototype.draw = function () {
                this.context.save();
                this.context.beginPath();
                var blur = 5;
                var mWidth = this.width + blur * 2;
                this.context.font = this.size + "pt " + this.font;
                this.context.fillStyle = this.color;
                this.context.textBaseline = "top";
                this.context.shadowColor = "#fff";
                this.context.shadowOffsetX = 2;
                this.context.shadowOffsetY = 2;
                this.context.shadowBlur = blur;
                this.context.fillText(this.text, this.x, this.y);
                this.context.closePath();
                this.context.restore();
            };
            return StylishLabel;
        })(UI.Label);
        UI.StylishLabel = StylishLabel;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        //this class is the base class for the movable drawables
        var Movable = (function (_super) {
            __extends(Movable, _super);
            function Movable(x, y) {
                _super.call(this, x, y);
                this.Key = {
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
                document.addEventListener("keydown", function (event) {
                    this.Key.onKeydown(event);
                }.bind(this), false);
                document.addEventListener("keyup", function (event) {
                    this.Key.onKeyup(event);
                }.bind(this), false);
            }
            Movable.prototype.draw = function () { };
            Movable.prototype.update = function () { };
            return Movable;
        })(UI.Drawable);
        UI.Movable = Movable;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        //creates a label which can be moved by using arrow keys
        var MovableLabel = (function (_super) {
            __extends(MovableLabel, _super);
            function MovableLabel(text, x, y, size, font, color, speed) {
                _super.call(this, x, y);
                this.size = size;
                this.font = font;
                this.color = color;
                this.text = text;
                this.speed = speed;
            }
            MovableLabel.prototype.moveLeft = function () {
                this.x -= this.speed;
            };
            MovableLabel.prototype.moveRight = function () {
                this.x += this.speed;
            };
            MovableLabel.prototype.moveUp = function () {
                this.y -= this.speed;
            };
            MovableLabel.prototype.moveDown = function () {
                this.y += this.speed;
            };
            MovableLabel.prototype.draw = function () {
                this.context.beginPath();
                this.context.font = this.size + "em " + this.font;
                this.context.fillStyle = this.color;
                this.context.fillText(this.text, this.x, this.y);
                this.context.closePath();
            };
            MovableLabel.prototype.update = function () {
                if (this.Key.isDown(this.Key.UP))
                    this.moveUp();
                if (this.Key.isDown(this.Key.LEFT))
                    this.moveLeft();
                if (this.Key.isDown(this.Key.DOWN))
                    this.moveDown();
                if (this.Key.isDown(this.Key.RIGHT))
                    this.moveRight();
            };
            return MovableLabel;
        })(UI.Movable);
        UI.MovableLabel = MovableLabel;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Component;
    (function (Component) {
        //Story is a page of text
        var Story = (function () {
            function Story(text, scene, canvasWidth, canvasHeight) {
                this.lineSpace = 10;
                this._texts = [];
                this.labels = [];
                this._texts = text.split('&');
                for (var i = 0; i < this._texts.length; i++) {
                    this.labels[this.labels.length] = new Label(this._texts[i], 0, 0, 20, "Verdana", "black");
                    scene.addDrawable(this.labels[i]);
                }
                for (var j = 0; j < scene.elements.length; j++) {
                    var width = scene.elements[j].width;
                    var height = scene.elements[j].height + this.lineSpace;
                    var x = (canvasWidth - width) / 2;
                    var y = ((canvasHeight - height * scene.elements.length) / 2) + j * height;
                    scene.elements[j].setPosition(x, y);
                    console.log(width, height, canvasWidth, canvasHeight, x, y);
                }
            }
            return Story;
        })();
        Component.Story = Story;
    })(Component = MCGE.Component || (MCGE.Component = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Component;
    (function (Component) {
        //this class behaves to control stories
        var StoryTeller = (function () {
            function StoryTeller(scene, width, height) {
                this._storyIndex = 0;
                this.isNext = false;
                this._cnt = 0;
                this.alpha = 1;
                this.delta = 0.02;
                this._scene = scene;
                this._width = width;
                this._height = height;
                this._stories = [];
                this._hasNext = true;
            }
            //adds text to the story page
            StoryTeller.prototype.addStoryText = function (storyText) {
                this._stories[this._stories.length] = storyText;
            };
            //removes all the existing stories
            StoryTeller.prototype.removeAll = function () {
                this._stories = [];
                this._storyIndex = 0;
            };
            //inits the current story
            StoryTeller.prototype.init = function () {
                this.currentStory = new Component.Story(this._stories[this._storyIndex], this._scene, this._width, this._height);
                this._scene.addDrawable(new Component.Graphics.Square(10, 10, this._width - 14, this._height - 14, 2));
            };
            Object.defineProperty(StoryTeller.prototype, "hasNext", {
                //hasNext page to show
                get: function () {
                    return this._hasNext;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StoryTeller.prototype, "cnt", {
                set: function (c) {
                    this._cnt = c;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StoryTeller.prototype, "scene", {
                get: function () {
                    return this._scene;
                },
                enumerable: true,
                configurable: true
            });
            StoryTeller.prototype.next = function () {
                if (this.isNext == false)
                    this.isNext = true;
            };
            //inits the splash screen
            StoryTeller.prototype.initSplashScreen = function () {
                var circle = new Component.Graphics.Circle(this._width / 3, this._height / 2, 100, "#66808F", true, 1);
                var circle2 = new Component.Graphics.Circle(this._width / 3, this._height / 2, 130, "#495555", true, 1);
                var circle3 = new Component.Graphics.Circle(this._width / 3, this._height / 2, 180, "#D2F1F3", true, 1);
                var circle4 = new Component.Graphics.Circle(this._width / 3, this._height / 2, 450, "#3A3A32", true, 1);
                var circle5 = new Component.Graphics.Circle(this._width / 3, this._height / 2, 470, "#C0D3D9", true, 1);
                var circle6 = new Component.Graphics.Circle(this._width / 3, this._height / 2, 650, "#FFFFFF", true, 1);
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
            };
            //cleans the current screen
            StoryTeller.prototype.clean = function (width, height) {
                this._scene.clean(width, height);
            };
            //draws the elements onto screen
            StoryTeller.prototype.draw = function () {
                for (var i = 0; i < this._scene.elements.length; i++) {
                    this._scene.elements[i].draw();
                }
            };
            //updates alpha values and gives an fade out effect
            StoryTeller.prototype.update = function () {
                for (var i = 0; i < this._scene.elements.length; i++) {
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
            };
            return StoryTeller;
        })();
        Component.StoryTeller = StoryTeller;
    })(Component = MCGE.Component || (MCGE.Component = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Component;
    (function (Component) {
        var Graphics;
        (function (Graphics) {
            //draws a square
            var Square = (function (_super) {
                __extends(Square, _super);
                function Square(x, y, width, height, lineWidth) {
                    _super.call(this, x, y);
                    this.width = width;
                    this.height = height;
                    this.lineWidth = lineWidth;
                }
                Square.prototype.draw = function () {
                    this.context.beginPath();
                    this.context.lineWidth = this.lineWidth;
                    this.context.rect(this.x, this.y, this.width, this.height);
                    this.context.stroke();
                    this.context.closePath();
                };
                Square.prototype.update = function () { };
                return Square;
            })(MCGE.UI.Drawable);
            Graphics.Square = Square;
            //draws a circle
            var Circle = (function (_super) {
                __extends(Circle, _super);
                function Circle(x, y, radius, color, isAnimated, opacity) {
                    _super.call(this, x, y);
                    this.count = 0;
                    this.animationSpeed = 0.2;
                    this.animationLimit = 100;
                    this.radius = radius;
                    this.color = color;
                    this.isAnimated = isAnimated;
                    this.opacity = opacity;
                }
                Circle.prototype.draw = function () {
                    this.context.save();
                    this.context.beginPath();
                    this.context.globalAlpha = this.opacity;
                    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                    this.context.fillStyle = this.color;
                    this.context.fill();
                    this.context.closePath();
                    this.context.restore();
                };
                Circle.prototype.update = function () {
                    if (this.isAnimated) {
                        if (this.count <= this.animationLimit)
                            this.radius += this.animationSpeed;
                        else if (this.count > this.animationLimit && this.count < this.animationLimit * 2)
                            this.radius -= this.animationSpeed;
                        else if (this.count >= this.animationLimit * 2)
                            this.count = 0;
                        this.count += 1;
                    }
                };
                return Circle;
            })(MCGE.UI.Drawable);
            Graphics.Circle = Circle;
            //draws mountain for the left and right side of the game screen
            var Mountain = (function (_super) {
                __extends(Mountain, _super);
                function Mountain(x, y, mountainType, side, isFlipped) {
                    _super.call(this, x, y);
                    this.mountainType = mountainType;
                    this.horizontalFlip = side;
                    this.verticalFlip = isFlipped;
                }
                Mountain.prototype.draw = function () {
                    this.context.save();
                    if (this.verticalFlip == true) {
                        this.context.translate(0, 300);
                        this.context.scale(1, -1);
                    }
                    if (this.horizontalFlip == true) {
                        this.context.translate(150, 0);
                        this.context.scale(-1, 1);
                    }
                    if (this.verticalFlip == true)
                        this.context.translate(this.x, -this.y);
                    else
                        this.context.translate(this.x, this.y);
                    if (this.mountainType) {
                        this.draw1();
                    }
                    else {
                        this.draw2();
                    }
                    this.context.restore();
                };
                Mountain.prototype.draw1 = function () {
                    this.context.save();
                    this.context.beginPath();
                    this.context.moveTo(0.0, 0.0);
                    this.context.lineTo(149.4, 0.0);
                    this.context.bezierCurveTo(143.9, 5.5, 138.5, 13.5, 130.4, 15.9);
                    this.context.bezierCurveTo(133.2, 16.1, 130.8, 60.3, 118.7, 67.7);
                    this.context.bezierCurveTo(121.3, 67.4, 123.7, 66.7, 126.0, 65.7);
                    this.context.bezierCurveTo(127.8, 74.0, 101.0, 75.8, 97.3, 76.6);
                    this.context.bezierCurveTo(102.5, 77.0, 107.7, 76.7, 112.8, 75.7);
                    this.context.bezierCurveTo(62.9, 89.5, 118.9, 153.7, 70.2, 171.4);
                    this.context.bezierCurveTo(90.3, 165.7, 72.4, 189.5, 65.0, 196.3);
                    this.context.bezierCurveTo(54.9, 201.0, 59.6, 275.3, 65.2, 300.0);
                    this.context.lineTo(0.0, 300.0);
                    this.context.fillStyle = "rgb(20, 31, 42)";
                    this.context.fill();
                    // layer1/Group
                    // layer1/Group/Path
                    this.context.save();
                    this.context.beginPath();
                    this.context.moveTo(71.0, 170.5);
                    this.context.bezierCurveTo(67.8, 175.8, 63.0, 181.5, 59.9, 184.3);
                    this.context.bezierCurveTo(52.4, 187.8, 53.1, 230.3, 56.3, 261.8);
                    this.context.bezierCurveTo(54.1, 232.4, 54.3, 199.4, 61.0, 196.3);
                    this.context.bezierCurveTo(67.7, 190.2, 82.9, 170.1, 71.0, 170.5);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(22, 163, 229)";
                    this.context.fill();
                    // layer1/Group/Path
                    this.context.beginPath();
                    this.context.moveTo(145.4, 0.0);
                    this.context.lineTo(140.5, 0.0);
                    this.context.bezierCurveTo(138.4, 1.7, 128.0, 3.1, 125.4, 3.9);
                    this.context.bezierCurveTo(128.2, 4.1, 125.8, 48.3, 113.7, 55.7);
                    this.context.bezierCurveTo(116.2, 55.4, 118.6, 54.7, 120.9, 53.7);
                    this.context.bezierCurveTo(122.8, 62.0, 96.0, 63.8, 92.2, 64.6);
                    this.context.bezierCurveTo(97.5, 65.0, 102.6, 64.7, 107.8, 63.7);
                    this.context.bezierCurveTo(57.8, 77.5, 113.8, 141.7, 65.2, 159.4);
                    this.context.bezierCurveTo(76.1, 156.3, 75.8, 162.0, 72.0, 168.9);
                    this.context.bezierCurveTo(112.0, 148.3, 61.0, 89.0, 108.8, 75.7);
                    this.context.bezierCurveTo(103.7, 76.7, 98.5, 77.0, 93.3, 76.6);
                    this.context.bezierCurveTo(97.0, 75.8, 123.8, 74.0, 122.0, 65.7);
                    this.context.bezierCurveTo(119.7, 66.7, 117.3, 67.4, 114.7, 67.7);
                    this.context.bezierCurveTo(126.8, 60.3, 129.2, 16.1, 126.4, 15.9);
                    this.context.bezierCurveTo(134.5, 13.5, 139.9, 5.5, 145.4, 0.0);
                    this.context.closePath();
                    this.context.fill();
                    // layer1/Path
                    this.context.restore();
                    this.context.beginPath();
                    this.context.moveTo(95.0, 0.0);
                    this.context.lineTo(16.0, 0.0);
                    this.context.lineTo(16.0, 156.7);
                    this.context.bezierCurveTo(45.4, 133.3, 21.2, 80.2, 66.1, 67.7);
                    this.context.bezierCurveTo(61.0, 68.7, 55.7, 69.0, 50.5, 68.6);
                    this.context.bezierCurveTo(54.2, 67.8, 81.0, 66.0, 79.1, 57.7);
                    this.context.bezierCurveTo(76.8, 58.7, 74.4, 59.4, 71.8, 59.7);
                    this.context.bezierCurveTo(83.9, 52.3, 86.3, 8.1, 83.5, 7.9);
                    this.context.bezierCurveTo(88.0, 6.5, 91.7, 3.4, 95.0, 0.0);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(20, 66, 92)";
                    this.context.fill();
                    this.context.restore();
                };
                Mountain.prototype.draw2 = function () {
                    this.context.save();
                    this.context.beginPath();
                    this.context.moveTo(0.0, 0.0);
                    this.context.lineTo(149.4, 0.0);
                    this.context.bezierCurveTo(143.9, 5.5, 138.5, 13.5, 130.4, 15.9);
                    this.context.bezierCurveTo(133.2, 16.1, 130.8, 38.4, 118.7, 45.7);
                    this.context.bezierCurveTo(121.3, 45.4, 123.7, 44.7, 126.0, 43.7);
                    this.context.bezierCurveTo(127.8, 52.0, 101.0, 53.8, 97.3, 54.6);
                    this.context.bezierCurveTo(102.5, 55.0, 107.7, 54.7, 112.8, 53.7);
                    this.context.bezierCurveTo(62.9, 67.5, 169.4, 209.9, 117.4, 203.4);
                    this.context.bezierCurveTo(137.5, 197.7, 149.0, 227.8, 112.2, 228.3);
                    this.context.bezierCurveTo(70.9, 231.1, 59.6, 275.3, 65.2, 300.0);
                    this.context.lineTo(0.0, 300.0);
                    this.context.fillStyle = "rgb(20, 31, 42)";
                    this.context.fill();
                    // layer1/Group
                    // layer1/Group/Path
                    this.context.save();
                    this.context.beginPath();
                    this.context.moveTo(94.9, 77.1);
                    this.context.bezierCurveTo(95.8, 65.3, 100.3, 56.6, 110.8, 53.7);
                    this.context.bezierCurveTo(106.9, 54.4, 103.0, 54.8, 99.0, 54.7);
                    this.context.bezierCurveTo(95.7, 60.4, 94.6, 68.1, 94.9, 77.1);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(22, 163, 229)";
                    this.context.fill();
                    // layer1/Group/Path
                    this.context.beginPath();
                    this.context.moveTo(110.3, 220.3);
                    this.context.bezierCurveTo(74.2, 222.8, 61.1, 256.8, 62.0, 281.8);
                    this.context.bezierCurveTo(63.9, 258.1, 77.8, 230.5, 110.2, 228.3);
                    this.context.bezierCurveTo(131.1, 228.0, 136.4, 218.2, 133.5, 210.8);
                    this.context.bezierCurveTo(131.1, 215.8, 124.1, 220.1, 110.3, 220.3);
                    this.context.closePath();
                    this.context.fill();
                    // layer1/Group/Path
                    this.context.beginPath();
                    this.context.moveTo(128.6, 7.9);
                    this.context.bezierCurveTo(129.6, 8.0, 130.0, 11.2, 129.3, 15.6);
                    this.context.bezierCurveTo(136.8, 12.9, 142.1, 5.3, 147.4, 0.0);
                    this.context.lineTo(140.1, 0.0);
                    this.context.bezierCurveTo(136.8, 3.4, 133.1, 6.5, 128.6, 7.9);
                    this.context.closePath();
                    this.context.fill();
                    // layer1/Group/Path
                    this.context.beginPath();
                    this.context.moveTo(129.1, 16.7);
                    this.context.bezierCurveTo(127.8, 23.8, 124.1, 33.3, 116.9, 37.7);
                    this.context.bezierCurveTo(119.4, 37.4, 121.8, 36.7, 124.1, 35.7);
                    this.context.bezierCurveTo(126.0, 44.0, 99.2, 45.8, 95.5, 46.6);
                    this.context.bezierCurveTo(100.7, 47.0, 105.8, 46.7, 111.0, 45.7);
                    this.context.bezierCurveTo(105.7, 47.2, 102.0, 50.1, 99.4, 54.0);
                    this.context.bezierCurveTo(108.0, 52.9, 125.5, 50.4, 124.0, 43.7);
                    this.context.bezierCurveTo(121.7, 44.7, 119.3, 45.4, 116.7, 45.7);
                    this.context.bezierCurveTo(127.6, 39.1, 130.6, 20.6, 129.1, 16.7);
                    this.context.closePath();
                    this.context.fill();
                    // layer1/Path
                    this.context.restore();
                    this.context.beginPath();
                    this.context.moveTo(38.6, 228.3);
                    this.context.bezierCurveTo(70.2, 227.9, 86.2, 205.8, 71.8, 203.0);
                    this.context.bezierCurveTo(105.6, 192.9, 12.2, 66.7, 59.1, 53.7);
                    this.context.bezierCurveTo(54.0, 54.7, 48.8, 55.0, 43.6, 54.6);
                    this.context.bezierCurveTo(47.3, 53.8, 74.1, 52.0, 72.2, 43.7);
                    this.context.bezierCurveTo(69.9, 44.7, 67.5, 45.4, 65.0, 45.7);
                    this.context.bezierCurveTo(77.1, 38.4, 79.5, 16.1, 76.7, 15.9);
                    this.context.bezierCurveTo(84.7, 13.5, 90.1, 5.5, 95.6, 0.0);
                    this.context.lineTo(18.0, 0.0);
                    this.context.lineTo(18.0, 234.2);
                    this.context.bezierCurveTo(23.2, 230.9, 30.6, 228.8, 38.6, 228.3);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(20, 66, 92)";
                    this.context.fill();
                    this.context.restore();
                };
                return Mountain;
            })(MCGE.UI.Drawable);
            Graphics.Mountain = Mountain;
            //draws platform obstacles
            var Platform = (function (_super) {
                __extends(Platform, _super);
                function Platform(x, y, isFlipped, isVisible) {
                    _super.call(this, x, y, isVisible != undefined ? isVisible : true);
                    this.horizontalFlip = isFlipped;
                }
                Platform.prototype.draw = function () {
                    if (this.isVisible) {
                        this.context.save();
                        if (this.horizontalFlip == true) {
                            this.context.translate(150, 0);
                            this.context.scale(-1, 1);
                        }
                        this.context.translate(this.x, this.y);
                        // layer1/Group/Group
                        this.context.save();
                        // layer1/Group/Group/Path
                        this.context.save();
                        this.context.beginPath();
                        this.context.moveTo(108.4, 7.5);
                        this.context.bezierCurveTo(116.8, 3.7, 117.3, 0.4, 126.4, 0.9);
                        this.context.bezierCurveTo(125.1, 1.4, 124.0, 2.1, 123.0, 3.1);
                        this.context.bezierCurveTo(128.3, -1.8, 140.2, 0.4, 146.5, 1.1);
                        this.context.lineTo(150.0, 1.4);
                        this.context.lineTo(150.0, 30.0);
                        this.context.bezierCurveTo(148.8, 28.0, 147.5, 25.9, 145.6, 24.4);
                        this.context.bezierCurveTo(139.0, 19.1, 70.1, 24.7, 81.5, 10.9);
                        this.context.bezierCurveTo(73.5, 15.8, 72.8, 16.7, 68.2, 25.3);
                        this.context.bezierCurveTo(44.3, 11.5, 26.6, 14.4, 26.5, 14.6);
                        this.context.bezierCurveTo(24.6, 23.4, 11.9, 25.9, 3.8, 28.7);
                        this.context.bezierCurveTo(2.5, 29.2, 1.3, 29.6, 0.0, 30.0);
                        this.context.lineTo(0.0, 1.2);
                        this.context.bezierCurveTo(3.6, 1.6, 7.5, 0.9, 10.8, 2.3);
                        this.context.bezierCurveTo(14.1, 3.7, 17.6, 6.2, 17.0, 9.6);
                        this.context.bezierCurveTo(24.7, -5.5, 69.1, 2.6, 66.0, 5.2);
                        this.context.bezierCurveTo(78.1, -2.3, 98.4, 4.1, 99.0, 4.2);
                        this.context.bezierCurveTo(101.1, 4.5, 108.4, 7.5, 108.4, 7.5);
                        this.context.closePath();
                        this.context.fillStyle = "rgb(25, 39, 53)";
                        this.context.fill();
                        // layer1/Group
                        this.context.restore();
                        this.context.restore();
                        // layer1/Group/Path
                        this.context.save();
                        this.context.beginPath();
                        this.context.moveTo(145.8, 17.6);
                        this.context.bezierCurveTo(139.2, 12.3, 70.4, 17.9, 81.8, 4.0);
                        this.context.bezierCurveTo(73.8, 8.9, 73.1, 9.8, 68.6, 18.4);
                        this.context.bezierCurveTo(44.6, 4.6, 26.9, 7.5, 26.9, 7.7);
                        this.context.bezierCurveTo(25.0, 16.5, 12.0, 19.1, 3.9, 21.9);
                        this.context.bezierCurveTo(2.7, 22.3, 2.0, 22.7, 0.0, 23.1);
                        this.context.lineTo(0.0, 29.9);
                        this.context.bezierCurveTo(2.0, 29.5, 2.7, 29.1, 3.9, 28.6);
                        this.context.bezierCurveTo(12.1, 25.8, 24.9, 23.3, 26.8, 14.5);
                        this.context.bezierCurveTo(26.9, 14.3, 44.6, 11.4, 68.6, 25.2);
                        this.context.bezierCurveTo(73.1, 16.6, 73.8, 15.7, 81.9, 10.8);
                        this.context.bezierCurveTo(70.5, 24.6, 139.2, 19.0, 145.8, 24.3);
                        this.context.bezierCurveTo(147.7, 25.8, 149.0, 27.9, 150.0, 29.9);
                        this.context.lineTo(150.0, 23.1);
                        this.context.bezierCurveTo(149.0, 21.1, 147.7, 19.0, 145.8, 17.6);
                        this.context.closePath();
                        this.context.fillStyle = "rgb(48, 67, 86)";
                        this.context.fill();
                        // layer1/Group
                        this.context.restore();
                        // layer1/Group/Path
                        this.context.save();
                        this.context.beginPath();
                        this.context.moveTo(145.8, 21.4);
                        this.context.bezierCurveTo(139.9, 16.6, 84.4, 20.6, 80.8, 11.6);
                        this.context.bezierCurveTo(76.7, 23.2, 139.5, 18.3, 145.8, 23.4);
                        this.context.bezierCurveTo(147.7, 24.8, 149.0, 26.9, 150.0, 28.9);
                        this.context.lineTo(150.0, 26.9);
                        this.context.bezierCurveTo(149.0, 24.9, 147.7, 22.8, 145.8, 21.4);
                        this.context.closePath();
                        this.context.fillStyle = "rgb(22, 163, 229)";
                        this.context.fill();
                        // layer1/Group/Path
                        this.context.beginPath();
                        this.context.moveTo(81.6, 8.1);
                        this.context.bezierCurveTo(81.6, 8.1, 81.6, 8.0, 81.5, 8.0);
                        this.context.bezierCurveTo(73.8, 12.7, 73.1, 13.7, 68.6, 22.2);
                        this.context.bezierCurveTo(44.6, 8.4, 26.9, 11.3, 26.8, 11.5);
                        this.context.bezierCurveTo(24.9, 20.3, 12.1, 22.9, 3.9, 25.7);
                        this.context.bezierCurveTo(2.7, 26.1, 2.0, 26.5, 0.0, 26.9);
                        this.context.lineTo(0.0, 28.9);
                        this.context.bezierCurveTo(2.0, 28.5, 2.7, 28.1, 3.9, 27.7);
                        this.context.bezierCurveTo(12.1, 24.9, 24.9, 22.3, 26.8, 13.5);
                        this.context.bezierCurveTo(26.9, 13.3, 44.6, 10.4, 68.6, 24.2);
                        this.context.bezierCurveTo(72.9, 16.1, 73.7, 14.8, 80.6, 10.6);
                        this.context.bezierCurveTo(80.6, 9.8, 80.9, 9.0, 81.6, 8.1);
                        this.context.closePath();
                        this.context.fill();
                        this.context.restore();
                        this.context.restore();
                    }
                };
                return Platform;
            })(MCGE.UI.Drawable);
            Graphics.Platform = Platform;
            //draws an infobox that can be colored
            var InfoBox = (function (_super) {
                __extends(InfoBox, _super);
                function InfoBox(x, y, percent, color) {
                    _super.call(this, x, y);
                    this.percent = percent;
                    this.width = 102;
                    this.height = 22;
                    this.color = color;
                }
                InfoBox.prototype.draw = function () {
                    this.context.beginPath();
                    this.context.rect(this.x, this.y, this.width, this.height);
                    this.context.fillStyle = 'black';
                    this.context.fill();
                    this.context.closePath();
                    this.context.beginPath();
                    this.context.rect(this.x + 1, this.y + 1, this.percent, 20);
                    this.context.fillStyle = this.color;
                    this.context.fill();
                    this.context.closePath();
                };
                InfoBox.prototype.setPercent = function (percent) {
                    this.percent = percent;
                };
                return InfoBox;
            })(MCGE.UI.Drawable);
            Graphics.InfoBox = InfoBox;
        })(Graphics = Component.Graphics || (Component.Graphics = {}));
    })(Component = MCGE.Component || (MCGE.Component = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Component;
    (function (Component) {
        var Graphics;
        (function (Graphics) {
            // Player class inludes all the related functions with the player 
            var Player = (function (_super) {
                __extends(Player, _super);
                // initializes the super class
                function Player(x, y) {
                    _super.call(this, x, y);
                    this.scaleRate = 0.15;
                    this.speed = 5;
                    this.era = 4;
                    this.leftArmDegree = 0;
                    this.leftArmOrbitX = 4.6;
                    this.leftArmOrbitY = 24.5;
                    this.rightArmDegree = 0;
                    this.rightArmOrbitX = 33.6;
                    this.rightArmOrbitY = 24.5;
                    this.leftLegDegree = 0;
                    this.leftLegOrbitX = 11.0;
                    this.leftLegOrbitY = 68.1;
                    this.rightLegDegree = 0;
                    this.rightLegOrbitX = 27.4;
                    this.rightLegOrbitY = 68.4;
                    this.leftLegX = 3.3;
                    this.leftLegY = 116.4;
                    this.rightLegX = 35;
                    this.rightLegY = 116.4;
                    this.cleftArmDegree = 0;
                    this.crightArmDegree = 0;
                    this.cleftLegDegree = 0;
                    this.crightLegDegree = 0;
                    this.isColliding = false;
                    this.collideColor = "#17a4e6";
                }
                //sets the degree for the players arms and legs
                Player.prototype.setDegree = function (degree) {
                    this.leftArmDegree = this.cleftArmDegree + degree;
                    this.rightArmDegree = this.crightArmDegree + degree;
                    this.leftLegDegree = this.cleftLegDegree + degree;
                    this.rightLegDegree = this.crightLegDegree + degree;
                };
                //inits the degree for the players arms and legs
                Player.prototype.initDegrees = function () {
                    this.cleftArmDegree = 0;
                    this.crightArmDegree = 0;
                    this.cleftLegDegree = 0;
                    this.crightLegDegree = 0;
                };
                // draw method for the for all the body parts
                Player.prototype.draw = function () {
                    this.context.save();
                    this.context.translate(this.x, this.y);
                    switch (this.era) {
                        case 4:
                            this.drawHead();
                            this.drawBody();
                            this.drawLeftArm();
                            this.drawRightArm();
                            this.drawLeftLeg();
                            this.drawRightLeg();
                            break;
                        case 3:
                            this.drawYoungHead();
                            this.drawYoungBody();
                            this.drawYoungLeftArm();
                            this.drawYoungRightArm();
                            this.drawYoungLeftLeg();
                            this.drawYoungRightLeg();
                            break;
                        case 2:
                            this.drawKidHead();
                            this.drawKidBody();
                            this.drawKidLeftArm();
                            this.drawKidRightArm();
                            this.drawKidLeftLeg();
                            this.drawKidRightLeg();
                            break;
                        case 1:
                            this.drawBabyHead();
                            this.drawBabyBody();
                            this.drawBabyLeftArm();
                            this.drawBabyRightArm();
                            this.drawBabyLeftLeg();
                            this.drawBabyRightLeg();
                            break;
                    }
                    this.context.restore();
                };
                Player.prototype.update = function () {
                    if (this.Key.isDown(this.Key.LEFT))
                        this.moveLeft();
                    if (this.Key.isDown(this.Key.RIGHT))
                        this.moveRight();
                };
                Player.prototype.moveLeft = function () {
                    if (this.x > 50)
                        this.x -= this.speed;
                    this.crightArmDegree += 0.6;
                    this.cleftArmDegree -= 0.6;
                    this.cleftLegDegree += 2;
                    this.crightLegDegree -= 2;
                };
                Player.prototype.moveRight = function () {
                    if (this.x < 700)
                        this.x += this.speed;
                    this.cleftArmDegree += 0.6;
                    this.crightArmDegree -= 0.6;
                    this.cleftLegDegree -= 2;
                    this.crightLegDegree += 2;
                };
                Player.prototype.drawHead = function () {
                    this.context.beginPath();
                    this.context.moveTo(12.1, 13.2);
                    this.context.bezierCurveTo(11.0, 10.9, 10.4, 8.2, 11.2, 5.7);
                    this.context.bezierCurveTo(12.3, 2.1, 17.0, -0.7, 20.7, 0.3);
                    this.context.bezierCurveTo(24.4, 1.3, 27.8, 4.0, 27.8, 8.2);
                    this.context.bezierCurveTo(27.8, 9.6, 27.5, 11.0, 27.0, 12.4);
                    this.context.bezierCurveTo(26.5, 13.6, 26.4, 13.0, 25.4, 13.3);
                    this.context.bezierCurveTo(22.7, 13.9, 24.4, 17.5, 22.8, 17.7);
                    this.context.bezierCurveTo(22.8, 16.8, 23.1, 15.5, 21.9, 15.7);
                    this.context.bezierCurveTo(21.8, 16.8, 22.2, 17.7, 21.1, 17.7);
                    this.context.bezierCurveTo(20.2, 17.7, 21.4, 15.6, 19.9, 15.7);
                    this.context.bezierCurveTo(19.9, 16.7, 20.3, 17.8, 18.9, 17.7);
                    this.context.bezierCurveTo(18.8, 17.2, 19.0, 15.0, 18.0, 15.5);
                    this.context.bezierCurveTo(17.2, 16.0, 18.5, 17.6, 16.9, 17.7);
                    this.context.bezierCurveTo(16.8, 17.0, 16.7, 16.3, 16.7, 15.5);
                    this.context.bezierCurveTo(14.9, 15.4, 16.9, 18.2, 15.0, 17.7);
                    this.context.bezierCurveTo(15.3, 15.6, 14.8, 12.7, 12.1, 13.2);
                    this.context.bezierCurveTo(12.1, 13.2, 15.8, 12.6, 12.1, 13.2);
                    this.context.closePath();
                    this.context.fillStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.fill();
                    this.context.lineWidth = 0.3;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(15.4, 7.8);
                    this.context.bezierCurveTo(13.7, 7.8, 12.7, 10.2, 14.4, 11.0);
                    this.context.bezierCurveTo(16.4, 11.9, 17.9, 8.6, 15.4, 7.8);
                    this.context.bezierCurveTo(15.4, 7.8, 17.4, 8.4, 15.4, 7.8);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(255, 255, 255)";
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(23.1, 7.8);
                    this.context.bezierCurveTo(24.7, 7.8, 25.7, 10.2, 24.0, 11.0);
                    this.context.bezierCurveTo(22.1, 11.9, 20.5, 8.6, 23.1, 7.8);
                    this.context.bezierCurveTo(23.1, 7.8, 21.1, 8.4, 23.1, 7.8);
                    this.context.closePath();
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(19.2, 11.6);
                    this.context.bezierCurveTo(18.7, 12.7, 18.1, 13.7, 17.6, 14.7);
                    this.context.bezierCurveTo(18.7, 14.7, 19.8, 14.7, 20.9, 14.7);
                    this.context.bezierCurveTo(20.3, 13.7, 19.8, 12.7, 19.2, 11.6);
                    this.context.lineTo(19.2, 11.6);
                    this.context.closePath();
                    this.context.fill();
                    this.context.lineWidth = this.isColliding ? 5.0 : 1.0;
                    this.context.stroke();
                };
                Player.prototype.drawBody = function () {
                    this.context.beginPath();
                    this.context.moveTo(10.0, 24.2);
                    this.context.lineTo(29.0, 24.2);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(10.0, 28.2);
                    this.context.lineTo(29.0, 28.2);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(10.0, 34.2);
                    this.context.lineTo(29.0, 34.2);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(10.0, 39.2);
                    this.context.lineTo(29.0, 39.2);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(9.0, 44.2);
                    this.context.lineTo(15.0, 44.2);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(24.0, 44.2);
                    this.context.lineTo(29.0, 44.2);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(19.0, 21.2);
                    this.context.lineTo(19.0, 63.2);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(11.0, 64.1);
                    this.context.bezierCurveTo(16.2, 62.9, 14.2, 69.3, 19.3, 69.3);
                    this.context.bezierCurveTo(24.4, 69.3, 22.5, 62.9, 27.7, 64.1);
                    this.context.stroke();
                };
                Player.prototype.drawLeftArm = function () {
                    this.context.save();
                    this.context.translate(this.leftArmOrbitX, this.leftArmOrbitY);
                    this.context.rotate(this.leftArmDegree * Math.PI / 180);
                    this.context.translate(-this.leftArmOrbitX, -this.leftArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(2.9, 69.3);
                    this.context.bezierCurveTo(2.7, 66.8, 3.9, 65.1, 1.0, 65.3);
                    this.context.bezierCurveTo(2.2, 65.3, 3.5, 65.1, 4.6, 65.3);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(2.8, 46.4);
                    this.context.bezierCurveTo(2.8, 50.4, 4.7, 60.8, 1.0, 61.5);
                    this.context.bezierCurveTo(2.1, 61.5, 3.6, 61.9, 4.6, 61.5);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(1.0, 48.2);
                    this.context.lineTo(5.0, 48.2);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(4.6, 24.5);
                    this.context.bezierCurveTo(1.5, 29.2, 5.2, 42.0, 1.0, 43.1);
                    this.context.bezierCurveTo(2.1, 43.1, 3.6, 43.4, 4.6, 43.1);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawRightArm = function () {
                    this.context.save();
                    this.context.translate(this.rightArmOrbitX, this.rightArmOrbitY);
                    this.context.rotate(-this.rightArmDegree * Math.PI / 180);
                    this.context.translate(-this.rightArmOrbitX, -this.rightArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(35.3, 69.3);
                    this.context.bezierCurveTo(35.5, 66.8, 34.3, 65.1, 37.2, 65.3);
                    this.context.bezierCurveTo(36.0, 65.3, 34.7, 65.1, 33.6, 65.3);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(35.4, 46.4);
                    this.context.bezierCurveTo(35.4, 50.4, 33.5, 60.8, 37.2, 61.5);
                    this.context.bezierCurveTo(36.1, 61.5, 34.6, 61.9, 33.6, 61.5);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(37.0, 48.2);
                    this.context.lineTo(34.0, 48.2);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(33.6, 24.5);
                    this.context.bezierCurveTo(36.7, 29.2, 32.9, 42.0, 37.2, 43.1);
                    this.context.bezierCurveTo(36.1, 43.1, 34.6, 43.4, 33.6, 43.1);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawLeftLeg = function () {
                    this.context.save();
                    this.context.translate(this.leftLegOrbitX, this.leftLegOrbitY);
                    this.context.rotate(this.leftLegDegree * Math.PI / 180);
                    this.context.translate(-this.leftLegOrbitX, -this.leftLegOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(11.0, 68.1);
                    this.context.bezierCurveTo(11.0, 72.1, 13.0, 88.9, 9.1, 88.9);
                    this.context.bezierCurveTo(10.5, 88.9, 11.8, 88.9, 13.1, 88.9);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(13.1, 113.4);
                    this.context.bezierCurveTo(8.5, 109.0, 14.2, 93.1, 9.1, 92.3);
                    this.context.bezierCurveTo(10.5, 92.3, 11.8, 92.2, 13.1, 92.3);
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(3.3, 116.4);
                    this.context.bezierCurveTo(5.6, 116.4, 13.4, 117.9, 15.1, 116.4);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawRightLeg = function () {
                    this.context.save();
                    this.context.translate(this.rightLegOrbitX, this.rightLegOrbitY);
                    this.context.rotate(-this.rightLegDegree * Math.PI / 180);
                    this.context.translate(-this.rightLegOrbitX, -this.rightLegOrbitY);
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(27.4, 68.4);
                    this.context.bezierCurveTo(27.4, 72.5, 25.3, 89.2, 29.2, 89.2);
                    this.context.bezierCurveTo(27.9, 89.2, 26.6, 89.3, 25.2, 89.2);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(25.2, 113.8);
                    this.context.bezierCurveTo(29.8, 109.4, 24.2, 93.4, 29.2, 92.6);
                    this.context.bezierCurveTo(27.9, 92.6, 26.5, 92.5, 25.2, 92.6);
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(35.0, 116.8);
                    this.context.bezierCurveTo(32.7, 116.8, 25.0, 118.3, 23.3, 116.8);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawYoungHead = function () {
                    this.context.beginPath();
                    this.context.moveTo(13.0, 12.0);
                    this.context.bezierCurveTo(12.0, 9.9, 11.5, 7.4, 12.1, 5.2);
                    this.context.bezierCurveTo(13.1, 1.9, 17.5, -0.6, 20.8, 0.3);
                    this.context.bezierCurveTo(24.1, 1.2, 27.2, 3.6, 27.2, 7.4);
                    this.context.bezierCurveTo(27.2, 8.7, 26.9, 10.0, 26.4, 11.2);
                    this.context.bezierCurveTo(26.1, 12.3, 26.0, 11.8, 25.0, 12.0);
                    this.context.bezierCurveTo(22.6, 12.6, 24.1, 15.8, 22.7, 16.0);
                    this.context.bezierCurveTo(22.7, 15.3, 23.0, 14.1, 21.8, 14.2);
                    this.context.bezierCurveTo(21.8, 15.2, 22.2, 16.0, 21.1, 16.0);
                    this.context.bezierCurveTo(20.3, 16.0, 21.4, 14.1, 20.1, 14.2);
                    this.context.bezierCurveTo(20.1, 15.1, 20.4, 16.1, 19.1, 16.0);
                    this.context.bezierCurveTo(19.1, 15.6, 19.2, 13.6, 18.4, 14.1);
                    this.context.bezierCurveTo(17.6, 14.5, 18.8, 16.0, 17.3, 16.0);
                    this.context.bezierCurveTo(17.2, 15.4, 17.2, 14.7, 17.1, 14.1);
                    this.context.bezierCurveTo(15.5, 13.9, 17.3, 16.5, 15.6, 16.0);
                    this.context.bezierCurveTo(15.8, 14.2, 15.4, 11.5, 13.0, 12.0);
                    this.context.bezierCurveTo(13.0, 12.0, 16.3, 11.4, 13.0, 12.0);
                    this.context.closePath();
                    this.context.fillStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.fill();
                    this.context.lineWidth = 0.3;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(15.9, 7.0);
                    this.context.bezierCurveTo(14.5, 7.1, 13.5, 9.3, 15.1, 10.0);
                    this.context.bezierCurveTo(16.8, 10.8, 18.3, 7.8, 15.9, 7.0);
                    this.context.bezierCurveTo(15.9, 7.0, 17.7, 7.7, 15.9, 7.0);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(255, 255, 255)";
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(22.9, 7.0);
                    this.context.bezierCurveTo(24.4, 7.1, 25.3, 9.3, 23.7, 10.0);
                    this.context.bezierCurveTo(22.0, 10.8, 20.6, 7.8, 22.9, 7.0);
                    this.context.bezierCurveTo(22.9, 7.0, 21.1, 7.7, 22.9, 7.0);
                    this.context.closePath();
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(19.4, 10.3);
                    this.context.bezierCurveTo(18.9, 11.2, 18.4, 12.1, 17.9, 13.1);
                    this.context.bezierCurveTo(18.9, 13.1, 19.9, 13.1, 20.9, 13.1);
                    this.context.bezierCurveTo(20.4, 12.1, 19.9, 11.2, 19.4, 10.3);
                    this.context.lineTo(19.4, 10.3);
                    this.context.closePath();
                    this.context.fill();
                    this.context.lineWidth = this.isColliding ? 5.0 : 1.0;
                    this.context.stroke();
                };
                Player.prototype.drawYoungBody = function () {
                    this.context.beginPath();
                    this.context.moveTo(10.0, 22.6);
                    this.context.lineTo(29.0, 22.6);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(10.0, 26.6);
                    this.context.lineTo(29.0, 26.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(10.0, 32.6);
                    this.context.lineTo(29.0, 32.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(10.0, 37.6);
                    this.context.lineTo(29.0, 37.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(9.0, 42.6);
                    this.context.lineTo(15.0, 42.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(24.0, 42.6);
                    this.context.lineTo(29.0, 42.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(19.0, 19.6);
                    this.context.lineTo(19.0, 52.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(11.0, 57.4);
                    this.context.bezierCurveTo(16.2, 56.6, 14.2, 60.7, 19.3, 60.7);
                    this.context.bezierCurveTo(24.4, 60.7, 22.5, 56.6, 27.7, 57.4);
                    this.context.stroke();
                };
                Player.prototype.drawYoungLeftArm = function () {
                    this.context.save();
                    this.context.translate(this.leftArmOrbitX, this.leftArmOrbitY);
                    this.context.rotate(this.leftArmDegree * Math.PI / 180);
                    this.context.translate(-this.leftArmOrbitX, -this.leftArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(2.9, 56.6);
                    this.context.bezierCurveTo(2.7, 54.7, 3.9, 53.5, 1.0, 53.6);
                    this.context.bezierCurveTo(2.2, 53.6, 3.5, 53.5, 4.6, 53.6);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(2.8, 39.3);
                    this.context.bezierCurveTo(2.8, 42.4, 4.7, 50.2, 1.0, 50.8);
                    this.context.bezierCurveTo(2.1, 50.8, 3.6, 51.0, 4.6, 50.8);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(1.0, 40.6);
                    this.context.lineTo(5.0, 40.6);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(4.6, 22.8);
                    this.context.bezierCurveTo(1.5, 26.4, 5.2, 36.0, 1.0, 36.8);
                    this.context.bezierCurveTo(2.1, 36.8, 3.6, 37.1, 4.6, 36.8);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawYoungRightArm = function () {
                    this.context.save();
                    this.context.translate(this.rightArmOrbitX, this.rightArmOrbitY);
                    this.context.rotate(-this.rightArmDegree * Math.PI / 180);
                    this.context.translate(-this.rightArmOrbitX, -this.rightArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(35.3, 56.6);
                    this.context.bezierCurveTo(35.5, 54.7, 34.3, 53.5, 37.2, 53.6);
                    this.context.bezierCurveTo(36.0, 53.6, 34.7, 53.5, 33.6, 53.6);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(35.4, 39.3);
                    this.context.bezierCurveTo(35.4, 42.4, 33.5, 50.2, 37.2, 50.8);
                    this.context.bezierCurveTo(36.1, 50.8, 34.6, 51.0, 33.6, 50.8);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(37.0, 40.6);
                    this.context.lineTo(34.0, 40.6);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(33.6, 22.8);
                    this.context.bezierCurveTo(36.7, 26.4, 32.9, 36.0, 37.2, 36.8);
                    this.context.bezierCurveTo(36.1, 36.8, 34.6, 37.1, 33.6, 36.8);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawYoungLeftLeg = function () {
                    this.context.save();
                    this.context.translate(this.leftLegOrbitX, this.leftLegOrbitY);
                    this.context.rotate(this.leftLegDegree * Math.PI / 180);
                    this.context.translate(-this.leftLegOrbitX, -this.leftLegOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(11.0, 60.0);
                    this.context.bezierCurveTo(11.0, 62.6, 13.0, 73.5, 9.1, 73.5);
                    this.context.bezierCurveTo(10.5, 73.5, 11.8, 73.5, 13.1, 73.5);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(13.1, 89.5);
                    this.context.bezierCurveTo(8.5, 86.6, 14.2, 76.3, 9.1, 75.7);
                    this.context.bezierCurveTo(10.5, 75.7, 11.8, 75.7, 13.1, 75.7);
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(3.3, 91.5);
                    this.context.bezierCurveTo(5.6, 91.5, 13.4, 92.4, 15.1, 91.5);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawYoungRightLeg = function () {
                    this.context.save();
                    this.context.translate(this.rightLegOrbitX, this.rightLegOrbitY);
                    this.context.rotate(-this.rightLegDegree * Math.PI / 180);
                    this.context.translate(-this.rightLegOrbitX, -this.rightLegOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(27.4, 60.2);
                    this.context.bezierCurveTo(27.4, 62.8, 25.3, 73.7, 29.2, 73.7);
                    this.context.bezierCurveTo(27.9, 73.7, 26.6, 73.8, 25.2, 73.7);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(25.2, 89.7);
                    this.context.bezierCurveTo(29.8, 86.8, 24.2, 76.5, 29.2, 76.0);
                    this.context.bezierCurveTo(27.9, 76.0, 26.5, 75.9, 25.2, 76.0);
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(35.0, 91.7);
                    this.context.bezierCurveTo(32.7, 91.7, 25.0, 92.7, 23.3, 91.7);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawKidHead = function () {
                    this.context.beginPath();
                    this.context.moveTo(5.0, 12.0);
                    this.context.bezierCurveTo(4.0, 9.9, 3.5, 7.4, 4.1, 5.2);
                    this.context.bezierCurveTo(5.1, 1.9, 9.4, -0.6, 12.7, 0.3);
                    this.context.bezierCurveTo(16.1, 1.2, 19.1, 3.6, 19.2, 7.4);
                    this.context.bezierCurveTo(19.2, 8.7, 18.9, 10.0, 18.4, 11.2);
                    this.context.bezierCurveTo(18.0, 12.3, 17.9, 11.8, 17.0, 12.0);
                    this.context.bezierCurveTo(14.6, 12.6, 16.1, 15.8, 14.7, 16.0);
                    this.context.bezierCurveTo(14.6, 15.3, 14.9, 14.1, 13.8, 14.2);
                    this.context.bezierCurveTo(13.8, 15.2, 14.1, 16.0, 13.1, 16.0);
                    this.context.bezierCurveTo(12.3, 16.0, 13.4, 14.1, 12.1, 14.2);
                    this.context.bezierCurveTo(12.0, 15.1, 12.4, 16.1, 11.1, 16.0);
                    this.context.bezierCurveTo(11.1, 15.6, 11.2, 13.6, 10.3, 14.1);
                    this.context.bezierCurveTo(9.6, 14.5, 10.7, 16.0, 9.3, 16.0);
                    this.context.bezierCurveTo(9.2, 15.4, 9.2, 14.7, 9.1, 14.1);
                    this.context.bezierCurveTo(7.5, 13.9, 9.3, 16.5, 7.6, 16.0);
                    this.context.bezierCurveTo(7.8, 14.2, 7.4, 11.5, 5.0, 12.0);
                    this.context.bezierCurveTo(5.0, 12.0, 8.3, 11.4, 5.0, 12.0);
                    this.context.closePath();
                    this.context.fillStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.fill();
                    this.context.lineWidth = 0.3;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(7.9, 7.0);
                    this.context.bezierCurveTo(6.4, 7.1, 5.5, 9.3, 7.1, 10.0);
                    this.context.bezierCurveTo(8.8, 10.8, 10.2, 7.8, 7.9, 7.0);
                    this.context.bezierCurveTo(7.9, 7.0, 9.7, 7.7, 7.9, 7.0);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(255, 255, 255)";
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(14.9, 7.0);
                    this.context.bezierCurveTo(16.4, 7.1, 17.3, 9.3, 15.7, 10.0);
                    this.context.bezierCurveTo(14.0, 10.8, 12.6, 7.8, 14.9, 7.0);
                    this.context.bezierCurveTo(14.9, 7.0, 13.1, 7.7, 14.9, 7.0);
                    this.context.closePath();
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(11.4, 10.3);
                    this.context.bezierCurveTo(10.9, 11.2, 10.4, 12.1, 9.9, 13.1);
                    this.context.bezierCurveTo(10.9, 13.1, 11.9, 13.1, 12.9, 13.1);
                    this.context.bezierCurveTo(12.4, 12.1, 11.9, 11.2, 11.4, 10.3);
                    this.context.lineTo(11.4, 10.3);
                    this.context.closePath();
                    this.context.fill();
                    this.context.lineWidth = this.isColliding ? 5.0 : 1.0;
                    this.context.stroke();
                };
                Player.prototype.drawKidBody = function () {
                    this.context.beginPath();
                    this.context.moveTo(6.0, 19.6);
                    this.context.lineTo(17.0, 19.6);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(6.0, 22.6);
                    this.context.lineTo(17.0, 22.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(6.0, 25.6);
                    this.context.lineTo(17.0, 25.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(6.0, 28.6);
                    this.context.lineTo(17.0, 28.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(5.0, 31.6);
                    this.context.lineTo(9.0, 31.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(14.0, 31.6);
                    this.context.lineTo(17.0, 31.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(11.0, 18.6);
                    this.context.lineTo(11.0, 37.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(6.7, 39.5);
                    this.context.bezierCurveTo(9.5, 39.1, 8.5, 41.4, 11.3, 41.4);
                    this.context.bezierCurveTo(14.1, 41.4, 13.0, 39.1, 15.9, 39.5);
                    this.context.stroke();
                };
                Player.prototype.drawKidLeftArm = function () {
                    this.context.save();
                    this.context.translate(this.leftArmOrbitX, this.leftArmOrbitY);
                    this.context.rotate(this.leftArmDegree * Math.PI / 180);
                    this.context.translate(-this.leftArmOrbitX, -this.leftArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(2.2, 39.1);
                    this.context.bezierCurveTo(2.1, 38.1, 2.7, 37.4, 1.1, 37.4);
                    this.context.bezierCurveTo(1.8, 37.4, 2.5, 37.3, 3.1, 37.4);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(2.1, 29.5);
                    this.context.bezierCurveTo(2.1, 31.2, 3.2, 35.5, 1.1, 35.9);
                    this.context.bezierCurveTo(1.7, 35.9, 2.5, 36.0, 3.1, 35.9);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(1.0, 29.6);
                    this.context.lineTo(3.0, 29.6);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(3.1, 20.4);
                    this.context.bezierCurveTo(1.4, 22.3, 3.5, 27.7, 1.1, 28.1);
                    this.context.bezierCurveTo(1.7, 28.1, 2.6, 28.3, 3.1, 28.1);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawKidRightArm = function () {
                    this.context.save();
                    this.context.translate(this.rightArmOrbitX, this.rightArmOrbitY);
                    this.context.rotate(-this.rightArmDegree * Math.PI / 180);
                    this.context.translate(-this.rightArmOrbitX, -this.rightArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(20.1, 39.1);
                    this.context.bezierCurveTo(20.2, 38.1, 19.6, 37.4, 21.2, 37.4);
                    this.context.bezierCurveTo(20.5, 37.4, 19.8, 37.3, 19.2, 37.4);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(20.2, 29.5);
                    this.context.bezierCurveTo(20.2, 31.2, 19.1, 35.5, 21.2, 35.9);
                    this.context.bezierCurveTo(20.6, 35.9, 19.8, 36.0, 19.2, 35.9);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(21.0, 29.6);
                    this.context.lineTo(20.0, 29.6);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(19.2, 20.4);
                    this.context.bezierCurveTo(20.9, 22.3, 18.8, 27.7, 21.2, 28.1);
                    this.context.bezierCurveTo(20.6, 28.1, 19.8, 28.3, 19.2, 28.1);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawKidLeftLeg = function () {
                    this.context.save();
                    this.context.translate(this.leftLegOrbitX, this.leftLegOrbitY);
                    this.context.rotate(this.leftLegDegree * Math.PI / 180);
                    this.context.translate(-this.leftLegOrbitX, -this.leftLegOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(6.7, 41.0);
                    this.context.bezierCurveTo(6.7, 42.4, 7.8, 48.4, 5.6, 48.4);
                    this.context.bezierCurveTo(6.4, 48.4, 7.1, 48.5, 7.9, 48.4);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(7.9, 57.3);
                    this.context.bezierCurveTo(5.3, 55.7, 8.5, 50.0, 5.6, 49.7);
                    this.context.bezierCurveTo(6.4, 49.7, 7.1, 49.6, 7.9, 49.7);
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(2.4, 58.4);
                    this.context.bezierCurveTo(3.7, 58.4, 8.0, 58.9, 8.9, 58.4);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawKidRightLeg = function () {
                    this.context.save();
                    this.context.translate(this.rightLegOrbitX, this.rightLegOrbitY);
                    this.context.rotate(-this.rightLegDegree * Math.PI / 180);
                    this.context.translate(-this.rightLegOrbitX, -this.rightLegOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(15.7, 41.1);
                    this.context.bezierCurveTo(15.7, 42.5, 14.6, 48.6, 16.8, 48.6);
                    this.context.bezierCurveTo(16.0, 48.6, 15.3, 48.6, 14.5, 48.6);
                    this.context.lineWidth = this.isColliding ? 5.0 : 2.0;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(14.5, 57.4);
                    this.context.bezierCurveTo(17.1, 55.8, 14.0, 50.1, 16.8, 49.8);
                    this.context.bezierCurveTo(16.0, 49.8, 15.3, 49.8, 14.5, 49.8);
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(20.0, 58.5);
                    this.context.bezierCurveTo(18.7, 58.5, 14.4, 59.1, 13.5, 58.5);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawBabyHead = function () {
                    this.context.beginPath();
                    this.context.moveTo(1.1, 9.8);
                    this.context.bezierCurveTo(0.2, 8.1, -0.2, 6.1, 0.4, 4.3);
                    this.context.bezierCurveTo(1.2, 1.6, 4.7, -0.4, 7.4, 0.3);
                    this.context.bezierCurveTo(10.2, 1.0, 12.7, 3.0, 12.7, 6.1);
                    this.context.bezierCurveTo(12.7, 7.2, 12.4, 8.2, 12.1, 9.2);
                    this.context.bezierCurveTo(11.8, 10.1, 11.7, 9.7, 10.9, 9.9);
                    this.context.bezierCurveTo(8.9, 10.3, 10.2, 13.0, 9.0, 13.1);
                    this.context.bezierCurveTo(9.0, 12.5, 9.2, 11.5, 8.3, 11.7);
                    this.context.bezierCurveTo(8.3, 12.5, 8.6, 13.1, 7.7, 13.1);
                    this.context.bezierCurveTo(7.1, 13.1, 7.9, 11.6, 6.9, 11.7);
                    this.context.bezierCurveTo(6.9, 12.4, 7.1, 13.2, 6.1, 13.1);
                    this.context.bezierCurveTo(6.0, 12.8, 6.2, 11.1, 5.5, 11.6);
                    this.context.bezierCurveTo(4.9, 11.9, 5.8, 13.1, 4.6, 13.1);
                    this.context.bezierCurveTo(4.5, 12.6, 4.5, 12.1, 4.5, 11.6);
                    this.context.bezierCurveTo(3.1, 11.4, 4.6, 13.5, 3.2, 13.1);
                    this.context.bezierCurveTo(3.4, 11.6, 3.1, 9.5, 1.1, 9.8);
                    this.context.bezierCurveTo(1.1, 9.8, 3.8, 9.3, 1.1, 9.8);
                    this.context.closePath();
                    this.context.fillStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.fill();
                    this.context.lineWidth = 0.3;
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(3.5, 5.8);
                    this.context.bezierCurveTo(2.3, 5.8, 1.5, 7.6, 2.8, 8.2);
                    this.context.bezierCurveTo(4.2, 8.8, 5.4, 6.4, 3.5, 5.8);
                    this.context.bezierCurveTo(3.5, 5.8, 5.0, 6.3, 3.5, 5.8);
                    this.context.closePath();
                    this.context.fillStyle = "rgb(255, 255, 255)";
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(9.2, 5.8);
                    this.context.bezierCurveTo(10.4, 5.8, 11.2, 7.6, 9.9, 8.2);
                    this.context.bezierCurveTo(8.4, 8.8, 7.3, 6.4, 9.2, 5.8);
                    this.context.bezierCurveTo(9.2, 5.8, 7.7, 6.3, 9.2, 5.8);
                    this.context.closePath();
                    this.context.fill();
                    this.context.stroke();
                    // head/Path
                    this.context.beginPath();
                    this.context.moveTo(6.3, 8.8);
                    this.context.bezierCurveTo(5.9, 9.5, 5.5, 10.1, 5.1, 11.1);
                    this.context.bezierCurveTo(5.9, 11.1, 6.7, 11.1, 7.6, 11.1);
                    this.context.bezierCurveTo(7.2, 10.1, 6.7, 9.5, 6.3, 8.8);
                    this.context.lineTo(6.3, 8.8);
                    this.context.closePath();
                    this.context.fill();
                    this.context.lineWidth = this.isColliding ? 5.0 : 1.0;
                    this.context.stroke();
                };
                Player.prototype.drawBabyBody = function () {
                    this.context.beginPath();
                    this.context.moveTo(3.3, 16.1);
                    this.context.lineTo(9.3, 16.1);
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(3.3, 18.1);
                    this.context.lineTo(9.3, 18.1);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(3.3, 21.1);
                    this.context.lineTo(9.3, 21.1);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(3.3, 23.1);
                    this.context.lineTo(5.3, 23.1);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(8.3, 23.1);
                    this.context.lineTo(9.3, 23.1);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(6.8, 14.6);
                    this.context.lineTo(6.8, 24.6);
                    this.context.stroke();
                    // body/Path
                    this.context.beginPath();
                    this.context.moveTo(4.2, 26.5);
                    this.context.bezierCurveTo(5.9, 26.2, 5.3, 27.5, 6.9, 27.5);
                    this.context.bezierCurveTo(8.5, 27.5, 7.8, 26.2, 9.5, 26.5);
                    this.context.stroke();
                };
                Player.prototype.drawBabyLeftArm = function () {
                    this.context.save();
                    this.context.translate(this.leftArmOrbitX, this.leftArmOrbitY);
                    this.context.rotate(this.leftArmDegree * Math.PI / 180);
                    this.context.translate(-this.leftArmOrbitX, -this.leftArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(1.7, 26.2);
                    this.context.bezierCurveTo(1.6, 25.7, 2.0, 25.3, 1.1, 25.3);
                    this.context.bezierCurveTo(1.5, 25.3, 1.9, 25.3, 2.2, 25.3);
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(1.7, 20.8);
                    this.context.bezierCurveTo(1.7, 21.8, 2.3, 24.2, 1.1, 24.4);
                    this.context.bezierCurveTo(1.4, 24.4, 1.9, 24.5, 2.2, 24.4);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(1.3, 21.1);
                    this.context.lineTo(2.3, 21.1);
                    this.context.stroke();
                    // leftArm/Path
                    this.context.beginPath();
                    this.context.moveTo(2.2, 15.6);
                    this.context.bezierCurveTo(1.2, 16.7, 2.4, 19.8, 1.1, 20.0);
                    this.context.bezierCurveTo(1.4, 20.0, 1.9, 20.1, 2.2, 20.0);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawBabyRightArm = function () {
                    this.context.save();
                    this.context.translate(this.rightArmOrbitX, this.rightArmOrbitY);
                    this.context.rotate(this.rightArmDegree * Math.PI / 180);
                    this.context.translate(-this.rightArmOrbitX, -this.rightArmOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(11.9, 26.2);
                    this.context.bezierCurveTo(11.9, 25.7, 11.6, 25.3, 12.5, 25.3);
                    this.context.bezierCurveTo(12.1, 25.3, 11.7, 25.3, 11.4, 25.3);
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(11.9, 20.8);
                    this.context.bezierCurveTo(11.9, 21.8, 11.3, 24.2, 12.5, 24.4);
                    this.context.bezierCurveTo(12.1, 24.4, 11.7, 24.5, 11.4, 24.4);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(12.3, 21.1);
                    this.context.lineTo(11.3, 21.1);
                    this.context.stroke();
                    // rightArm/Path
                    this.context.beginPath();
                    this.context.moveTo(11.4, 15.6);
                    this.context.bezierCurveTo(12.3, 16.7, 11.1, 19.8, 12.5, 20.0);
                    this.context.bezierCurveTo(12.1, 20.0, 11.7, 20.1, 11.4, 20.0);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawBabyLeftLeg = function () {
                    this.context.save();
                    this.context.translate(this.leftLegOrbitX, this.leftLegOrbitY);
                    this.context.rotate(this.leftLegDegree * Math.PI / 180);
                    this.context.translate(-this.leftLegOrbitX, -this.leftLegOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(4.2, 27.3);
                    this.context.bezierCurveTo(4.2, 28.1, 4.9, 31.6, 3.6, 31.6);
                    this.context.bezierCurveTo(4.1, 31.6, 4.5, 31.6, 4.9, 31.6);
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(4.9, 36.6);
                    this.context.bezierCurveTo(3.5, 35.7, 5.2, 32.4, 3.6, 32.3);
                    this.context.bezierCurveTo(4.1, 32.3, 4.5, 32.2, 4.9, 32.3);
                    this.context.stroke();
                    // leftLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(1.8, 37.2);
                    this.context.bezierCurveTo(2.5, 37.2, 5.0, 37.5, 5.5, 37.2);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.drawBabyRightLeg = function () {
                    this.context.save();
                    this.context.translate(this.rightLegOrbitX, this.rightLegOrbitY);
                    this.context.rotate(-this.rightLegDegree * Math.PI / 180);
                    this.context.translate(-this.rightLegOrbitX, -this.rightLegOrbitY);
                    this.context.beginPath();
                    this.context.moveTo(9.4, 27.4);
                    this.context.bezierCurveTo(9.4, 28.2, 8.7, 31.6, 10.0, 31.6);
                    this.context.bezierCurveTo(9.6, 31.6, 9.1, 31.6, 8.7, 31.6);
                    this.context.strokeStyle = this.isColliding ? this.collideColor : "rgb(34, 30, 31)";
                    this.context.lineCap = "round";
                    this.context.lineJoin = "round";
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(8.7, 36.7);
                    this.context.bezierCurveTo(10.2, 35.8, 8.4, 32.5, 10.0, 32.3);
                    this.context.bezierCurveTo(9.6, 32.3, 9.1, 32.3, 8.7, 32.3);
                    this.context.stroke();
                    // rightLeg/Path
                    this.context.beginPath();
                    this.context.moveTo(11.8, 37.3);
                    this.context.bezierCurveTo(11.1, 37.3, 8.6, 37.6, 8.1, 37.3);
                    this.context.stroke();
                    this.context.restore();
                };
                Player.prototype.changeEra = function (n) {
                    switch (n) {
                        case 4:
                            this.era = 4;
                            this.leftArmOrbitX = 4.6;
                            this.leftArmOrbitY = 24.5;
                            this.rightArmOrbitX = 33.6;
                            this.rightArmOrbitY = 24.5;
                            this.leftLegOrbitX = 11.0;
                            this.leftLegOrbitY = 68.1;
                            this.rightLegOrbitX = 27.4;
                            this.rightLegOrbitY = 68.4;
                            this.leftLegX = 3.3;
                            this.leftLegY = 116.4;
                            this.rightLegX = 35;
                            this.rightLegY = 116.4;
                            break;
                        case 3:
                            this.era = 3;
                            this.leftArmOrbitX = 4.6;
                            this.leftArmOrbitY = 22.8;
                            this.rightArmOrbitX = 33.6;
                            this.rightArmOrbitY = 22.8;
                            this.leftLegOrbitX = 11.0;
                            this.leftLegOrbitY = 60.0;
                            this.rightLegOrbitX = 27.4;
                            this.rightLegOrbitY = 60.2;
                            this.leftLegX = 3.3;
                            this.leftLegY = 91.5;
                            this.rightLegX = 35.0;
                            this.rightLegY = 91.7;
                            break;
                        case 2:
                            this.era = 2;
                            this.leftArmOrbitX = 3.1;
                            this.leftArmOrbitY = 20.4;
                            this.rightArmOrbitX = 19.2;
                            this.rightArmOrbitY = 20.4;
                            this.leftLegOrbitX = 6.7;
                            this.leftLegOrbitY = 41.0;
                            this.rightLegOrbitX = 15.7;
                            this.rightLegOrbitY = 41.1;
                            this.leftLegX = 2.4;
                            this.leftLegY = 58.4;
                            this.rightLegX = 20.0;
                            this.rightLegY = 58.5;
                            break;
                        case 1:
                            this.era = 1;
                            this.leftArmOrbitX = 2.2;
                            this.leftArmOrbitY = 15.6;
                            this.rightArmOrbitX = 11.4;
                            this.rightArmOrbitY = 15.6;
                            this.leftLegOrbitX = 4.2;
                            this.leftLegOrbitY = 27.3;
                            this.rightLegOrbitX = 9.4;
                            this.rightLegOrbitY = 27.4;
                            this.leftLegX = 1.8;
                            this.leftLegY = 37.2;
                            this.rightLegX = 11.8;
                            this.rightLegY = 37.3;
                            break;
                    }
                };
                Player.prototype.rotate = function (cx, cy, x, y, angle) {
                    var radians = (Math.PI / 180) * angle, cos = Math.cos(radians), sin = Math.sin(radians), nx = (cos * (x - cx)) + (sin * (y - cy)) + cx, ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
                    return [nx, ny];
                };
                Player.prototype.getLeftLegCoor = function () {
                    var coor = this.rotate(this.leftLegOrbitX, this.leftLegOrbitY, this.leftLegX, this.leftLegY, -this.leftLegDegree);
                    return [coor[0] + this.x, coor[1] + this.y];
                };
                Player.prototype.getRightLegCoor = function () {
                    var coor = this.rotate(this.rightLegOrbitX, this.rightLegOrbitY, this.rightLegX, this.rightLegY, this.rightLegDegree);
                    return [coor[0] + this.x, coor[1] + this.y];
                };
                return Player;
            })(MCGE.UI.Movable);
            Graphics.Player = Player;
        })(Graphics = Component.Graphics || (Component.Graphics = {}));
    })(Component = MCGE.Component || (MCGE.Component = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Component;
    (function (Component) {
        var Grid = (function () {
            //constructor
            function Grid(game, column, row) {
                this.lastSpaceValue = 3;
                this.columnCount = column;
                this.rowCount = row;
                this.gridWidth = game.width / column;
                this.gridHeight = 300;
                this.mountainDrawables = [[], [], [], []];
                this.platformDrawables = [[], [], [], []];
                this.temporaryColumn = [];
                this.platforms = [];
                this.mountainFactory = new MCGE.Factories.MountainFactory();
                this.platformFactory = new MCGE.Factories.PlatformFactory();
            }
            //initializes the next platform obstacle set
            Grid.prototype.platformInit = function () {
                for (var k = 0; k < this.columnCount; k++) {
                    this.platforms[k] = Utils.randomBetween(1, 2);
                }
                var spaceValue;
                if (this.lastSpaceValue == 1) {
                    spaceValue = Utils.randomBetween(1, 2);
                }
                else if (this.lastSpaceValue == 4) {
                    spaceValue = Utils.randomBetween(3, 4);
                }
                else if (this.lastSpaceValue == 2) {
                    spaceValue = Utils.randomBetween(1, 3);
                }
                else if (this.lastSpaceValue == 3) {
                    spaceValue = Utils.randomBetween(2, 4);
                }
                this.platforms[spaceValue] = 0;
                this.lastSpaceValue = spaceValue;
            };
            //inits the first status
            Grid.prototype.init = function () {
                for (var i = 0; i < this.rowCount; i++) {
                    this.platformInit();
                    for (var j = 0; j < this.columnCount; j++) {
                        if (j == 0) {
                            //create left mountain (can take values 1-4)
                            var lvalue = MCGE.Helper.Utils.randomBetween(1, 4);
                            this.mountainDrawables[i][j] = this.mountainFactory.produce(lvalue, -50, i * this.gridHeight, i % 2 == 0 ? true : false);
                            this.platformDrawables[i][j] = this.platformFactory.produce(this.platforms[j], j * 150 - 50, i * 300 - 30);
                        }
                        else if (j == 5) {
                            //create right mountain (can take values 5-8)
                            var rvalue = MCGE.Helper.Utils.randomBetween(5, 8);
                            this.mountainDrawables[i][j] = this.mountainFactory.produce(rvalue, -700, i * this.gridHeight, i % 2 == 0 ? true : false);
                            this.platformDrawables[i][j] = this.platformFactory.produce(this.platforms[j], j * 150 - 50, i * 300 - 30);
                        }
                        else {
                            this.platformDrawables[i][j] = this.platformFactory.produce(this.platforms[j], j * 150 - 50, i * 300 - 30);
                            this.mountainDrawables[i][j] = new MCGE.UI.Space();
                        }
                    }
                }
            };
            //updates the position of mountains and platforms
            Grid.prototype.update = function (dy) {
                if (this.mountainDrawables[0][0].y < -350) {
                    this.swapPlatforms();
                    this.swapMountains();
                }
                for (var i = 0; i < this.rowCount; i++) {
                    for (var j = 0; j < this.columnCount; j++) {
                        this.platformDrawables[i][j].y -= dy;
                        this.mountainDrawables[i][j].y -= dy;
                    }
                }
            };
            //swaps the platforms instead of creating one for keeping memory low
            Grid.prototype.swapPlatforms = function () {
                //Save the first column to the temporary array
                for (var m = 0; m < this.columnCount; m++) {
                    this.temporaryColumn[m] = this.platformDrawables[0][m];
                }
                //swap the rest of all
                for (var i = 1; i < this.rowCount; i++) {
                    for (var j = 0; j < this.columnCount; j++) {
                        this.platformDrawables[i - 1][j] = this.platformDrawables[i][j];
                    }
                }
                //reinitialize the platforms
                this.platformInit();
                for (var k = 0; k < this.columnCount; k++) {
                    switch (this.platforms[k]) {
                        case 0:
                            this.temporaryColumn[k].isVisible = false;
                            this.temporaryColumn[k].y = 870;
                            break;
                        case 1:
                            this.temporaryColumn[k].isVisible = true;
                            this.temporaryColumn[k].horizontalFlip = false;
                            this.temporaryColumn[k].y = 870;
                            if (k == 0) {
                                this.temporaryColumn[k].x = -50;
                            }
                            else if (this.temporaryColumn[k].x < 0)
                                this.temporaryColumn[k].x *= -1;
                            break;
                        case 2:
                            this.temporaryColumn[k].isVisible = true;
                            this.temporaryColumn[k].horizontalFlip = true;
                            this.temporaryColumn[k].y = 870;
                            if (k == 0) {
                                this.temporaryColumn[k].x = 50;
                            }
                            else if (this.temporaryColumn[k].x > 0)
                                this.temporaryColumn[k].x *= -1;
                            break;
                    }
                }
                //place it
                for (var m = 0; m < this.columnCount; m++) {
                    this.platformDrawables[3][m] = this.temporaryColumn[m];
                }
            };
            //swaps the mountains instead of creating one for keeping memory low
            Grid.prototype.swapMountains = function () {
                // save the first two
                var temp = [this.mountainDrawables[0][0], this.mountainDrawables[0][5]];
                //swap the rest
                for (var i = 1; i < this.rowCount; i++) {
                    for (var j = 0; j < this.columnCount; j++) {
                        this.mountainDrawables[i - 1][j] = this.mountainDrawables[i][j];
                    }
                }
                // reinitialize the mountains
                for (var i = 0; i < 2; i++) {
                    temp[i].mountainType = Utils.randomBetween(1, 2) == 1 ? false : true;
                    temp[i].y = this.mountainDrawables[2][0].y + 300;
                }
                this.mountainDrawables[3][0] = temp[0];
                this.mountainDrawables[3][5] = temp[1];
            };
            //returns the first space's coordinates
            Grid.prototype.giveSpaceCoor = function () {
                var num;
                var isFlipped;
                for (var i = 1; i < this.columnCount - 1; i++) {
                    if (this.platformDrawables[1][i].isVisible == false) {
                        num = i;
                        isFlipped = this.platformDrawables[1][i].horizontalFlip == true ? -1 : 1;
                    }
                }
                return [this.platformDrawables[1][num].x * isFlipped, this.platformDrawables[1][num].y];
            };
            return Grid;
        })();
        Component.Grid = Grid;
    })(Component = MCGE.Component || (MCGE.Component = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var Component;
    (function (Component) {
        var Game;
        (function (Game) {
            //It keeps the game related data
            var GameStatus = (function () {
                //constructor
                function GameStatus() {
                    //isStarted for the scoring
                    this.isStarted = false;
                    this.speed = 0;
                    this.age = 75000;
                    this.memories = 1500;
                    this.score = 0;
                    this.time = 0;
                    this.speedLimit = 8;
                }
                //updates the data
                GameStatus.prototype.update = function () {
                    this.time++;
                    if (this.speed < this.speedLimit)
                        this.speed = (5 * this.time * this.time) / 10000;
                    this.speedBox.setPercent((this.speed / this.speedLimit) * 100);
                    this.age = this.age - Math.pow(Math.floor(11 - this.speed), 2);
                    this.ageBox.setPercent(this.age / 1000);
                    this.memoryBox.setPercent(this.age / 3000 * 4);
                    if (this.age <= 0)
                        this.age = 0;
                };
                //decreases the speed when the player hit an object
                GameStatus.prototype.decreaseSpeed = function () {
                    this.time = 50;
                };
                //adds info boxes to use
                GameStatus.prototype.addInfoBoxes = function (ageBox, memoryBox, speedBox) {
                    this.ageBox = ageBox;
                    this.memoryBox = memoryBox;
                    this.speedBox = speedBox;
                };
                //resets game status
                GameStatus.prototype.reset = function () {
                    this.speed = 0;
                    this.age = 75000;
                    this.memories = 1500;
                    this.score = 0;
                    this.time = 0;
                    this.speedLimit = 8;
                    this.isStarted = false;
                };
                //starts to keep time data
                GameStatus.prototype.start = function () {
                    if (this.isStarted == false) {
                        var time = new Date();
                        this.startTime = time.getTime();
                        this.isStarted = true;
                    }
                };
                //stops the keep time data
                GameStatus.prototype.stop = function () {
                    var time = new Date();
                    this.finishTime = time.getTime();
                    this.score = this.finishTime - this.startTime;
                };
                return GameStatus;
            })();
            Game.GameStatus = GameStatus;
        })(Game = Component.Game || (Component.Game = {}));
    })(Component = MCGE.Component || (MCGE.Component = {}));
})(MCGE || (MCGE = {}));
/// <reference path="./core/GameState.ts"/>
/// <reference path="./core/Game.ts"/>
/// <reference path="./core/Scene.ts"/>
/// <reference path="./core/World.ts"/>
/// <reference path="./core/Engine.ts"/>
/// <reference path="./helper/Utils.ts"/>
/// <reference path="./ui/Drawable.ts"/>
/// <reference path="./ui/Label.ts"/>
/// <reference path="./ui/StylishLabel.ts"/>
/// <reference path="./ui/Movable.ts"/>
/// <reference path="./ui/MovableLabel.ts"/>
/// <reference path="./component/Story.ts"/>
/// <reference path="./component/StoryTeller.ts"/>
/// <reference path="./component/Graphics.ts"/>
/// <reference path="./component/Player.ts"/>
/// <reference path="./component/Grid.ts"/>
/// <reference path="./component/Game/GameStatus.ts"/>
var GameState = MCGE.Core.GameState;
var Scene = MCGE.Core.Scene;
var World = MCGE.Core.World;
var Engine = MCGE.Core.Engine;
var Drawable = MCGE.UI.Drawable;
var Utils = MCGE.Helper.Utils;
var Label = MCGE.UI.Label;
var StylishLaber = MCGE.UI.StylishLabel;
var MovableLabel = MCGE.UI.MovableLabel;
var Story = MCGE.Component.Story;
var StoryTeller = MCGE.Component.StoryTeller;
var Game = MCGE.Core.Game;
var Player = MCGE.Component.Graphics.Player;
var Mountain = MCGE.Component.Graphics.Mountain;
var Platform = MCGE.Component.Graphics.Platform;
var InfoBox = MCGE.Component.Graphics.InfoBox;
var Grid = MCGE.Component.Grid;
var GameStatus = MCGE.Component.Game.GameStatus;
function Main() {
    //creating a game
    var game = new Game("Die to Born", 800, 600);
    //Add a storyteller
    var storyScene = new Scene("StoryScene");
    var storyTeller = new StoryTeller(storyScene, game.width, game.height);
    //Add some story to storyTeller
    storyTeller.addStoryText("Science says that we came from singularity and&after the BigBang, singularity became our universe&which has been expanding continiously.&Time has been ticking forward. You were born in 1989&and collected so much memories with your family.&Evantually you died in 2064.");
    storyTeller.addStoryText("The theory says that there is a limit for expanding& and if the size of the universe reaches to this limit& universe would start to shrink.&When the shrinking starts,& Everything would be REVERSED& Even the time!&Well, that limit has been reached and&the time has started to running back.&So, you will die, live and born again.&Then you will disappear forever&like you have never existed.");
    storyTeller.addStoryText("There is nothing to do except one.&You can fall as fast as you can,&only this will make the time slower and&keep your memories in your mind.&&Just use the left and right arrow keys to play.");
    //Add a world
    var world = new World();
    //Add a game scene
    var gameScene = new Scene("Game");
    //Add a movable player
    var player = new Player(380, 100);
    game.addPlayer(player);
    gameScene.addDrawable(player);
    //Init a grid system to keep game screen simple
    var grid = new Grid(game, 6, 4);
    grid.init();
    for (var i = 0; i < grid.rowCount; i++) {
        for (var j = 0; j < grid.columnCount; j++) {
            gameScene.addDrawable(grid.platformDrawables[i][j]);
        }
    }
    for (var i = 0; i < grid.rowCount; i++) {
        for (var j = 0; j < grid.columnCount; j++) {
            gameScene.addDrawable(grid.mountainDrawables[i][j]);
        }
    }
    //create info boxes 
    var ageBox = new InfoBox(110, 10, 75, "#17a4e6");
    var memoryBox = new InfoBox(400, 10, 100, "#00ff00");
    var speed = new InfoBox(640, 10, 10, "#ff1e1f");
    //add these infoboxes to the game
    gameScene.addDrawable(ageBox);
    gameScene.addDrawable(memoryBox);
    gameScene.addDrawable(speed);
    gameScene.addDrawable(new Label("Age:", 50, 32, 22, "Impact", "black"));
    gameScene.addDrawable(new Label("Memories:", 265, 32, 22, "Impact", "black"));
    gameScene.addDrawable(new Label("Speed:", 550, 32, 22, "Impact", "black"));
    //Add scene to the world
    world.AddStroyScene(storyScene);
    world.AddScene(gameScene);
    //Add world to the game
    game.add2dWorld(world);
    //Add an engine to run the world and initialize it
    var engine = new Engine(game);
    engine.setStoryTeller(storyTeller);
    engine.gameStatus.addInfoBoxes(ageBox, memoryBox, speed);
    engine.init();
    engine.run(grid);
}
//Invoke the Main when page is loaded
window.addEventListener("load", Main, false);
var MCGE;
(function (MCGE) {
    var Factories;
    (function (Factories) {
        //this class creates mountain according to the given number
        var MountainFactory = (function () {
            function MountainFactory() {
            }
            MountainFactory.prototype.produce = function (value, x, y, isVerticalFlipped) {
                switch (value) {
                    case 1:
                        return new Mountain(x, y, false, false, isVerticalFlipped);
                        break;
                    case 2:
                        return new Mountain(x, y, false, false, isVerticalFlipped);
                        break;
                    case 3:
                        return new Mountain(x, y, true, false, isVerticalFlipped);
                        break;
                    case 4:
                        return new Mountain(x, y, true, false, isVerticalFlipped);
                        break;
                    case 5:
                        return new Mountain(x, y, false, true, isVerticalFlipped);
                        break;
                    case 6:
                        return new Mountain(x, y, false, true, isVerticalFlipped);
                        break;
                    case 7:
                        return new Mountain(x, y, true, true, isVerticalFlipped);
                        break;
                    case 8:
                        return new Mountain(x, y, true, true, isVerticalFlipped);
                        break;
                    default:
                        console.log("Couldn't produce a mountain block");
                        break;
                }
            };
            return MountainFactory;
        })();
        Factories.MountainFactory = MountainFactory;
        //this class creates platform according to the given number and positions
        var PlatformFactory = (function () {
            function PlatformFactory() {
            }
            PlatformFactory.prototype.produce = function (value, x, y) {
                switch (value) {
                    case 0:
                        return new Platform(x, y, false, false);
                        break;
                    case 1:
                        return new Platform(x, y, false);
                        break;
                    case 2:
                        return new Platform(-x, y, true);
                        break;
                    default:
                        console.log("Couldn't produce a mountain block");
                        break;
                }
            };
            return PlatformFactory;
        })();
        Factories.PlatformFactory = PlatformFactory;
    })(Factories = MCGE.Factories || (MCGE.Factories = {}));
})(MCGE || (MCGE = {}));
var MCGE;
(function (MCGE) {
    var UI;
    (function (UI) {
        //this is a space that means nothing
        var Space = (function (_super) {
            __extends(Space, _super);
            function Space() {
                _super.call(this, 0, 0);
            }
            return Space;
        })(UI.Drawable);
        UI.Space = Space;
    })(UI = MCGE.UI || (MCGE.UI = {}));
})(MCGE || (MCGE = {}));
//# sourceMappingURL=main.js.map