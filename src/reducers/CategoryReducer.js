import { CATEGORY_CHANGE_DESCRIPTION } from "../actions/types";


const INITIAL_STATE = {
    description: '',
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case CATEGORY_CHANGE_DESCRIPTION:
        return {...state, description: action.payload}    

        default: 
        return state    

    }
    
    
}