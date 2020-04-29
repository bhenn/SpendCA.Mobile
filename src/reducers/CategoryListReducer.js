import { CATEGORY_LIST } from "../actions/types";
import _ from 'lodash'

const INITIAL_STATE = {
    categories: [],
    categories_array: [],
    categories_label_array: [],
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case CATEGORY_LIST:
        
        const categories = _.map(action.payload, (val, uid) => {
            return {...val, uid}
        })

        return {...state, categories}

        default: 
        return state    
    }
    
}