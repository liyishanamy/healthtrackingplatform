
export const SET_LOG_IN = "SET_LOG_IN";

// Constants
export const isLoggedInOptions = {
    LOGIN: 'LOGIN',
    LOGOUT:"LOGOUT",
    SIGNUP:"SIGNUP"
}
// Action creators
export function setLogin(loginOrNot) {
    return { type: SET_LOG_IN, loginOrNot }
}