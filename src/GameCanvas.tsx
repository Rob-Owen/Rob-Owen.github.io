import * as React from 'react';
import { Engine, World, Bodies } from 'matter-js';
import * as BodyManager from './Bodies';
import MyRenderer from './Renderers/myRenderer';
import AddButton from './AddButton';
interface GameState {
    engine: Engine;
}

export default class GameCanvas extends React.Component<{}, GameState> {
    private gameCanvas: HTMLCanvasElement;
    private renderer: MyRenderer;

    public constructor(props: {}) {
        super(props);
        this.runPhysics = this.runPhysics.bind(this);
        this.state = {engine : Engine.create()};
        this.addNewSquare = this.addNewSquare.bind(this);
    }

    public render() {
        return (
            <div> 
                <canvas className="Game-Canvas" ref={canvas => { this.gameCanvas = canvas!; }}/>
                <AddButton clickedCallback={this.addNewSquare}/>
            </div>
        );
    }

    public componentDidMount() {
        BodyManager.registerCallback(bodies => World.add(this.state.engine.world, bodies));
        BodyManager.setInitalBodies();
        this.runPhysics();
        this.renderPhysics();
    }

    private runPhysics() {
        Engine.run(this.state.engine);
    }

    private renderPhysics() {
        this.renderer = new MyRenderer({
            canvas: this.gameCanvas,
            engine: this.state.engine,
            intervalMillis: 10,
            width: 500,
            height: 1000
        });
        this.renderer.run();
    }

    private addNewSquare() {
        const [x, y] = this.renderer.getPointerPosition();
        BodyManager.addTestBody(x, y);
    }
}