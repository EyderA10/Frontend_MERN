import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducers } from "./calendarReducers";
import { uiReducer } from "./uiReducer";


export const reducers = combineReducers({
    ui: uiReducer,
    calendar: calendarReducers,
    auth: authReducer
})