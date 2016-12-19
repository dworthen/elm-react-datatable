import { connect } from 'react-redux';
import ShowAllColumns from '../../src/react/ShowAllColumns';
import { 
    showAllColumnsReport1 
} from './data/actions';


const mapStateToProps = (store) => {
    return {
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
       onClick: () => {
           dispatch(showAllColumnsReport1());
       }
    };
};

const ShowAllColumnsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowAllColumns);

export default ShowAllColumnsContainer;
