import { CATEGORY, ADDCATEGORY, DELETECATEGORY } from "../actions/categoryAction";

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
        case ADDCATEGORY: {
            return {
                ...state
            }
        }
        case DELETECATEGORY : {
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