import * as Matter from 'matter-js';
import PointerTracker from '../PointTracker';
import { getDisplayCoords, DisplayVector } from './coordinates';

interface RendererOptions {
    canvas: HTMLCanvasElement;
    engine: Matter.Engine;
    intervalMillis: number;
    width: number;
    height: number;
}

export default class Renderer {
    private config: RendererOptions;
    private running: boolean;
    private startTime: number;
    private context: CanvasRenderingContext2D;
    private trackers: PointerTracker[] = [];

    public constructor(options: RendererOptions) {
        this.config = options;
        this.running = false;
        this.configureCanvas(options.canvas, options.width, options.height);
        this.getPointerPosition = this.getPointerPosition.bind(this);
    }

    public run() {
        this.running = true;
        this.startTime = new Date().getTime();
        window.requestAnimationFrame(this.runStep.bind(this));
    }

    public stop() {
        this.running = false;
    }

    public getPointerPosition(): DisplayVector {
        return {
            x: this.trackers[0].xPosition,
            y: this.trackers[0].yPosition
        };
    }

    public addTracker(pointer: PointerTracker) {
        this.trackers.push(pointer);
    }

    private configureCanvas(canvas: HTMLCanvasElement, w: number, h: number) {
        const ratio = 2;
        canvas.width = w * ratio;
        canvas.height = h * ratio;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        this.context = canvas.getContext('2d')!;
        this.context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    private runStep(timestamp: number) {
        if (this.running) {
            setTimeout(
                () => {
                    window.requestAnimationFrame(this.runStep.bind(this));
                },
                this.config.intervalMillis);
            this.resetCanvas();
            this.renderBodies(Matter.Composite.allBodies(this.config.engine.world), this.context);
            
            // position pointer(s) - note this is not registered with the engine so doesn't interact with anything
            this.renderBodies(this.trackers.map(tr => tr.body), this.context);
        }
    }

    private resetCanvas() {
        // clear the canvas with a transparent fill, to allow the canvas background to show
        this.context.globalCompositeOperation = 'source-in';
        this.context.fillStyle = 'transparent';
        this.context.fillRect(0, 0, this.config.canvas.width, this.config.canvas.height);
        this.context.globalCompositeOperation = 'source-over';
    }

    private renderBodies(bodies: Matter.Body[], context: CanvasRenderingContext2D) {
        this.context.beginPath();
        // render all bodies
        for (let body of bodies) {
            if (!body.render.visible) {
                continue;
            }
            
            this.moveTo(getDisplayCoords(body.vertices[0], this.config.width));
            body.parts.forEach(part => {
                part.vertices.forEach(v => this.lineTo(getDisplayCoords(v, this.config.width)));
            });
            
            this.lineTo(getDisplayCoords(body.vertices[0], this.config.width));
        }
        this.context.lineWidth = 1;
        this.context.stroke();
    }

    private moveTo(point: DisplayVector) {
        this.context.moveTo(point.x, point.y);
    }

    private lineTo(point: DisplayVector) {
        this.context.lineTo(point.x, point.y);
    }
}