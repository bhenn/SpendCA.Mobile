import {
    CHANGE_EMAIL,
    CHANGE_TOKEN,
    CHANGE_PASSWORD,
    CHANGE_NAME,
    REGISTER_USER_ERROR,
    LOGIN_ERROR,
    DO_LOGIN,
    REGISTER_USER_LOADING,
    REGISTER_USER_SUCCESS,
    LOGIN_SUCCESS,
    DO_LOGOUT
} from "./types";
import NavigationService from "../../NavigationService";
import { AsyncStorage } from 'react-native';
import api from "../api";


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

        api.post('account', { email, password })
            .then(user => {
                dispatch({ type: REGISTER_USER_SUCCESS });
                NavigationService.navigate("Login");
            })
            .catch(error => {
                dispatch({ type: REGISTER_USER_ERROR, payload: error.response.data })
            })

    };
};

export const doLogin = (email, password) => {
    return dispatch => {
        dispatch({ type: DO_LOGIN });

        api.post('account/login', { email, password })
            .then(res => {
                AsyncStorage.setItem("login_token", res.data.token)
                    .then(() => {
                        dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
                        NavigationService.navigate("App");
                    });
            })
            .catch(error => {
                dispatch({ type: LOGIN_ERROR, payload: error.response.data })
            })
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

