import { CHANGE_DESCRIPTION , CHANGE_CATEGORY, CHANGE_VALUE , ADD_SPEND, ADD_SPEND_SUCCESS, CHANGE_DATE } from "../actions/types";


const INITIAL_STATE = {
    description: 'testeasd',
    value: '',
    category: '',
    date: '',
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case CHANGE_DESCRIPTION:
        return {...state, description: action.payload}    

        case CHANGE_VALUE:
        return {...state, value: action.payload}    

        case CHANGE_CATEGORY:
        return {...state, category: action.payload}    

        case CHANGE_DATE:
        return {...state, date: action.payload}    
        
        case ADD_SPEND:
        return state

        case ADD_SPEND_SUCCESS:
        return {...state, category: '', value:'' , description: '' }

        default: 
        return state    

    }
    
    
}