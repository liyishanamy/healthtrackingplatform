
export const SET_LOG_IN = "SET_LOG_IN";
export const SET_EMAIL = "SET_EMAIL";
export const SET_ROLE = "SET_ROLE"
export const SET_IMAGE="SET_IMAGE"
// Constants
export const isLoggedInOptions = {
    LOGIN: 'LOGIN',
    LOGOUT:"LOGOUT",
    SIGNUP:"SIGNUP"
}

// Constants
export const roleOptions = {
    NOT_LOGGED_IN:"NOT_LOGGED_IN",
    DOCTOR: 'DOCTOR',
    PATIENT:'PATIENT'
}
// Action creators
export function setLogin(loginOrNot) {
    return { type: SET_LOG_IN, loginOrNot }
}

// Action creators
export function setRole(role) {
    return { type: SET_ROLE, role }
}
/*
 * action creators
 */

export function setEmail(email) {
    return { type: SET_EMAIL, email }
}

/*
 * action creators
 */

export function setProfileImage(url) {
    return { type: SET_IMAGE, url }
}