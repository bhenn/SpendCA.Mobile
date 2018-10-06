import { LIST_SPENDS } from "../actions/types";
import _ from 'lodash'


const INITIAL_STATE = {
    spends: [],
    spends_by_category: []
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case LIST_SPENDS:

        const spends = _.map(action.payload, (val, uid) => {
            return {...val, uid}
        })

        const categories = _.chain(spends).groupBy('category').map((val,uid) => {
            return {
                category: uid, 
                sum: _.sumBy(val, 'value')
            }
        }).value()

        return {...state, spends, categories}

        default: 
        return state    
    }
    
}