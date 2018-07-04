import { Bodies } from 'matter-js';
import { RENDER_WIDTH } from './Renderers/coordinates';

export default class PointerTracker {
    private startTimeStamp: number;
    
    public constructor(public yPosition: number) {
        this.startTimeStamp = (new Date()).getTime();
    }

    public get xPosition() {
        return (Math.cos(this.time() / 2000) + 1) * 0.5 * RENDER_WIDTH;
    }

    private time() {
        return (new Date()).getTime() - this.startTimeStamp;
    }

    public get body() {
        return Bodies.circle(this.xPosition, this.yPosition, 5);
    }
}