import {isLoggedInOptions, roleOptions, SET_EMAIL, SET_LOG_IN, SET_ROLE} from "../login_Actions";
import { combineReducers } from 'redux'

const {LOGOUT} = isLoggedInOptions
const {NOT_LOGGED_IN} = roleOptions
function loginReducer(state = LOGOUT, action) {
    switch (action.type) {
        case SET_LOG_IN:
            return action.loginOrNot
        default:
            return state
    }
}

function roleReducer(state = NOT_LOGGED_IN, action) {
    switch (action.type) {
        case SET_ROLE:
            return action.role
        default:
            return state
    }
}


function emailReducer(state = "", action) {
    switch (action.type) {
        case SET_EMAIL:
            return action.email
        default:
            return state
    }
}
 const rootReducer = combineReducers({
     loginReducer,
     emailReducer,
     roleReducer
 })
export default rootReducer