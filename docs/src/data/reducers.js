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
    filters: [],
    hiddenColumns: [],
    sortBy: "",
    sortOrder: "Asc"
};

let initialReport1State = Immutable.fromJS(initialReport1StateJS);

function report1Reducer(state = initialReport1State, action) {
    switch (action.type) {
        case SORT_REPORT1:
            return state
                .set('activePage', 1)
                .mergeDeep({...action.data});

        case FILTER_REPORT1:
            return state
                .set('activePage', 1)
                .mergeDeep({...action.data});

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