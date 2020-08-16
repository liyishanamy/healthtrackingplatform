
export const SET_LOG_IN = "SET_LOG_IN";
export const SET_EMAIL = "SET_EMAIL";
export const SET_ROLE = "SET_ROLE";
export const SET_IMAGE="SET_IMAGE";
export const SET_NO_SYMPTOM_DAY="SET_NO_SYMPTOM_DAY";
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

/*
set no symptom days
 */
export function setNoSymptomDays(day) {
    return { type: SET_NO_SYMPTOM_DAY, day }
}