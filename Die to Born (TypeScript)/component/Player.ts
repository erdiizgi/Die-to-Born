module MCGE.Component.Graphics {

    // Player class inludes all the related functions with the player 
    export class Player extends UI.Movable {
        private scaleRate: number = 0.15;
        public speed: number = 5;
        public era: number = 4;
        private leftArmDegree: number = 0;
        private leftArmOrbitX: number = 4.6;
        private leftArmOrbitY: number = 24.5;
        private rightArmDegree: number = 0;
        private rightArmOrbitX: number = 33.6;
        private rightArmOrbitY: number = 24.5;
        private leftLegDegree: number = 0;
        private leftLegOrbitX: number = 11.0;
        private leftLegOrbitY: number = 68.1;
        private rightLegDegree: number = 0;
        private rightLegOrbitX: number = 27.4;
        private rightLegOrbitY: number = 68.4;

        public leftLegX: number = 3.3;
        public leftLegY: number = 116.4;
        public rightLegX: number = 35;
        public rightLegY: number = 116.4;

        private cleftArmDegree = 0;
        private crightArmDegree = 0;
        private cleftLegDegree = 0;
        private crightLegDegree = 0;

        public isColliding: boolean = false;
        public collideColor: string = "#17a4e6";

        // initializes the super class
        constructor(x: number, y: number) {
            super(x, y);
        }

        setDegree(degree: number) {
            this.leftArmDegree = this.cleftArmDegree + degree;
            this.rightArmDegree = this.crightArmDegree + degree;
            this.leftLegDegree = this.cleftLegDegree + degree;
            this.rightLegDegree = this.crightLegDegree + degree;
        }

        initDegrees() {
            this.cleftArmDegree = 0;
            this.crightArmDegree = 0;
            this.cleftLegDegree = 0;
            this.crightLegDegree = 0;
        }

        // draw method for the for all the body parts
        draw() {
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
           
        }

        update() {
            if (this.Key.isDown(this.Key.LEFT)) this.moveLeft();
            if (this.Key.isDown(this.Key.RIGHT)) this.moveRight();
        }

        moveLeft() {
            if(this.x > 50)
                this.x -= this.speed;
            this.crightArmDegree += 0.6; 
            this.cleftArmDegree -= 0.6; 
            this.cleftLegDegree += 2;
            this.crightLegDegree -= 2;
        }
        moveRight() {
            if(this.x < 700)
                this.x += this.speed;
            this.cleftArmDegree += 0.6; 
            this.crightArmDegree -= 0.6; 
            this.cleftLegDegree -= 2;
            this.crightLegDegree += 2;
        }

        drawHead() {
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
        }
        drawBody() {
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
        }
        drawLeftArm() {
            this.context.save()
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
        }
        drawRightArm() {
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
        }
        drawLeftLeg() {
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

        }
        drawRightLeg() {
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
        }

        
        drawYoungHead() {
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
        } 
        drawYoungBody() {
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
        }
        drawYoungLeftArm() {
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
        }
        drawYoungRightArm() {
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
        }
        drawYoungLeftLeg() {
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
        }
        drawYoungRightLeg() {
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

        }
    
        drawKidHead() {
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
        }
        drawKidBody() {
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
        }
        drawKidLeftArm() {
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
        }
        drawKidRightArm() {
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
        }
        drawKidLeftLeg() {
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
        }
        drawKidRightLeg() {
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
        }

        drawBabyHead() {
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
        }
        drawBabyBody() {
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
        }
        drawBabyLeftArm() {
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
        }
        drawBabyRightArm() {
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
        }
        drawBabyLeftLeg() {
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
        }
        drawBabyRightLeg() {
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
        }

        changeEra(n: number) {
            switch (n) {
                case 4:
                    this.era = 4;
                    this.leftArmOrbitX= 4.6;
                    this.leftArmOrbitY= 24.5;
       
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
                    break

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
        }

        rotate(cx, cy, x, y, angle) {
        var radians = (Math.PI / 180) * angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return [nx, ny];
        }

        getLeftLegCoor(): number[] {
            var coor = this.rotate(this.leftLegOrbitX, this.leftLegOrbitY, this.leftLegX, this.leftLegY, -this.leftLegDegree);
            return [coor[0] + this.x  , coor[1] + this.y];
        }

        getRightLegCoor(): number[] {
            var coor = this.rotate(this.rightLegOrbitX, this.rightLegOrbitY, this.rightLegX, this.rightLegY, this.rightLegDegree);
            return [coor[0] + this.x, coor[1] + this.y];
        }
    }
}