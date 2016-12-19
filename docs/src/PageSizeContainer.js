import { connect } from 'react-redux';
import PageSize from '../../src/react/PageSize';
import { 
    changePageSizeReport1 
} from './data/actions';


const mapStateToProps = (store) => {
    let state = store.report1;
    let pageSize = state.get('pageSize');

    return {
        name: 'Testing',
        pageSize,
        pageSizeOptions: [2, 10, 25, 50]
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
       onChange: (newPageSize) => {
           dispatch(changePageSizeReport1(newPageSize.value));
       }
    };
};

const PageSizeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PageSize);

export default PageSizeContainer;
