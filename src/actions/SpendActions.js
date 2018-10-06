import {
    CHANGE_DESCRIPTION,
    CHANGE_CATEGORY,
    CHANGE_VALUE,
    ADD_SPEND_SUCCESS,
    LIST_SPENDS,
    CHANGE_DATE,
} from "../actions/types";
import b64 from "base-64";
import firebase from "firebase";

export const changeDescription = text => {
    return {
        type: CHANGE_DESCRIPTION,
        payload: text
    };
};

export const changeValue = text => {
    return {
        type: CHANGE_VALUE,
        payload: text
    };
};

export const changeCategory = text => {
    return {
        type: CHANGE_CATEGORY,
        payload: text
    };
};

export const changeDate = text => {
    return {
        type: CHANGE_DATE,
        payload: text
    };
};

export const addSpend = (description, value, category, date) => {

    let email = b64.encode(firebase.auth().currentUser.email);

    //TODO - Find a better way to convert to number
    value = Number(value)
    date = date.toString()

    return dispatch => {
        firebase
            .database()
            .ref(`spend/${email}`)
            .push({ description, value, category, date })
            .then(() => addSpendSuccess(dispatch))
            .catch(error => addSpendError(dispatch, error));
    };
};

const addSpendSuccess = dispatch => {
    dispatch({
        type: ADD_SPEND_SUCCESS
    });
};

const addSpendError = dispatch => {
    console.error(error);

    dispatch({
        type: ADD_SPEND_SUCCESS
    });
};

export const gastosFetch = () => {
    let email = b64.encode(firebase.auth().currentUser.email);

    return dispatch => {
        firebase
            .database()
            .ref(`spend/${email}`)
            .on("value", snapshot => {
                dispatch({ type: LIST_SPENDS, payload: snapshot.val() });
            });
    };
};
