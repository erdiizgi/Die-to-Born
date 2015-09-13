module MCGE.Component.Game {
    export class GameStatus {
        public speed: number;
        public age: number;
        public memories: number;
        public ageBox: InfoBox;
        public memoryBox: InfoBox;
        public speedBox: InfoBox;
        public score: number;

        public isStarted: boolean = false;

        private speedLimit: number;
        private time: number;
        public startTime: number;
        public finishTime: number;

        constructor() {
            this.speed = 0;
            this.age = 75000;
            this.memories = 1500;
            this.score = 0;
            this.time = 0;
            this.speedLimit = 8;
        }

        update() {
            this.time++;

            if (this.speed < this.speedLimit)
                this.speed = (5 * this.time * this.time) / 10000;

            this.speedBox.setPercent((this.speed / this.speedLimit) * 100);
            this.age = this.age - Math.pow(Math.floor(11 - this.speed), 2);
            this.ageBox.setPercent(this.age/1000);
            this.memoryBox.setPercent(this.age / 3000 * 4);
            if (this.age <= 0)
                this.age = 0;
        }

        decreaseSpeed() {
            this.time = 50;
        }

        addInfoBoxes(ageBox: InfoBox, memoryBox: InfoBox, speedBox: InfoBox) {
            this.ageBox = ageBox;
            this.memoryBox = memoryBox;
            this.speedBox = speedBox;
        }

        reset() {
            this.speed = 0;
            this.age = 75000;
            this.memories = 1500;
            this.score = 0;
            this.time = 0;
            this.speedLimit = 8;
            this.isStarted = false;
        }

        start() {
            if (this.isStarted == false) {
                var time: Date = new Date();
                this.startTime = time.getTime();
                this.isStarted = true;
            }
        }

        stop() {
            var time: Date = new Date();
            this.finishTime = time.getTime();
            this.score = this.finishTime - this.startTime;
        }
    }
} 