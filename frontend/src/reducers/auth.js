

import { 
    REGISTER_ATTEMPT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    CONFIRM_ACCOUNT_ATTEMPT,
    CONFIRM_ACCOUNT_SUCCESS,
    CONFIRM_ACCOUNT_FAIL,
    LOG_IN_ATTEMPT,
    LOG_IN_SUCCESS,
    LOG_IN_FAIL,
    LOG_OUT,
    RESET_PASSWORD_ATTEMPT,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CURRENT_PAGE
} from '../actions/types'


const initialState = {
    userId: '',
    loggedIn: false,
    loginError: false,
    user: [],
    loading: false,
    errormessage: '',
    confirmLinkStatus: false,
    resetPasswordTried: false,
    resetPasswordSuccess: false,
    currentPage: 'home'
}

export default (state = initialState, action) => {
    switch(action.type) {
        case REGISTER_ATTEMPT:
            return {
                ...state,
                loading: true
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmLinkStatus: true
            };
        case REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                errormessage: action.payload
            };
        case CONFIRM_ACCOUNT_ATTEMPT:
            return {
                ...state,
                loading: true
            }
        case CONFIRM_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                confirmLinkStatus: true
            }
        case CONFIRM_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                confirmLinkStatus: false
            }
        case LOG_IN_ATTEMPT: 
            return {
                ...state,
                loading: true,
                loginError: false
            }
        case LOG_IN_SUCCESS: 
            return {
                ...state,
                loading: false,
                userId: action.payload.userId,
                user: action.payload.user,
                loggedIn: true,
                loginError: false
            }
        case LOG_IN_FAIL: 
            return {
                ...state,
                loginError: true,
                loading: false,
                errormessage: action.payload.message
            }
        case LOG_OUT:
            return {
                userId: '',
                loggedIn: false,
                user: [],
                loading: false,
                errormessage: '',
                confirmLinkStatus: false
            }
        case RESET_PASSWORD_ATTEMPT:
            return {
                ...state,
                loading: true,
                resetPasswordTried: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                resetPasswordSuccess: true
            }
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                resetPasswordSuccess: false
            }
        case CURRENT_PAGE:
            if (state.currentPage == 'home') {
                return {
                    ...state,
                    currentPage: 'picture'
                }
            }
            return {
                ...state,
                currentPage: 'home'
            }
        default:
            return state;
    }
}

// export default (state = initialState, action) => {
//     switch (action.type) {
//       case types.LOGIN:
//         return {
//           ...state,
//           error: "",
//           loading: true
//         };
//       case types.LOGOUT:
//         return { ...initialState };
//       case types.LOGIN_FAILED:
//         return {
//           ...state,
//           error: action.payload,
//           loading: false
//         };
//       case types.LOGIN_SUCCESS:
//         return {
//           ...state,
//           loggedIn: true,
//           loading: false,
//           id: action.payload.userId,
//           userInfo: action.payload.userInfo,
//           userType: action.payload.userType
//         };
//     }
// }