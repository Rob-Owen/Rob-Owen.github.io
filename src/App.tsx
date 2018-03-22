import * as React from 'react';
import './App.css';
import * as Matter from 'matter-js';
import MyRenderer from './Renderers/myRenderer';

// interface AppState {
//     gameCanvas: HTMLCanvasElement | null;
// }

class App extends React.Component<{}, {}> {
    private gameCanvas: HTMLCanvasElement;

    public constructor(props: {}) {
        super(props);
        this.runPhysics = this.runPhysics.bind(this);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>This is Rob's website!</h1>
                </header>
                <canvas className="Game-Canvas" ref={canvas => {this.gameCanvas = canvas!; }}/>
            </div>
        );
    }

    public componentDidMount(): void {
        this.runPhysics();
    }

    private runPhysics(): void {
        // module aliases
        var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        Bodies = Matter.Bodies;

        // create an engine
        var engine = Engine.create();

        const r = new MyRenderer({
            canvas: this.gameCanvas,
            engine: engine,
            intervalMillis: 10,
            width: 1000,
            height: 1000
        });

        // create two boxes and a ground
        var boxA = Bodies.rectangle(300, 10, 20, 20);
        var boxB = Bodies.rectangle(148, 50, 20, 20);
        var boxC = Bodies.rectangle(155, 30, 20, 20);
        var ground = Bodies.rectangle(300, 300, 300, 10, { isStatic: true });

        // add all of the bodies to the world
        World.add(engine.world, [boxA, boxB, boxC, ground]);

        // run the engine
        Engine.run(engine);

        // run the renderer
        r.run();
    }
}

export default App;