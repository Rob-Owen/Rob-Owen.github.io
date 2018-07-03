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

    public componentDidMount(): void {
        BodyManager.registerCallback(bodies => World.add(this.state.engine.world, bodies));
        BodyManager.setInitalBodies();
        this.runPhysics();
        this.renderPhysics();
    }

    private runPhysics(): void {
        Engine.run(this.state.engine);
    }

    private renderPhysics(): void {
        (new MyRenderer({
            canvas: this.gameCanvas,
            engine: this.state.engine,
            intervalMillis: 10,
            width: 1000,
            height: 1000
        })).run();
    }
}