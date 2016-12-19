import { sortReport1, filterReport1, hideColumnsReport1 } from './data/actions';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import Table from '../../src/react/Table';

// Applies every filter to every row.
function filterData(filters, row) {
    return filters.every(filter => {
        return filter
            .get(1)
            .test(row.get(filter.get(0)));
    });
}

// [ColName, FilterText] -> [ColIndex, FilterRegex]
function toKeyedFilters(columns, filters) {
    return filters.map(filter => {
        let [filterKey, filterValue] = filter.toJS();
        return filter
            .set(0, columns.findKey(val => val === filterKey))
            .set(1, toRegex(filterValue));
    });
}

function toRegex(value) {
    value = value.replace(' ', '.*?');
    return new RegExp(value, 'i');
}

function toSortComparator(sortBy, columns) {
    let key = columns.findKey(val => val === sortBy);
    return (row) => {
        return row.get(key);
    };
}

function sorter(sortOrder) {
    return (a, b) => {
        if(!a || !b) return 0;
        if (sortOrder === "Desc") {
            return a.localeCompare(b) < 0 ? 1 : -1;
        } else {
            return a.localeCompare(b);
        }
    };
}

const mapStateToProps = (store) => {
    let state = store.report1;
    let data = state.get('data');
    let columns = state.get('columns');
    let pageSize = state.get('pageSize');
    let activePage = state.get('activePage');
    let filters = state.get('filters');
    let hiddenColumns = state.get('hiddenColumns');
    let sortBy = state.get('sortBy');
    let sortOrder = state.get('sortOrder');

    let keyedFilters = toKeyedFilters(columns, filters);
    let filterFn = filterData.bind(this, keyedFilters);
    let sortComparator = toSortComparator(sortBy, columns);


    return {
        data: data
            .toSeq()
            .map(row => row.map(val => val.toString()))
            .sortBy(sortComparator, sorter(sortOrder))
            .filter(filterFn)
            .skip(pageSize * (activePage - 1))
            .take(pageSize)
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
