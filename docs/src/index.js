import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './data/reducers';
import 'react-select/dist/react-select.css';

import Table from '../../src/react/Table';
import TableContainer from './TableContainer';
import PaginateContainer from './PaginateContainer';
import ShowAllColumnsContainer from './ShowAllColumnsContainer';
import PageSizeContainer from './PageSizeContainer';
import DataTableContainer from './DataTableContainer';

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
                {/*<PaginateContainer />
                <PageSizeContainer />
                <ShowAllColumnsContainer>Show All Columns</ShowAllColumnsContainer>
                <TableContainer
                    canHide={[true, ""]}
                    canSort={[true, ""]}
                    canFilter={[true, ""]}
                    sortBy="Year"
                    sortOrder="Asc"
                />*/}
                <DataTableContainer 
                    canHide={[true, ""]}
                    canSort={[true, ""]}
                    canFilter={[true, ""]}
                    sortBy="Year"
                    sortOrder="Asc"
                    fixHeader={true}
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