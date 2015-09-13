module MCGE.Core {
    export class Game {
        public name: string;
        public width: number;
        public height: number;
        public scaledWidth: number;
        public scaledHeight: number;
        public aspectRatio: number;
        public gameState: GameState;
        public world: World;
        public player: Player;

        constructor(name: string, width: number, height: number) {
            //initialize the size
            this.width = width;
            this.height = height;
            this.aspectRatio = this.width / this.height;
            this.scaledHeight = window.innerHeight;
            this.scaledWidth = (this.scaledHeight * this.aspectRatio + 0.5) | 0;

            //Create an game state keeper
            this.gameState = new GameState("StoryTeller");
        }

        add2dWorld(world: World) {
            this.world = world;
        }

        addPlayer(player: Player) {
            this.player = player;
        }

        reCalculate() {
            this.scaledHeight = window.innerHeight;
            this.scaledWidth = (this.scaledHeight * this.aspectRatio + 0.5) | 0;
        }
    }
} 