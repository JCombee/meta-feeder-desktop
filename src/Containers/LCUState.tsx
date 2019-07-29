import React from 'react';
import {ipcRenderer} from 'electron';

interface LCUStateProps {
    state: string;
}

interface LCUStateState {
    show: boolean;
}

class LCUState extends React.Component<LCUStateProps, LCUStateState> {
    state = {
        show: false
    };

    componentWillMount() {
        ipcRenderer.on('lcu-state', (event: any, state: any) => {
            console.log('lcu-state', state);
            this.setState({
                show: this.props.state === state
            });
        });
        ipcRenderer.send('subscribe-lcu-state');
    }

    render(): JSX.Element {
        return <>
            {this.state.show && this.props.children}
        </>;
    }
}

export default LCUState;