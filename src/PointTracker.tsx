import { Bodies } from 'matter-js';

export default class PointerTracker {
    private startTimeStamp: number;
    private scaleFactor: number;
    
    public constructor(width: number, public yPosition: number) {
        this.scaleFactor = width / 2;
        this.startTimeStamp = (new Date()).getTime();
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