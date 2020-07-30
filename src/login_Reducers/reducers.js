 import {login, logout} from '../login_Actions/index'
//
// const { SHOW_ALL } = isLoggedIn
//
// const loginReducer = (state = , action) => {
//     switch (action.type) {
//         case 'LOGIN':
//             return Object.assign({}, state, {
//                 isLoggedIn:true
//             })
//         case 'LOGOUT':
//             return Object.assign({},state, {
//                 isLoggedIn:false
//             })
//         default:
//             return state
//     }
// }
import {isLoggedInOptions, SET_LOG_IN} from "../login_Actions";
import { combineReducers } from 'redux'

const {LOGOUT} = isLoggedInOptions
function loginReducer(state = LOGOUT, action) {
    switch (action.type) {
        case SET_LOG_IN:
            return action.loginOrNot
        default:
            return state
    }
}
 const rootReducer = combineReducers({
     loginReducer
 })
export default loginReducer