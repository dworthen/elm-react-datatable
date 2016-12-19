import React, { PropTypes } from 'react';
import Elm from 'react-elm-components';
import { Main } from '../elm/Main.elm';


class Table extends React.Component {

    constructor(props) {
        super(props);
        console.log("=== Table Component Constructor ===");
        this.state = {};
    }

    componentDidMount() {
        console.log("=== Table Component Mounted ===");
    }

    componentWillUnmount() {
        console.log("=== Table Component Unmounting ===");
    }

    componentWillReceiveProps(newProps) {
        console.log("=== Table Component Will Recieve Props ===");
        this.props = newProps;
        this.sendDataToElm();
    }

    shouldComponentUpdate() {
        console.log("=== Table Should Update - but wont ===");
        return false;
    }

    sendDataToElm() {
        let {ports, props} = this;
        ports.canHide.send(props.canHide);
        ports.canSort.send(props.canSort);
        ports.canFilter.send(props.canFilter);
        ports.columns.send(props.columns);
        ports.sort.send([props.sortBy, props.sortOrder]);
        ports.filter.send(props.filters);
        ports.hiddenColumns.send(props.hiddenColumns);
        ports.data.send(props.data);
    }

    configurePorts(ports) {
        console.log("=== Table Component Configuring Ports ===");

        this.ports = ports;

        this.sendDataToElm();

        ports.updateHiddenColumns.subscribe(newHiddenColumns => {
            if(this.props.onHide) {
                this.props.onHide(newHiddenColumns);
            } else {
                ports.hiddenColumns.send(newHiddenColumns);
            }
        });

        ports.updateSorting.subscribe(newSorting => {
            if(this.props.onSort) {
                this.props.onSort(newSorting);
            } else {
                ports.sort.send(newSorting);
            }
        });

        ports.updateFilters.subscribe(newFilters => {
            if(this.props.onFilter) {
                this.props.onFilter(newFilters);
            } else {
                ports.filter.send(newFilters);
            }
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
    canHide: PropTypes.array.isRequired,
    canSort: PropTypes.array.isRequired,
    canFilter: PropTypes.array.isRequired,
    filters: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    hiddenColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onHide: PropTypes.func,
    onSort: PropTypes.func,
    onFilter: PropTypes.func
};



export default Table;