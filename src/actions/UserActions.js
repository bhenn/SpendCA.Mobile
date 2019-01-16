import {
    CHANGE_EMAIL,
    CHANGE_NAME,
    CHANGE_PASSWORD,
    CHANGE_TOKEN,
    REGISTER_USER_ERROR,
    LOGIN_ERROR,
    DO_LOGIN,
    REGISTER_USER_LOADING,
    REGISTER_USER_SUCCESS,
    LOGIN_SUCCESS,
    DO_LOGOUT
} from "./types";
import NavigationService from "../../NavigationService";
import Config from "react-native-config";
import { AsyncStorage } from 'react-native';

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

        fetch(global.apiUrl + 'api/account', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then(user => {
            dispatch({ type: REGISTER_USER_SUCCESS });
            NavigationService.navigate("Login");
        }).catch(error =>
            dispatch({ type: REGISTER_USER_ERROR, payload: error.message })
        );

    };
};

export const doLogin = (email, password) => {
    return dispatch => {
        dispatch({ type: DO_LOGIN });

        fetch(global.apiUrl + 'api/account/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        })
            .then(res => res.json().then(data => ({ ok: res.ok, body: data })))
            .then(res => {
                if (res.ok) {
                    AsyncStorage.setItem("login_token", res.body.token)
                        .then(() => {
                            dispatch({ type: LOGIN_SUCCESS, payload: res.body.token });
                            NavigationService.navigate("App");
                        });

                } else {
                    dispatch({ type: LOGIN_ERROR, payload: res.body })
                }
            }).catch(error =>
                dispatch({ type: LOGIN_ERROR, payload: error.message })
            );

    };
};

export const getUserToken = () => {
    return dispatch =>
        AsyncStorage.getItem('login_token')
            .then((data) => {
                dispatch({ type: CHANGE_TOKEN, payload: data })
            })
}


export const doLogout = () => {
    return dispatch => {
        AsyncStorage.removeItem('login_token')
            .then(() => {
                dispatch({ type: DO_LOGOUT })
            })
    }
}

