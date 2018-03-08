import * as React from 'react';
import './App.css';
import * as Matter from 'matter-js';

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

        // create a renderer
        var render = Render.create({
            canvas: this.gameCanvas,
            engine: engine,
        });

        // render.options.width = Math.min(canvasWidth, canvasHeight);
        // render.options.height = Math.min(canvasWidth, canvasHeight);

        // create two boxes and a ground
        var boxA = Bodies.rectangle(400, 200, 80, 80);
        var boxB = Bodies.rectangle(450, 50, 80, 80);
        var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

        // add all of the bodies to the world
        World.add(engine.world, [boxA, boxB, ground]);

        // run the engine
        Engine.run(engine);

        // run the renderer
        Render.run(render);
    }
}

export default App;
