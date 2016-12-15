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

    constructTableState() {
        return {
            sortBy: this.props.sortBy,
            sortOrder: this.props.sortOrder,
            filters: this.props.filters,
            hiddenColumns: this.props.hiddenColumns
        };
    }

    

    configurePorts(ports) {
        console.log("=== Table Component Configuring Ports ===");
        this.setState({
            ports: ports 
        });

        ports.canHide.send(this.props.canHide);
        ports.canSort.send(this.props.canSort);
        ports.canFilter.send(this.props.canFilter);
        ports.columns.send(this.props.columns);
        ports.tableState.send(this.constructTableState());
        ports.data.send(this.props.data);

        ports.updateTableState.subscribe(state => {
            ports.tableState.send(state);
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

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string).isRequired).isRequired,
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    filters: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    canHide: PropTypes.array.isRequired,
    canSort: PropTypes.array.isRequired,
    canFilter: PropTypes.array.isRequired,
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired
}



export default Table