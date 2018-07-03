import * as React from 'react';

interface AddButtonProps {
    clickedCallback: () => void;
}

export default class AddButton extends React.Component<AddButtonProps, {}> {
    private clickedCallback: () => void;

    public constructor(props: AddButtonProps) {
        super(props);
        this.clickedCallback = props.clickedCallback;
    }

    render() {
        return (
            <button className="AddButton" onClick={this.clickedCallback}>
                Add test cube
            </button>
        );
    }
}