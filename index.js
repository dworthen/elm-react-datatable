import React from 'react';
import { render } from 'react-dom';

import Table from './src/react/Table';


let data = [
    ["George Washington", "1732"]
    , ["John Adams", "1735"]
    , ["Thomas Jefferson", "1743"]
    , ["Ander Jackson", "1767"]
    , ["William Henry Harrison", "1773"]
];

let columns = ["Names", "Year"];

let canHide = [true, ""];
let canSort = [true, ""];
let canFilter = [true, ""];

let filters = [];
let hiddenColumns = [];

let sortBy = "Names";
let sortOrder = "Asc";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data,
            columns,
            canHide,
            canSort,
            canFilter,
            filters,
            hiddenColumns,
            sortBy,
            sortOrder
        };
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         pageSize : 20
        //     });
        // }, 3000);
    }

    render() {
        return (
            <div>
                <Table 
                    data={this.state.data}
                    columns={this.state.columns}
                    canHide={this.state.canHide}
                    canSort={this.state.canSort}
                    canFilter={this.state.canFilter}
                    filters={this.state.filters}
                    hiddenColumns={this.state.hiddenColumns}
                    sortBy={this.state.sortBy}
                    sortOrder={this.state.sortOrder}
                 />
            </div>
        );
    }

}

render(
    <App />,
    document.getElementById('app')
);