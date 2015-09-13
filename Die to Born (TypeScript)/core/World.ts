module MCGE.Core {
    export class World {
        private sceneDeck: Scene[];
        private storyScene: Scene;

        constructor() {
            this.sceneDeck = [];
        }

        public AddScene(scene: Scene) {
            this.sceneDeck.push(scene);
        }

        public AddStroyScene(scene: Scene) {
            this.storyScene = scene;
        }

        get Scenes(): Scene[]{
            return this.sceneDeck;
        }

        get StoryScene(): Scene {
            return this.storyScene;
        }
    }
} 