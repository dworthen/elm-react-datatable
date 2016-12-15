import React from 'react';
import { render } from 'react-dom';

import Table from './src/react/Table';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageSize : 10
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
                <Table pageSize={this.state.pageSize} />
            </div>
        )
    }

}

render(
    <App />,
    document.getElementById('app')
);