import _ from 'lodash';
import {
    CREATE_QUOTATION,
    EDIT_QUOTATION,
    FETCH_QUOTATIONS,
    FETCH_QUOTATION,
    DELETE_QUOTATION,
    FETCH_QUOTATION_FOR_INVOICE,
    CREATE_QUOTATION_ERROR

} from '../../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_QUOTATIONS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_QUOTATION:
            return { ...state, [action.payload.id]: action.payload };
        case FETCH_QUOTATION_FOR_INVOICE:
            return { ...state, [action.payload.quotationNumber]: action.payload };
        case CREATE_QUOTATION:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_QUOTATION_ERROR:
            return { ...state, [action.payload.id]: action.payload, success: false  };
        case EDIT_QUOTATION:
            return { ...state, [action.payload._id]: action.payload };
        case DELETE_QUOTATION:
            return _.omit(state.action);
        default:
            return state;
    }
}