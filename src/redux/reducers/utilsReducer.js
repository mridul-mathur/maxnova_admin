import {
    GETPCDUTIL, GETPVTUTIL, GETHOMEUTIL, GETABOUTUTIL, GETCUSTOMUTIL, PATCHHOMEUTIL, UPDATEPCDUTIL, UPDATEPVTUTIL, ADDCERTIFICATE,
    GETCERTIFICATE, UPDATEABOUTUTIL, UPDATECUSTOMUTIL, DELETECERTIFICATE
} from "../actions/utilsAction"

const initialState = {
    homeutil: null,
    pcdutil: null,
    pvtutil: null,
    customutil: null,
    aboututil: null,
    certificates: null
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
        case GETABOUTUTIL: {
            return {
                ...state,
                aboututil: action.payload
            }
        }
        case UPDATEABOUTUTIL: {
            return {
                ...state
            }
        }
        case GETCERTIFICATE: {
            return {
                ...state,
                certificates: action.payload
            }
        }
        case DELETECERTIFICATE: {
            return {
                ...state
            }
        }
        case ADDCERTIFICATE: {
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