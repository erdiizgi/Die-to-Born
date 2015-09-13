module MCGE.Factories {
    export class MountainFactory {
        constructor() { }

        produce(value, x, y, isVerticalFlipped) {
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
        }
    }

    export class PlatformFactory {
        constructor() { }

        produce(value, x, y) {
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
        }
    }
} 