import {
    CHANGE_DESCRIPTION,
    CHANGE_LOCATION,
    CHANGE_CATEGORY,
    CHANGE_VALUE,
    PRE_ADD_SPEND,
    ADD_SPEND_SUCCESS,
    ADD_SPEND_ERROR,
    ALTER_SPEND_SUCCESS,
    ALTER_SPEND_ERROR,
    LIST_SPENDS,
    CHANGE_DATE,
    CHANGE_SPEND,
    REMOVE_SPEND_ERROR,
    REMOVE_SPEND_SUCCESS,
    FILTER_SPENDS,
    SPEND_FETCH_START,
    SPEND_FETCH_FINISHED,
} from "../actions/types";
import NavigationService from "../../NavigationService";
import api from '../api';

export const changeDescription = text => {
    return {
        type: CHANGE_DESCRIPTION,
        payload: text
    };
};

export const changeLocation = text => {
    return {
        type: CHANGE_LOCATION,
        payload: text
    };
};

export const changeValue = text => {
    return {
        type: CHANGE_VALUE,
        payload: text
    };
};

export const changeCategory = (category_id, category_desc) => {
    return {
        type: CHANGE_CATEGORY,
        payload: { category_id, category_desc }
    };
};

export const changeDate = text => {
    return {
        type: CHANGE_DATE,
        payload: text
    };
};

export const preAddSpend = () => {
    return {
        type: PRE_ADD_SPEND
    }
}

export const filterSpends = text => {
    return {
        type: FILTER_SPENDS,
        payload: text
    };
};



export const addSpend = (spend) => {

    const { description, location, value, category_id, date } = spend

    return dispatch => {
        api.post("spends", { description, location, value, categoryId: category_id, date })
            .then(spend => {
                addSpendSuccess(dispatch)
            })
            .catch(error => {
                console.warn(error);
                addSpendError(dispatch, error.message)
            })
    }

};

export const alterSpend = (spend) => {

    const { id, description, location, value, category_id, date } = spend

    return dispatch => {
        api.put("spends/" + id, { id, description, location, value, categoryId: category_id, date })
            .then(() => {
                alterSpendSuccess(dispatch)
            })
            .catch(error => {
                console.warn(error.message);
                alterSpendError(dispatch, error.message)
            })
    }

}

export const deleteSpend = (id) => {

    return dispatch => {
        api.delete("spends/" + id)
            .then(() => removeSpendSuccess(dispatch, id))
            .catch((error) => {
                console.warn(error)
                removeSpendError(error.response.data, dispatch)
            })
    }

}

export const changeSpend = spend => {
    return {
        type: CHANGE_SPEND,
        payload: spend
    }
}

export const spendsFetch = () => {

    return dispatch => {

        dispatch({ type: SPEND_FETCH_START })

        api.get('spends')
            .then(res => {
                dispatch({ type: LIST_SPENDS, payload: res.data })
                dispatch({ type: SPEND_FETCH_FINISHED })
            })
            .catch(error => console.warn(error.message))

    };
};

const addSpendSuccess = dispatch => {
    dispatch(spendsFetch())
    dispatch({ type: ADD_SPEND_SUCCESS });
    NavigationService.navigate('Home')
};

const addSpendError = dispatch => {
    dispatch({
        type: ADD_SPEND_ERROR
    });
};

const alterSpendSuccess = dispatch => {
    dispatch({
        type: ALTER_SPEND_SUCCESS
    });
    NavigationService.navigate('Home')
};

const alterSpendError = dispatch => {
    dispatch({
        type: ALTER_SPEND_ERROR
    });
};

const removeSpendSuccess = (dispatch) => {
    dispatch(spendsFetch())
    dispatch({type: REMOVE_SPEND_SUCCESS})
    NavigationService.navigate('Home')
};

const removeSpendError = (error, dispatch) => {
    console.warn(error)
    dispatch({ type: REMOVE_SPEND_ERROR })
};
