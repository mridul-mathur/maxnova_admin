import { CATEGORY } from "../actions/categoryAction";

const initialState = {
    allcategory: null
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY: {
            return {
                ...state,
                allcategory: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}