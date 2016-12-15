import React, { PropTypes } from 'react';
import Elm from 'react-elm-components';
import { Main } from '../elm/Main.elm';


class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log("=== Table Component Mounted ===");
    }

    componentWillReceiveProps() {
        console.log("=== Table Component Will Recieve Props ===");
    }

    shouldComponentUpdate() {
        console.log("=== Table Will Update ===");
        return false;
    }

    configurePorts(ports) {
        this.setState({
            ports: ports 
        });

        ports.updateTableState.subscribe(state => {
            ports.recievedNewTableState.send(state);
        });

    }

    render() {
        return (
            <div>
                <Elm src={Main} ports={this.configurePorts.bind(this)} />
            </div>
        );
    } 
}



export default Table