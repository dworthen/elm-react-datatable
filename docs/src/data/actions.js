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


export const CHANGE_ACTIVE_PAGE_REPORT1 = 'CHANGE_ACTIVE_PAGE_REPORT1';
export function changeActivePageReport1(newPAge) {
    return {
        type: CHANGE_ACTIVE_PAGE_REPORT1,
        data: { 
                activePage: newPAge
            }
    };
}

export const CHANGE_PAGE_SIZE_REPORT1 = 'CHANGE_PAGE_SIZE_REPORT1';
export function changePageSizeReport1(newPageSize) {
    return {
        type: CHANGE_PAGE_SIZE_REPORT1,
        data: { 
                pageSize: newPageSize
            }
    };
}


export const SHOW_ALL_COLUMNS_REPORT1 = 'SHOW_ALL_COLUMNS_REPORT1';
export function showAllColumnsReport1() {
    return {
        type: SHOW_ALL_COLUMNS_REPORT1
    };
}