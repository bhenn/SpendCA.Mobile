import {
    CHANGE_DESCRIPTION,
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
} from "../actions/types";
import b64 from "base-64";
import firebase from "firebase";
import NavigationService from "../../NavigationService";

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

export const alterSpend = (spend) => {
    let email = b64.encode(firebase.auth().currentUser.email);
    let {value, description, date, category, uid} = spend

    //TODO - Find a better way to convert to number
    value = Number(value)
    date = date.toString()

    return dispatch => {
        firebase
            .database()
            .ref(`spend/${email}/${uid}`)
            .set({ description, value, category, date })
            .then(() => alterSpendSuccess(dispatch))
            .catch(error => alterSpendError(dispatch, error));
    };
}

export const deleteSpend = (uid) => {
    let email = b64.encode(firebase.auth().currentUser.email);

    if (uid == '' || uid == undefined){
        return {
            type: REMOVE_SPEND_ERROR,
            payload: 'UID not informed'
        }
    }

    return dispatch => {
        firebase
            .database()
            .ref(`spend/${email}/${uid}`)
            .remove()
            .then(() => removeSpendSuccess(dispatch))
            .catch(error => removeSpendError(dispatch, error));
    };
}

export const changeSpend = spend => {
    return {
        type: CHANGE_SPEND,
        payload: spend
    }
}

const addSpendSuccess = dispatch => {
    dispatch({
        type: ADD_SPEND_SUCCESS
    });
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

const removeSpendSuccess = dispatch => {
    dispatch({
        type: REMOVE_SPEND_SUCCESS
    });
    NavigationService.navigate('Home')
};

const removeSpendError = dispatch => {
    dispatch({
        type: REMOVE_SPEND_ERROR
    });
};


export const spendsFetch = () => {
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
