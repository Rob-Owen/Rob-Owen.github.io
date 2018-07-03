import * as React from 'react';
import * as BodyManager from './Bodies';

export default class AddButton extends React.Component<{}, {}> {

    public constructor(props: {}) {
        super(props);
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    render() {
        return (
            <button onClick={this.buttonClicked}>
                Add test cube
            </button>
        );
    }

    buttonClicked(): void {
        BodyManager.addTestBody();
    }
}