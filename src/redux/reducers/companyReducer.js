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
      };
    }
    case DELETECOMPANY: {
      return {
        ...state,
      };
    }
    case UPDATECOMPANY: {
      return {
        ...state,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
