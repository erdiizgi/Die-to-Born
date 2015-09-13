module MCGE.Core {
    export class Engine {
        private world: World;
        private game: Game;
        private width: number;
        private height: number;
        private aspectRatio: number = 4 / 3;
        private container: HTMLDivElement;
        private storyTeller: StoryTeller;
        public gameStatus: GameStatus;

        constructor(game: Game) {
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

        setStoryTeller(storyTeller: StoryTeller) {
            this.storyTeller = storyTeller;
            this.storyTeller.init();
        }

        public init(): void {


            //Append the canvas' to the page
            for (var i: number = 0; i < this.world.Scenes.length; i++) {
                var scene: HTMLCanvasElement = this.world.Scenes[i].scene;
                Utils.canvasCss(scene, this.game.width, this.game.height, this.game.scaledWidth, this.game.scaledHeight, "#e7f8f6");
                this.container.appendChild(scene);
            }

            Utils.canvasCss(this.world.StoryScene.scene, this.game.width, this.game.height, this.game.scaledWidth, this.game.scaledHeight);
            this.container.appendChild(this.world.StoryScene.scene);

            document.body.appendChild(this.container);
            window.addEventListener('resize', function (event) { this.resize(); }.bind(this), false);
            document.onmousedown = function (event) {
                if (this.game.gameState.state == "StoryTeller" || this.game.gameState.state == "GameOver" ) {
                    if (this.storyTeller.hasNext) {
                        this.storyTeller.next();
                    } else {
                        this.storyTeller.clean(this.width, this.height);
                        this.game.gameState.state = "Playing";
                    }
                   
                }
            }.bind(this);
        }

        public run(grid: Grid): void {
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
                    for (var i: number = 0; i < this.world.Scenes.length; i++) {
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

                        for (var i: number = 0; i < this.world.Scenes.length; i++) {
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
            
            window.requestAnimationFrame(() => this.run(grid));
        }

        checkForCollision(grid: Grid, leftLeg: number[], rightLeg: number[]) {
            var obstacle = grid.giveSpaceCoor();
            var result = false;
            if ((leftLeg[1] > obstacle[1] && leftLeg[1] < obstacle[1] + 30) || (rightLeg[1] > obstacle[1] && rightLeg[1] < obstacle[1] + 30)) {
                if ((leftLeg[0] > obstacle[0] && leftLeg[0] < obstacle[0] + 150) && (rightLeg[0] > obstacle[0] && rightLeg[0] < obstacle[0] + 150)){
                    result = false;
                }
                else{
                    result = true;
                }
            }

            return result;
        }

        playerCheckEra(age){
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

        }


        public resize(): void {
            this.game.reCalculate();
            Utils.containerCss(<HTMLDivElement> document.getElementById("container"), this.game.scaledWidth, this.game.scaledHeight);
            var scenes = document.getElementsByTagName("canvas");
            for (var i: number = 0; i < scenes.length; i++) {
                Utils.canvasCss(scenes[i], this.game.width, this.game.height, this.game.scaledWidth, this.game.scaledHeight);
            }
        }
    }
} 