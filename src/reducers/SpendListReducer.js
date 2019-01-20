import { LIST_SPENDS, FILTER_SPENDS, SPEND_FETCH_START, SPEND_FETCH_FINISHED } from "../actions/types";
import _ from 'lodash'

const INITIAL_STATE = {
    spends: [],
    spends_filtered: [],
    spends_by_category: [],
    filter_category: '',
    total: 0,
    isLoading: false,

}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case LIST_SPENDS:

            var spends
            var spends_filtered

            // TODO Review date and other fields

            // spends = _.map(action.payload, (val, uid) => {
            //     return { ...val }
            // })

            spends = action.payload;

            if (state.filter_category != '') {
                spends_filtered = spends.filter(spend => spend.category.description === state.filter_category)
            } else {
                spends_filtered = spends
            }
            total = _.sumBy(spends_filtered, 'value')

            const categories = _.chain(spends).groupBy('category.description').map((val, id) => {
                return {
                    category: id,
                    sum: _.sumBy(val, 'value')
                }
            }).value()

            return { ...state, spends_filtered, spends, categories, total }

        case FILTER_SPENDS:
            var filter = (state.filter_category == action.payload ? '' : action.payload)
            var spends_filtered

            if (filter != '') {
                spends_filtered = state.spends.filter(spend => spend.category.description === action.payload)
            } else {
                spends_filtered = state.spends
            }

            total = _.sumBy(spends_filtered, 'value')

            return { ...state, spends_filtered, filter_category: filter, total }

        case SPEND_FETCH_START:
            return { ...state, isLoading: true,  }

        case SPEND_FETCH_FINISHED:
            return { ...state, isLoading: false }

        
        default:
            return state
    }


}