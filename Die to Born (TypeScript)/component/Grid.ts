module MCGE.Component {
    export class Grid {
        //varibles
        public mountainDrawables: MCGE.UI.Drawable[][];
        public platformDrawables: MCGE.UI.Drawable[][];
        temporaryColumn: MCGE.UI.Drawable[];
        mountainFactory: MCGE.Factories.MountainFactory;
        platformFactory: MCGE.Factories.PlatformFactory;
        lastSpaceValue: number = 3;
        platforms: number[];
        gridWidth: number;
        gridHeight: number;
        columnCount: number;
        rowCount: number;
        
        //constructor
        constructor(game: Game, column: number, row: number) {
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

        platformInit() {
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
        }

        init() {
            for (var i = 0; i < this.rowCount; i++) {

                this.platformInit();

                for (var j = 0; j < this.columnCount; j++) {

                    if (j == 0) {
                        //create left mountain (can take values 1-4)
                        var lvalue = Helper.Utils.randomBetween(1, 4);
                        this.mountainDrawables[i][j] = this.mountainFactory.produce(lvalue, -50, i * this.gridHeight, i % 2 == 0 ? true : false);
                        this.platformDrawables[i][j] = this.platformFactory.produce(this.platforms[j], j * 150 - 50, i * 300 - 30);
                    }

                    else if (j == 5) {
                        //create right mountain (can take values 5-8)
                        var rvalue = Helper.Utils.randomBetween(5, 8);
                        this.mountainDrawables[i][j] = this.mountainFactory.produce(rvalue, -700, i * this.gridHeight, i % 2 == 0 ? true : false);
                        this.platformDrawables[i][j] = this.platformFactory.produce(this.platforms[j], j * 150 - 50, i * 300 - 30);
                    }

                    else {
                        this.platformDrawables[i][j] = this.platformFactory.produce(this.platforms[j], j * 150 - 50 , i * 300 - 30);
                        this.mountainDrawables[i][j] = new UI.Space();
                    }
                }
            }
        }

        update(dy: number) {

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

            
        }

        swapPlatforms() {
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
                        (<MCGE.Component.Graphics.Platform> this.temporaryColumn[k]).horizontalFlip = false;
                        this.temporaryColumn[k].y = 870;
                        if (k == 0) {
                            this.temporaryColumn[k].x = -50;
                        }
                        else if (this.temporaryColumn[k].x < 0)
                            this.temporaryColumn[k].x *= -1;
                        break;
                    case 2:
                        this.temporaryColumn[k].isVisible = true;
                        (<MCGE.Component.Graphics.Platform> this.temporaryColumn[k]).horizontalFlip = true;
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
            for (var m = 0; m < this.columnCount; m++){
                this.platformDrawables[3][m] = this.temporaryColumn[m];
            }
        }

        swapMountains() {
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
                (<Mountain> temp[i]).mountainType = Utils.randomBetween(1, 2) == 1 ? false : true; 
                temp[i].y = this.mountainDrawables[2][0].y + 300;
            }

            this.mountainDrawables[3][0] = temp[0];
            this.mountainDrawables[3][5] = temp[1];

        }

        giveSpaceCoor() {
            var num;
            var isFlipped;
            for (var i = 1; i < this.columnCount - 1; i++) {
                if (this.platformDrawables[1][i].isVisible == false) {
                    num = i;
                    isFlipped = (<Platform> this.platformDrawables[1][i]).horizontalFlip == true ? -1 : 1;
                }
            }
            return [this.platformDrawables[1][num].x * isFlipped, this.platformDrawables[1][num].y];
        }
    }
}