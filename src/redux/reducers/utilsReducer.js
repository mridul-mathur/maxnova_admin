import { HOMEUTIL } from "../actions/utilsAction"

const initialState = {
    homeutil: null,
}

export const utilsReducer = (state = initialState, action) => {
    switch (action.type) {
        case HOMEUTIL: {
            return {
                ...state,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}