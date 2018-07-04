import * as React from 'react';
import { Engine, World } from 'matter-js';
import * as BodyManager from './Bodies';
import MyRenderer from './Renderers/myRenderer';
import AddButton from './AddButton';
import PointerTracker from './PointTracker';

interface CanvasState {
    engine: Engine;
    width: number;
    height: number;
}

export default class GameCanvas extends React.Component<{}, CanvasState> {
    private gameCanvas: HTMLCanvasElement;
    private renderer: MyRenderer;
    private pointer: PointerTracker;

    public constructor(props: {}) {
        super(props);
        this.state = {
            engine : Engine.create(),
            width : 0,
            height: 0
        };
        this.addNewSquare = this.addNewSquare.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    public render() {
        return (
            <div> 
                <canvas className="Game-Canvas" ref={canvas => { this.gameCanvas = canvas!; }}/>
                <AddButton clickedCallback={this.addNewSquare}/>
            </div>
        );
    }

    public componentWillMount() {
        this.updateDimensions();
    }

    public componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        BodyManager.registerCallback(bodies => World.add(this.state.engine.world, bodies));
        BodyManager.setInitalBodies();
        Engine.run(this.state.engine);
        this.pointer = new PointerTracker(this.state.width, 10);
        this.renderPhysics();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    // called after dimension update
    public componentWillUpdate() {
        this.renderer.stop();
        this.renderPhysics();
    }

    private renderPhysics() {
        this.renderer = new MyRenderer({
            canvas: this.gameCanvas,
            engine: this.state.engine,
            intervalMillis: 10,
            width: this.state.width,
            height: this.state.height
        });
        this.renderer.addTracker(this.pointer);
        this.renderer.run();
    }

    private addNewSquare() {
        const [x, y] = this.renderer.getPointerPosition();
        BodyManager.addTestBody(x, y);
    }

    private updateDimensions() {
        this.setState({
            width: window.innerWidth * 0.8,
            height: window.innerHeight * 0.8
        });
    }
}