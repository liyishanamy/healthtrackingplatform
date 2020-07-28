// export const LOGIN = 'LOGIN'
// export const LOGOUT = 'LOGOUT'
//
//
// export function login(isLoggedIn) {
//     return { type: LOGIN, isLoggedIn  }
// }
//
// export function logout(isLoggedIn) {
//     return { type: LOGOUT,isLoggedIn}
// }
// Action type
export const SET_LOG_IN = "SET_LOG_IN";

// Constants
export const isLoggedInOptions = {
    LOGIN: 'LOGIN',
    LOGOUT:"LOGOUT"
}
// Action creators
export function setLogin(loginOrNot) {
    return { type: SET_LOG_IN, loginOrNot }
}