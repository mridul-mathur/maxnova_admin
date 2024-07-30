import { SHOW, HIDE } from "../actions/snackbarAction";

const initialState = {
    show: null,
    severity: null,
    message: null
}

export const snackBarReducer = (state=initialState, action) => {
    switch(action.type) {
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
                show: null
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}