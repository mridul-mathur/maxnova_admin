import {
  COMPANY,
  ADDCOMPANY,
  DELETECOMPANY,
  UPDATECOMPANY,
} from "../actions/companyAction";

const initialState = {
  allcompany: null,
};

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY: {
      return {
        ...state,
        allcompany: action.payload,
      };
    }
    case ADDCOMPANY: {
      return {
        ...state,
        allcompany: [...(state.allcompany || []), action.payload],
      };
    }
    case DELETECOMPANY: {
      return {
        ...state,
        allcompany: (state.allcompany || []).filter(
          (company) => company._id !== action.payload._id
        ),
      };
    }
    case UPDATECOMPANY: {
      return {
        ...state,
        allcompany: (state.allcompany || []).map((company) =>
          company._id === action.payload._id ? action.payload : company
        ),
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
