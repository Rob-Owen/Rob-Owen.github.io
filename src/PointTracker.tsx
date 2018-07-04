import { Bodies } from 'matter-js';

export default class PointerTracker {
    private startTimeStamp: number;
    private scaleFactor: number;
    
    public constructor(width: number, public yPosition: number) {
        this.updateWidth(width);
        this.startTimeStamp = (new Date()).getTime();
    }

    public updateWidth(newWidth: number) {
        this.scaleFactor = newWidth / 2;
    }

    public get xPosition() {
        return (Math.cos(this.time() / 2000) + 1) * this.scaleFactor;
    }

    private time() {
        return (new Date()).getTime() - this.startTimeStamp;
    }

    public get body() {
        return Bodies.circle(this.xPosition, this.yPosition, 5);
    }
}