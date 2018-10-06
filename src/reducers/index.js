import { combineReducers } from "redux";
import SpendReducer from "./SpendReducer";
import UserReducer from "./UserReducer";
import SpendListReducer from "./SpendListReducer";
import CategoryListReducer from "./CategoryListReducer";
import CategoryReducer from "./CategoryReducer";



export default combineReducers({
    SpendReducer,
    UserReducer,
    SpendListReducer,
    CategoryListReducer,
    CategoryReducer
}) 