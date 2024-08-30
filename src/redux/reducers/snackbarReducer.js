import { SHOW, HIDE } from "../actions/snackbarAction";

const initialState = {
    show: false,
    severity: 'info',
    message: ''
}

export const snackBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW: {
            return {
                ...state,
                show: true,
                message: action.payload.message,
                severity: action.payload.severity
            }
        }
        case HIDE: {
            return {
                ...state,
                show: false,
                message: '',
                severity: 'info'
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}