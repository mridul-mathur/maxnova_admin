import { COMPANY, ADDCOMPANY, DELETECOMPANY } from "../actions/companyAction";

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
        case ADDCOMPANY: {
            return {
                ...state
            }
        }
        case DELETECOMPANY : {
            return {
                ...state
            }
        }
        default:{
            return {
                ...state
            }
        }
    }
}