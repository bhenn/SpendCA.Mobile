import { CHANGE_EMAIL, CHANGE_NAME, CHANGE_PASSWORD, CHANGE_TOKEN, REGISTER_USER_ERROR, LOGIN_ERROR, DO_LOGIN, REGISTER_USER_LOADING, REGISTER_USER_SUCCESS, LOGIN_SUCCESS, DO_LOGOUT } from "../actions/types";
const INITIAL_STATE = {
    email: '',
    password: '',
    token: '',
    name: '',
    registerError: '',
    loginError: '',
    loginLoading: false,
    registerLoading: false,
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CHANGE_EMAIL:
            return { ...state, email: action.payload }

        case CHANGE_PASSWORD:
            return { ...state, password: action.payload }

        case CHANGE_NAME:
            return { ...state, name: action.payload }

        case CHANGE_TOKEN:
            return { ...state, token: action.payload}

        case DO_LOGIN:
            return { ...state, loginLoading: true }

        case DO_LOGOUT:
            return { ...state, password: '', token: '' }

        case LOGIN_ERROR:
            return { ...state, loginError: action.payload, loginLoading: false, token: '' }

        case LOGIN_SUCCESS:
            return { ...state, loginError: '', loginLoading: false, token: action.payload }

        case REGISTER_USER_LOADING:
            return { ...state, registerLoading: true }

        case REGISTER_USER_ERROR:
            return { ...state, registerError: action.payload, registerLoading: false }

        case REGISTER_USER_SUCCESS:
            return { ...state, registerError: '', registerLoading: false, password: '' }



        default:
            return state
    }


}