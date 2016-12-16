import { sortReport1, filterReport1, hideColumnsReport1 } from './data/actions';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Table from './Table';

// Applies every filters to every row.
function filterData(filters, row) {
    return filters.every(filter => {
        return filter.get(1).test(row.get(filter.get(0)));
    });
}

// [ColName, FilterText] -> [ColIndex, FilterRegex]
function toKeyedFilters(columns, filters) {
    return filters.map(filter => {
        let [filterKey, filterValue] = filter.toJS();
        return filter.set(0, columns.findKey(val => val === filterKey)).set(1, toRegex(filterValue));
    });
}

function toRegex(value) {
    value = value.replace(' ', '.*?');
    return new RegExp(value, 'i');
}


const mapStateToProps = (store) => {
    let state = store.report1;
    let data = state.get('data');
    let columns = state.get('columns');
    let filters = state.get('filters');
    let pageSize = state.get('pageSize');
    let activePage = state.get('activePage');
    let hiddenColumns = state.get('hiddenColumns');
    let sortBy = state.get('sortBy');
    let sortOrder = state.get('sortOrder');


    let keyedFilters = toKeyedFilters(columns, filters);
    let filterFn = filterData.bind(this, keyedFilters);

    return {
        data: data
            .toSeq()
            .map(row => row.map(val => val.toString()))
            .filter(filterFn)
            .skip(pageSize * (activePage - 1))
            .take(state.get('pageSize'))
            .toJS(),
        columns: columns.toJS(),
        filters: [],
        hiddenColumns: hiddenColumns.toJS(),
        sortBy,
        sortOrder
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        onSort: (newSortingState) => {
            dispatch(sortReport1(newSortingState));
        },
        onFilter: (newFiltersState) => {
            dispatch(filterReport1(newFiltersState));
        },
        onHide: (newHiddenColumnsState) => {
            dispatch(hideColumnsReport1(newHiddenColumnsState));
        }
    };
};

const TableContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Table);

export default TableContainer;
