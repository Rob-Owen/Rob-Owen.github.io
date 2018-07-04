import * as React from 'react';
import './App.css';
import GameCanvas from './GameCanvas';
import AddButton from './AddButton';

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Physics</h1>
                </header>
                <GameCanvas />
            </div>
        );
    }
}

export default App;