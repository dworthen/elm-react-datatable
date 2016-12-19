import { connect } from 'react-redux';
import Paginate from '../../src/react/Paginate';
import { 
    changeActivePageReport1 
} from './data/actions';


const mapStateToProps = (store) => {
    let state = store.report1;
    let activePage = state.get('activePage');

    return {
        name: 'Testing',
        activePage,
        numberOfPages: 3
        // onChange: (val) => { console.log(val); } 
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
       onChange: (newPage) => {
           dispatch(changeActivePageReport1(newPage.value));
       }
    };
};

const PaginateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Paginate);

export default PaginateContainer;
