import React, { PropTypes } from 'react';


class ShowAllColumns extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    } 

    render() {
        return (
            <div className="show-columns">
                <button onClick={this.props.onClick}>{this.props.children}</button>
            </div>
        );
    }

}

ShowAllColumns.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default ShowAllColumns;