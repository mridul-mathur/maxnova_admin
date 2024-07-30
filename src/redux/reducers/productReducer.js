import { PRODUCT, ADDPRODUCT, DELETEPRODUCT } from "../actions/productAction";

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
        default: {
            return {
                ...state
            }
        }
    }
}