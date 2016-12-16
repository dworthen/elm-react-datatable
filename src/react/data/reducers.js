import { combineReducers } from 'redux';
import { SORT_REPORT1, FILTER_REPORT1, HIDE_COLUMNS_REPORT1 } from './actions';
import Immutable from 'immutable';



const initialTableStateJS = {
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

let initialTableState = Immutable.fromJS(initialTableStateJS);

function report1Reducer(state = initialTableState, action) {
    switch (action.type) {
        case SORT_REPORT1:
            return state.mergeDeep({...action.data});

        case FILTER_REPORT1:
            return (
                state
                    .set('activePage', 1)
                    .mergeDeep({...action.data})
                );

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