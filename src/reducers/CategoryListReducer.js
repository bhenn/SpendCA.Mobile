import { CATEGORY_LIST } from "../actions/types";
import _ from 'lodash'

const INITIAL_STATE = {
    categories: [],
    categories_array: []
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case CATEGORY_LIST:
        
        const categories_array = _.map(action.payload, 'description')
        const categories = _.map(action.payload, (val, uid) => {
            return {...val, uid}
        })
        return {...state, categories, categories_array}

        default: 
        return state    
    }
    
}