import React, { PropTypes } from 'react';
import Select from 'react-select';


class PageSize extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    } 

    render() {
        let pageSizeOptions = this.props.pageSizeOptions;
        let options = pageSizeOptions.map((val, ind) => {
            return {
                value: val,
                label: `${val}`,
                clearableValue: false
            };
        });

        return (
            <div className="itemsperpage">
                <span>Items per page:</span>
                <Select
                    clearable={false}
                    name={this.props.name}
                    value={this.props.pageSize}
                    options={options}
                    onChange={this.props.onChange}
                />
            </div>
        );
    }

}

PageSize.propTypes = {
    name: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
};

export default PageSize;