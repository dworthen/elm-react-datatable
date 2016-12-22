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

    fixTableHeader(table) {
        if (!table || !this.props.fixHeader || this.fixed) return;
        console.log('MOUNTING');
        let thead = table.querySelector('thead');
        let theadOffset = thead.getBoundingClientRect().top;
        let tableHeight = +getComputedStyle(table)
            .getPropertyValue('height')
            .split('px')[0];
        let tableOffset = table.getBoundingClientRect().top;
        let tableCells = document.querySelectorAll('th, td');

        for (var i = 0, l = tableCells.length; i < l; i++) {
            var cell = tableCells[i];
            cell.width = getComputedStyle(cell).getPropertyValue('width');
        }

        function fixTableHeader(e) {

            let originalStyle = thead.style;
            // If viewer has scrolled past the first row 
            // then fix/stick it to the top of the page
            if (window.pageYOffset > theadOffset) {
                thead.style.position = 'fixed';
                thead.style.top = 0;
            }

            // If viewer has scrolled back above or past the table
            // then unfreeze the first row.
            if (window.pageYOffset < theadOffset ||
                window.pageYOffset > (tableOffset + tableHeight)) {
                thead.style = originalStyle;
            }

        }

        window.addEventListener('scroll', fixTableHeader, false);

    }

    componentWillUnmount() {
        console.log("=== Table Component Unmounting ===");
    }

    componentWillReceiveProps(newProps) {
        console.log("=== Table Component Will Recieve Props ===");
        this.props = newProps;
        this.sendDataToElm();
        if(!this.fixed) {
            let table = document.querySelector('.elm-table-ya table');
            this.fixTableHeader(table);
            this.fixed = true;
        }
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
            if (this.props.onHide) {
                this.props.onHide(newHiddenColumns);
            } else {
                ports.hiddenColumns.send(newHiddenColumns);
            }
        });

        ports.updateSorting.subscribe(newSorting => {
            if (this.props.onSort) {
                this.props.onSort(newSorting);
            } else {
                ports.sort.send(newSorting);
            }
        });

        this.filters = {};

        ports.updateFilters.subscribe(newFilters => {
            newFilters.forEach(([key, val]) => {
                this.filters[key] = val;
            });
            setTimeout(() => {
                let update = newFilters.every(([key, val]) => {
                    return this.filters[key] == val ? true : false;
                });
                if(update) {
                    if (this.props.onFilter) {
                        this.props.onFilter(newFilters);
                    } else {
                        ports.filter.send(newFilters);
                    }
                }
            }, 700);
        });

    }

    render() {
        return (
            <div className="elm-table-ya">
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
    onFilter: PropTypes.func,
    fixHeader: PropTypes.bool
};



export default Table;