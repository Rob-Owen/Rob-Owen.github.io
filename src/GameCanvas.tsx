import * as React from 'react';
import { Engine, World, Bodies } from 'matter-js';
import * as BodyManager from './Bodies';
import MyRenderer from './Renderers/myRenderer';

interface GameState {
    engine: Engine;
}

export default class GameCanvas extends React.Component<{}, GameState> {
    private gameCanvas: HTMLCanvasElement;

    public constructor(props: {}) {
        super(props);
        this.runPhysics = this.runPhysics.bind(this);
        this.state = {engine : Engine.create()};
    }

    public render() {
        return (
            <canvas className="Game-Canvas" ref={canvas => {this.gameCanvas = canvas!; }}/>
        );
    }

    public componentDidMount() {
        BodyManager.registerCallback(bodies => World.add(this.state.engine.world, bodies));
        BodyManager.setInitalBodies();
        this.runPhysics();
        this.renderPhysics();
        // this does not render correctly because the renderer wipes it!
        // moving non-collision objects (e.g. markers) should be part of the physics engine (different collision group)
        // static decoration of the canvas should be overlaid on it.
        this.drawOnCanvas(); 
    }

    private runPhysics() {
        Engine.run(this.state.engine);
    }

    private drawOnCanvas() {
        const ctx = this.gameCanvas.getContext('2d')!;
        ctx.fillStyle = 'black';
        ctx.fillRect(30, 20, 50, 50);
    }

    private renderPhysics() {
        (new MyRenderer({
            canvas: this.gameCanvas,
            engine: this.state.engine,
            intervalMillis: 10,
            width: 1000,
            height: 1000
        })).run();
    }
}