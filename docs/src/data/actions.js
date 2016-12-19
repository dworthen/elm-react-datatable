// ACTIONS
export const SORT_REPORT1 = 'SORT_REPORT1';
export function sortReport1(newSortingState) {
    return {
        type: SORT_REPORT1,
        data: { 
                sortBy : newSortingState[0],
                sortOrder : newSortingState[1]
            }
    };
}

export const FILTER_REPORT1 = 'FILTER_REPORT1';
export function filterReport1(newFiltersState) {
    return {
        type: FILTER_REPORT1,
        data: { filters: newFiltersState }
    };
}

export const HIDE_COLUMNS_REPORT1 = 'HIDE_COLUMNS_REPORT1';
export function hideColumnsReport1(newHiddenColumnsState) {
    return {
        type: HIDE_COLUMNS_REPORT1,
        data: { hiddenColumns: newHiddenColumnsState }
    };
}