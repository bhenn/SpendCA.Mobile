import {
    CHANGE_DESCRIPTION,
    CHANGE_LOCATION,
    CHANGE_CATEGORY,
    CHANGE_VALUE,
    PRE_ADD_SPEND,
    ADD_SPEND_SUCCESS,
    ADD_SPEND_ERROR,
    ALTER_SPEND_ERROR,
    ALTER_SPEND_SUCCESS,
    CHANGE_DATE,
    CHANGE_SPEND
} from '../actions/types';

const INITIAL_STATE = {
    uid: '',
    description: '',
    location: '',
    value: '',
    category: '',
    date: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHANGE_DESCRIPTION:
            return { ...state, description: action.payload };
 
        case CHANGE_LOCATION:
            return { ...state, location: action.payload };

        case CHANGE_VALUE:
            return { ...state, value: action.payload };

        case CHANGE_CATEGORY:
            return { ...state, category: action.payload };

        case CHANGE_DATE:
            return { ...state, date: action.payload };

        case CHANGE_SPEND:
            return {
                ...state,
                ...action.payload,
                value: action.payload.value.toString()
            };

        case PRE_ADD_SPEND:
            return { ...state, category: '', value: '0', description: '', location: '', uid: '', date: new Date() };

        case ADD_SPEND_SUCCESS:
            return { ...state, category: '', value: '', description: '', location: '' };

        case ADD_SPEND_ERROR:
            return state;

        case ALTER_SPEND_SUCCESS:
            return { ...state, category: '', value: '', description: '', location: '', uid: '' };

        case ALTER_SPEND_ERROR:
            return state;

        default:
            return state;
    }
};
