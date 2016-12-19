import { combineReducers } from 'redux';
import Immutable from 'immutable';
import { 
    SORT_REPORT1, 
    FILTER_REPORT1, 
    HIDE_COLUMNS_REPORT1, 
    QUERY_DATA_REPORT1 
} from './actions';



const initialReport1StateJS = {
    pageSize: 2,
    activePage: 2,
    columns: ["Names", "Years"],
    data: [
        ["George Washington", 1732]
        , ["John Adams", 1735]
        , ["Thomas Jefferson", 1743]
        , ["Ander Jackson", 1767]
        , ["William Henry Harrison", 1773]
    ],
    queriedData: [
        ["George Washington", "1732"]
        , ["John Adams", "1735"]
        , ["Thomas Jefferson", "1743"]
        , ["Ander Jackson", "1767"]
        , ["William Henry Harrison", "1773"]
    ],
    filters: [],
    hiddenColumns: [],
    sortBy: "",
    sortOrder: "Asc"
};

let initialReport1State = Immutable.fromJS(initialReport1StateJS);

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

function queryData(state, action) {
    switch (action.type) {
        case QUERY_DATA_REPORT1: 
        case SORT_REPORT1:
        case FILTER_REPORT1:
            return query();

        default: 
            return state;
    }

    function query() {
        let data = state.get('data');
        let columns = state.get('columns');
        let filters = state.get('filters');
        let sortBy = state.get('sortBy');
        let sortOrder = state.get('sortOrder');


        let keyedFilters = toKeyedFilters(columns, filters);
        let filterFn = filterData.bind(this, keyedFilters);
        let sortComparator = toSortComparator(sortBy, columns);

        let queriedData = data
            .toSeq()
            .map(row => row.map(val => val.toString()))
            .sortBy(sortComparator, sorter(sortOrder))
            // .reverse()
            .filter(filterFn);

        return state.set('queriedData', queriedData);
    }
}


function report1Reducer(state = initialReport1State, action) {
    switch (action.type) {
        case SORT_REPORT1:
            return queryData(state
                .set('activePage', 1)
                .mergeDeep({...action.data}), action);

        case FILTER_REPORT1:
            return queryData(state
                .set('activePage', 1)
                .mergeDeep({...action.data}), action);

        case HIDE_COLUMNS_REPORT1:
            return state.mergeDeep({...action.data});
            
        default:
            return state;
    }
}


const reducers = combineReducers({
    report1: report1Reducer
});

export default reducers;