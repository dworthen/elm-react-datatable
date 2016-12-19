import React, { PropTypes } from 'react';
import Select from 'react-select';


class Paginate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    } 

    render() {
        let numPages = (new Array(this.props.numberOfPages)).fill(1);
        let options = numPages.map((val, ind) => {
            return {
                value: ind + 1,
                label: `Page ${ind + 1}`,
                clearableValue: false
            };
        });

        return (
            <div className="paginate">
                <Select
                    clearable={false}
                    name={this.props.name}
                    value={this.props.activePage}
                    options={options}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }

}

Paginate.propTypes = {
    name: PropTypes.string.isRequired,
    activePage: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Paginate;