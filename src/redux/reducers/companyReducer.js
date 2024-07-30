import { COMPANY } from "../actions/companyAction";

const initialState = {
    allcompany: null
}

export const companyReducer = (state=initialState, action) => {
    switch(action.type){
        case COMPANY : {
            return {
                ...state,
                allcompany: action.payload
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}