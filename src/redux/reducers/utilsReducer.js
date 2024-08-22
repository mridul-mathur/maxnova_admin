import { GETPCDUTIL, GETPVTUTIL, GETHOMEUTIL, GETCUSTOMUTIL, PATCHHOMEUTIL, UPDATEPCDUTIL, UPDATEPVTUTIL, UPDATECUSTOMUTIL } from "../actions/utilsAction"

const initialState = {
    homeutil: null,
    pcdutil: null,
    pvtutil: null,
    customutil: null
}

export const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETHOMEUTIL: {
            return {
                ...state,
                homeutil: action.payload
            }
        }
        case PATCHHOMEUTIL: {
            return {
                ...state,
            }
        }
        case GETPCDUTIL: {
            return {
                ...state,
                pcdutil: action.payload
            }
        }
        case UPDATEPCDUTIL: {
            return {
                ...state
            }
        }
        case GETPVTUTIL: {
            return {
                ...state,
                pvtutil: action.payload
            }
        }
        case UPDATEPVTUTIL: {
            return {
                ...state
            }
        }
        case GETCUSTOMUTIL: {
            return {
                ...state,
                customutil: action.payload
            }
        }
        case UPDATECUSTOMUTIL: {
            return {
                ...state
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}