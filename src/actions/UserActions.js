import firebase from "firebase";
import b64 from "base-64";
import {
    CHANGE_EMAIL,
    CHANGE_NAME,
    CHANGE_PASSWORD,
    REGISTER_USER_ERROR,
    LOGIN_ERROR,
    DO_LOGIN,
    REGISTER_USER_LOADING,
    REGISTER_USER_SUCCESS,
    LOGIN_SUCCESS
} from "./types";
import NavigationService from "../../NavigationService";

export const changeEmail = text => {
    return {
        type: CHANGE_EMAIL,
        payload: text
    };
};

export const changePassword = text => {
    return {
        type: CHANGE_PASSWORD,
        payload: text
    };
};

export const changeName = text => {
    return {
        type: CHANGE_NAME,
        payload: text
    };
};

export const registerUser = (email, password, name) => {
    return dispatch => {
        dispatch({ type: REGISTER_USER_LOADING });

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                let email64 = b64.encode(email);
                firebase
                    .database()
                    .ref(`user/${email64}`)
                    .push({ name })
                    .then(user => {
                        dispatch({ type: REGISTER_USER_SUCCESS });
                        NavigationService.navigate("Login");
                    });
            })
            .catch(error =>
                dispatch({ type: REGISTER_USER_ERROR, payload: error.message })
            );
    };
};

export const doLogin = (email, password) => {
    return dispatch => {
        dispatch({ type: DO_LOGIN });

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                dispatch({ type: LOGIN_SUCCESS });
                NavigationService.navigate("App");
            })
            .catch(error =>
                dispatch({ type: LOGIN_ERROR, payload: error.message })
            );
    };
};

