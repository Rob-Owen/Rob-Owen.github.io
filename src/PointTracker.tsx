import { Bodies } from 'matter-js';
import { RENDER_WIDTH } from './Renderers/coordinates';

const EDGE_BUFFER = 50;
const PERIOD_MILLIS = 1500;
const RADIUS = 8;

export default class PointerTracker {
    private startTimeStamp: number;
    
    public constructor(public yPosition: number) {
        this.startTimeStamp = (new Date()).getTime();
    }

    public get xPosition() {
        return Math.cos(this.time() / PERIOD_MILLIS) * 0.5 * (RENDER_WIDTH - EDGE_BUFFER) + RENDER_WIDTH * 0.5;
    }

    private time() {
        return (new Date()).getTime() - this.startTimeStamp;
    }

    public get body() {
        return Bodies.circle(this.xPosition, this.yPosition, RADIUS);
    }
}