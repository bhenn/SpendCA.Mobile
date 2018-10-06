import { CHANGE_EMAIL, CHANGE_NAME, CHANGE_PASSWORD, REGISTER_USER_ERROR, LOGIN_ERROR, DO_LOGIN, REGISTER_USER_LOADING, REGISTER_USER_SUCCESS, LOGIN_SUCCESS } from "../actions/types";
const INITIAL_STATE = {
    email: 'brunofhenn@gmail.com',
    password: '123456',
    name: '', 
    registerError: '',
    loginError: '',
    loginLoading: false,
    registerLoading: false, 
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case CHANGE_EMAIL:
        return {...state, email: action.payload}    

        case CHANGE_PASSWORD:
        return {...state, password: action.payload}    

        case CHANGE_NAME:
        return {...state, name: action.payload}    
        
        case DO_LOGIN: 
        return {...state, loginLoading: true}        

        case LOGIN_ERROR:
        return {...state, loginError: action.payload, loginLoading: false}

        case LOGIN_SUCCESS:
        return {...state, loginError: '', loginLoading: false}

        case REGISTER_USER_LOADING: 
        return {...state, registerLoading: true}

        case REGISTER_USER_ERROR:
        return {...state, registerError: action.payload, registerLoading: false}    

        case REGISTER_USER_SUCCESS: 
        return {...state, registerError: '', registerLoading: false, password: ''}



        default: 
        return state    
    }
    
    
}