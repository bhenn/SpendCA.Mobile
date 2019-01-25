import {
    CATEGORY_LIST,
    CATEGORY_CHANGE_DESCRIPTION,
    CATEGORY_ADD_ERROR,
    CATEGORY_ADD_SUCCESS,

} from "../actions/types";
import NavigationService from "../../NavigationService";
import api from '../api'

export const changeDescription = text => {
    return {
        type: CATEGORY_CHANGE_DESCRIPTION,
        payload: text
    };
};

export const addCategory = (description) => {

    return dispatch => {
        api.post("categories", {description: description})
            .then(cat => {
                dispatch(categoryFetch())
                dispatch({type: CATEGORY_ADD_SUCCESS})
                NavigationService.navigate("Categories")
            })
            .catch(error => console.warn(error.message))
    }

};

export const categoryFetch = () => {

    return dispatch => {
        api.get("categories")
            .then(res => dispatch({ type: CATEGORY_LIST, payload: res.data }))
            .catch(error => console.warn(error.message))
    }

};
