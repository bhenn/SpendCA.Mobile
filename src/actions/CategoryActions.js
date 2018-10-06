import {
    CATEGORY_LIST,
    CATEGORY_CHANGE_DESCRIPTION,
    CATEGORY_ADD_ERROR, 
    CATEGORY_ADD_SUCCESS,
    
} from "../actions/types";
import b64 from "base-64";
import firebase from "firebase";

export const changeDescription = text => {
    return {
        type: CATEGORY_CHANGE_DESCRIPTION,
        payload: text
    };
};

export const addCategory = (description) => {

    let email = b64.encode(firebase.auth().currentUser.email);

    return dispatch => {
        firebase
            .database()
            .ref(`category/${email}`)
            .push({ description })
            .then(() => dispatch({type: CATEGORY_ADD_SUCCESS}))
            .catch(error => dispatch({type: CATEGORY_ADD_ERROR, payload: error.message}));
    };
};

export const categoryFetch = () => {
    let email = b64.encode(firebase.auth().currentUser.email);

    return dispatch => {
        firebase
            .database()
            .ref(`category/${email}`)
            .on("value", snapshot => {
                dispatch({ type: CATEGORY_LIST, payload: snapshot.val() });
            });
    };
};
