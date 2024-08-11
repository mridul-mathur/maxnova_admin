import { PRODUCT, ADDPRODUCT, DELETEPRODUCT, UPDATEPRODUCT } from "../actions/productAction";

const initialState = {
    allproducts: null,
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT: {
            return {
                ...state,
                allproducts: action.payload
            }
        }
        case ADDPRODUCT: {
            return {
                ...state,
            }
        }
        case DELETEPRODUCT: {
            return {
                ...state
            }
        }
        case UPDATEPRODUCT : {
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