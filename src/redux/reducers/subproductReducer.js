import {
  SUBPRODUCT,
  ADDSUBPRODUCT,
  DELETESUBPRODUCT,
  UPDATESUBPRODUCT,
} from "../actions/subproductAction";

const initialState = {
  allsubproducts: null,
};

export const subproductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBPRODUCT: {
      return {
        ...state,
        allsubproducts: action.payload,
      };
    }
    case ADDSUBPRODUCT:
    case UPDATESUBPRODUCT:
    case DELETESUBPRODUCT: {
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
