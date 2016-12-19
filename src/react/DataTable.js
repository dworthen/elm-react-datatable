import React, { PropTypes } from 'react';
import Table from './Table';
import PageSize from './PageSize';
import Paginate from './Paginate';
import ShowAllColumns from './ShowAllColumns';



class DataTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let {props} = this;
        
        let pageSize = null;
        if(props.pageSize) {
            pageSize = <PageSize 
                name="pagesize"
                pageSize={props.pageSize}
                pageSizeOptions={props.pageSizeOptions}
                onChange={props.pageSizeChange}
            />;
        }

        let paginate = null;
        if(props.numberOfPages) {
            paginate = <Paginate 
                name="paginate"
                activePage={props.activePage}
                numberOfPages={props.numberOfPages}
                onChange={props.paginateChange}
            />;
        }

        let showAllColumns = null;
        if(props.showAllColumnsClick){
            showAllColumns = <ShowAllColumns onClick={props.showAllColumnsClick}>Show All Columns</ShowAllColumns>;
        }

        return (
            <div className="datatablewidget">
                <div className="datatablesettings">
                    {pageSize}
                    {paginate}
                    {showAllColumns}
                </div>
                <Table 
                    data={props.data}
                    columns={props.columns}
                    canHide={props.canHide}
                    canSort={props.canSort}
                    canFilter={props.canFilter}
                    filters={props.filters}
                    hiddenColumns={props.hiddenColumns}
                    sortBy={props.sortBy}
                    sortOrder={props.sortOrder}
                    onHide={props.onHide}
                    onSort={props.onSort}
                    onFilter={props.onFilter}
                    fixHeader={props.fixHeader}
                />
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
    fixHeader: PropTypes.bool,
    pageSize: PropTypes.number,
    pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
    pageSizeChange: PropTypes.func,
    activePage: PropTypes.number,
    numberOfPages: PropTypes.number,
    paginateChange: PropTypes.func,
    showAllColumnsClick: PropTypes.func
};

export default DataTable;