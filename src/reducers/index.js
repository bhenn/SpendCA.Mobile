import 'react-native-gesture-handler';
import { combineReducers } from "redux";
import SpendReducer from "./SpendReducer";
import UserReducer from "./UserReducer";
import SpendListReducer from "./SpendListReducer";
import CategoryListReducer from "./CategoryListReducer";
import CategoryReducer from "./CategoryReducer";
import { RESET } from '../actions/types';


const appReducer = combineReducers({
    SpendReducer,
    UserReducer,
    SpendListReducer,
    CategoryListReducer,
    CategoryReducer
})

export default rootReducer = (state, action) => {
    if (action.type == RESET) {
        state = undefined; 
    }

    return appReducer(state, action);
}