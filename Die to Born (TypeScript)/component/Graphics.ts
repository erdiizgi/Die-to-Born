module MCGE.Component.Graphics {
    export class Square extends MCGE.UI.Drawable {
        width: number;
        height: number;
        lineWidth: number;

        constructor(x:number, y:number, width: number, height: number, lineWidth: number) {
            super(x, y);
            this.width = width;
            this.height = height;
            this.lineWidth = lineWidth;
        }

        draw() {
            this.context.beginPath();
            this.context.lineWidth = this.lineWidth;
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.stroke();
            this.context.closePath();
        }

        update() { }
    } 

    export class Circle extends MCGE.UI.Drawable {
        radius: number;
        opacity: number;
        color: string;
        isAnimated: boolean;
        count: number = 0;
        animationSpeed: number = 0.2;
        animationLimit: number = 100;

        constructor(x: number, y: number, radius: number, color: string, isAnimated: boolean, opacity: number) {
            super(x, y);
            this.radius = radius;
            this.color = color;
            this.isAnimated = isAnimated;
            this.opacity = opacity;
        }

        draw() {
            this.context.save();
            this.context.beginPath();
            this.context.globalAlpha = this.opacity;
            this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
            this.context.restore();
        }

        update() {
            if (this.isAnimated) {
                if (this.count <= this.animationLimit)
                    this.radius += this.animationSpeed;
                else if (this.count > this.animationLimit && this.count <this.animationLimit*2)
                    this.radius -= this.animationSpeed;
                else if (this.count >= this.animationLimit*2)
                    this.count = 0;

                this.count += 1;
            }
        }
    }

    export class Mountain extends MCGE.UI.Drawable {
        public verticalFlip: boolean;
        private horizontalFlip: boolean;
        public mountainType: boolean;

        constructor(x: number, y: number, mountainType:boolean, side: boolean, isFlipped: boolean) {
            super(x, y);
            this.mountainType = mountainType;
            this.horizontalFlip = side;
            this.verticalFlip = isFlipped;
        }

        draw() {
            
            this.context.save();
            
            if (this.verticalFlip == true) {
                this.context.translate(0, 300);
                this.context.scale(1, -1);
                
            }

            if (this.horizontalFlip == true) {
                this.context.translate(150, 0);
                this.context.scale(-1, 1);
            }

            if(this.verticalFlip==true)
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
        }

        draw1() {
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
        }

        draw2() { 
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
        }
    }

    export class Platform extends MCGE.UI.Drawable {
        
        public horizontalFlip: boolean;

        constructor(x: number, y: number, isFlipped: boolean, isVisible?:boolean) {
            super(x, y, isVisible != undefined ? isVisible : true);
            this.horizontalFlip = isFlipped;
        }

        draw() {
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
        }
    }

    export class InfoBox extends UI.Drawable {
        private percent: number;
        private color: string;
       
        constructor(x: number, y: number, percent:number, color: string) {
            super(x, y);
            this.percent = percent;
            this.width = 102;
            this.height = 22;
            this.color = color;
        }

        draw() {
            this.context.beginPath();
            this.context.rect(this.x, this.y, this.width, this.height);
            this.context.fillStyle = 'black';
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.rect(this.x+1, this.y+1, this.percent, 20);
            this.context.fillStyle = this.color;
            this.context.fill();
            this.context.closePath();
        }

        setPercent(percent: number) {
            this.percent = percent;
        }
    }
} 