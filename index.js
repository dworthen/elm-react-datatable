import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/react/data/reducers';

import Table from './src/react/Table';
import TableContainer from './src/react/TableContainer';

let store = createStore(reducers);


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                {/*<Table 
                    data={this.state.data}
                    columns={this.state.columns}
                    canHide={this.state.canHide}
                    canSort={this.state.canSort}
                    canFilter={this.state.canFilter}
                    tableState={this.state.tableState}
                 />*/}
                <TableContainer
                    canHide={[true, ""]}
                    canSort={[true, ""]}
                    canFilter={[true, ""]}
                />
            </div>
        );
    }

}

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);