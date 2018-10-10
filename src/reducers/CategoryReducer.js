import { CATEGORY_CHANGE_DESCRIPTION, CATEGORY_ADD_SUCCESS } from "../actions/types";


const INITIAL_STATE = {
    description: '',
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case CATEGORY_CHANGE_DESCRIPTION:
        return {...state, description: action.payload}    

        case CATEGORY_ADD_SUCCESS:
        return {...state, description: ''}    

        default: 
        return state    

    }
    
    
}